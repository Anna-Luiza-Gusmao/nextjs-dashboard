import { sql } from '@vercel/postgres'
import {
  CustomerField,
  CustomerForm,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  PermissionField,
  Revenue,
  UsersTable,
} from './definitions'
import { formatCurrency } from './utils'
// import { revenue } from './placeholder-data'

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...')
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const data = await sql<Revenue>`SELECT * FROM revenue`

    console.log('Data fetch completed after 3 seconds.')

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}

const updateRevenueTable = async (data: Revenue[]) => {
  try {
    // Deletar todos os dados antigos da tabela Revenue
    await sql`DELETE FROM Revenue`

    // Inserir novos dados
    for (const { month, revenue } of data) {
      await sql`
        INSERT INTO Revenue (month, revenue)
        VALUES (${month}, ${revenue})
      `;
    }
    console.log('Revenue data updated successfully')
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to update revenue data.')
  }
}

// Atualiza os valores da tabela Revenue
// updateRevenueTable(revenue)

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }))
    return latestInvoices
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch the latest invoices.')
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ])

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0')
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0')
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0')
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0')

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch card data.')
  }
}

const ITEMS_PER_PAGE = 6
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    return invoices.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoices.')
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of invoices.')
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }))

    // console.log(invoice); // Invoice is an empty array []
    return invoice[0]
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoice.')
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `

    const customers = data.rows
    return customers
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch all customers.')
  }
}

export async function fetchFilteredCustomers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }))

    return customers
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch customer table.')
  }
}

export async function fetchCustomersPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM customers
    WHERE
		  customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`}
  `

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of customers.')
  }
}

export async function fetchCustomerById(id: string) {
  try {
    const data = await sql<CustomerForm>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url
      FROM customers
      WHERE customers.id = ${id};
    `

    const customer = data.rows[0]

    return customer
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch customer.')
  }
}

export async function fetchFilteredUsers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const users = await sql<UsersTable>`
      SELECT
        users.id,
        users.name,
        users.email,
        permissions.permission AS permission
      FROM users
      JOIN permissions ON users.permission_id = permissions.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        permissions.permission ILIKE ${`%${query}%`}
      ORDER BY users.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    return users.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch users.')
  }
}

export async function fetchUsersPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM users
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`}
  `

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of users.')
  }
}

export async function fetchPermissions() {
  try {
    const data = await sql<PermissionField>`
      SELECT
        id,
        permission
      FROM permissions
      ORDER BY permission ASC
    `

    const permissions = data.rows
    return permissions
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch all users permission.')
  }
}
