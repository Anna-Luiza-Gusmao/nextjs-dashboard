'use server'

import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import bcrypt from 'bcrypt'

const InvoiceFormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Selecione um cliente.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Entre com um valor maior do que R$0,00.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Selecione um status para a nova fatura.',
    }),
    date: z.string(),
})

const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true })

export type State = {
    errors?: {
        customerId?: string[]
        amount?: string[]
        status?: string[]
    }
    message?: string | null
}

export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Algo está errado, não foi possível criar uma nova fatura.',
        }
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data
    const amountInCents = amount * 100
    const date = new Date().toISOString().split('T')[0]

    try {
        await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        }
    }

    // Atualiza os dados exibidos na rota de faturas, limpando o cache e disparando uma nova solicitação para o servidor
    revalidatePath('/dashboard/faturas')

    redirect('/dashboard/faturas')

    // Test it out:
    // console.log(typeof rawFormData.amount)
    // console.log(rawFormData)
}

// Use Zod to update the expected types
const UpdateInvoice = InvoiceFormSchema.omit({ id: true, date: true })

// ...

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        }
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data
    const amountInCents = amount * 100

    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
    `
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Invoice.',
        }
    }

    revalidatePath('/dashboard/faturas')
    redirect('/dashboard/faturas')
}

export async function deleteInvoice(id: string) {
    // throw new Error('Failed to Delete Invoice')

    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`
        revalidatePath('/dashboard/faturas')
        return { message: 'Deleted Invoice.' }
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Invoice.',
        }
    }
}

import { signIn } from '@/auth/auth'
import { AuthError } from 'next-auth'

// ...

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'E-mail ou senha inválida.'
                default:
                    return 'Algo está errado. Tente novamente.'
            }
        }
        throw error
    }
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const CustomerFormSchema = z.object({
    id: z.string(),
    customerName: z.string().min(2, {
        message: "Digite no mínimo 2 caracteres para o nome do cliente."
    }),
    customerPhoto: z
        .instanceof(File)
        .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
            message: 'Tipo de arquivo inválido. Apenas arquivos JPEG, PNG, and JPG são permitidos.',
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'O tamanho do arquivo deve ser menor que 5MB.',
        }),
    customerEmail: z.string().email({
        message: 'Endereço de e-mail inválido.',
    })
})

const CreateCustomer = CustomerFormSchema.omit({ id: true })

export type CustomerState = {
    errors?: {
        customerName?: string[]
        customerPhoto?: string[]
        customerEmail?: string[]
    }
    message?: string | null
}

export async function createCustomer(prevState: CustomerState, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateCustomer.safeParse({
        customerName: formData.get('customerName'),
        customerPhoto: formData.get('customerPhoto'),
        customerEmail: formData.get('customerEmail'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Algo está errado, não foi possível criar um novo cliente.',
        }
    }

    // Prepare data for insertion into the database
    const { customerName, customerPhoto, customerEmail } = validatedFields.data

    const imageFormData = new FormData()
    imageFormData.append("file", customerPhoto)

    try {
        // Insert customer image to public folder
        const response = await fetch(`${apiBaseUrl}/api/upload`, {
            method: "POST",
            body: imageFormData
        })

        if (!response.ok) {
            console.error("API response not OK: ", response.status, response.statusText)
            throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json().catch((error) => {
            console.error("Error parsing JSON response: ", error)
            throw new Error("Invalid JSON response")
        })

        const imagePath = data

        try {
            await sql`
              INSERT INTO customers (name, email, image_url)
              VALUES (${customerName}, ${customerEmail}, ${`/customers/${imagePath.fileName}`})
            `
        } catch (error) {
            console.error("Database Error: Failed to Create Customer. ", error)
            return {
                message: `Database Error: Failed to Create Customer. ${error}`,
            }
        }
    } catch (error) {
        console.error("Error in request with api: ", error)
    }

    revalidatePath("/dashboard/clientes")
    redirect("/dashboard/clientes")
}

export async function deleteCustomer(id: string, fileName: string) {
    try {
        const response = await fetch(`${apiBaseUrl}/api/upload`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fileName })
        })

        if (!response.ok) {
            throw new Error(`Failed to delete file: ${response.status} ${response.statusText}`)
        }

        await sql`DELETE FROM customers WHERE id = ${id}`
        revalidatePath('/dashboard/clientes')
        return { message: 'Deleted Customer.' }
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Customer.',
        }
    }
}

const UpdatedCustomerFormSchema = z.object({
    id: z.string(),
    customerName: z.string().min(2, {
        message: "Digite no mínimo 2 caracteres para o nome do cliente."
    }),
    customerPhoto: z
        .instanceof(File)
        .refine((file) => ['image/jpeg', 'image/png', 'image/jpg', 'application/octet-stream'].includes(file.type), {
            message: 'Tipo de arquivo inválido. Apenas arquivos JPEG, PNG, and JPG são permitidos.',
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'O tamanho do arquivo deve ser menor que 5MB.',
        }),
    customerEmail: z.string().email({
        message: 'Endereço de e-mail inválido.',
    })
})

const UpdateCustomer = UpdatedCustomerFormSchema.omit({ id: true })

export async function updateCustomer(id: string, oldCustomerImage: string, prevState: CustomerState, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = UpdateCustomer.safeParse({
        customerName: formData.get('customerName'),
        customerPhoto: formData.get('customerPhoto'),
        customerEmail: formData.get('customerEmail'),
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Algo está errado, não foi possível criar um novo cliente.',
        }
    }

    // Prepare data for insertion into the database
    const { customerName, customerPhoto, customerEmail } = validatedFields.data

    if (customerPhoto.size !== 0) {
        const formData = new FormData()
        formData.append("file", customerPhoto)
        formData.append("oldFileName", oldCustomerImage)

        try {
            // Insert customer image to public folder
            const response = await fetch(`${apiBaseUrl}/api/upload`, {
                method: "PUT",
                body: formData
            })

            if (!response.ok) {
                console.error("API response not OK: ", response.status, response.statusText)
                throw new Error(`API Error: ${response.status} ${response.statusText}`)
            }

            const data = await response.json().catch((error) => {
                console.error("Error parsing JSON response: ", error)
                throw new Error("Invalid JSON response")
            })

            const imagePath = data

            try {
                await sql`
                UPDATE customers
                    SET name = ${customerName}, email = ${customerEmail}, image_url = ${`/customers/${imagePath.fileName}`}
                    WHERE id = ${id}
                `
            } catch (error) {
                console.error("Database Error: Failed to Updated Customer. ", error)
                return {
                    message: `Database Error: Failed to Updated Customer. ${error}`,
                }
            }
        } catch (error) {
            console.error("Error in request with api: ", error)
        }
    } else {
        try {
            await sql`
            UPDATE customers
                SET name = ${customerName}, email = ${customerEmail}, image_url = ${oldCustomerImage}
                WHERE id = ${id}
            `
        } catch (error) {
            console.error("Database Error: Failed to Updated Customer. ", error)
            return {
                message: `Database Error: Failed to Updated Customer. ${error}`,
            }
        }
    }

    revalidatePath("/dashboard/clientes")
    redirect("/dashboard/clientes")
}

const UserFormSchema = z.object({
    id: z.string(),
    userName: z.string().min(2, {
        message: "Digite no mínimo 2 caracteres para o nome do usuário."
    }),
    userEmail: z.string().email({
        message: 'Endereço de e-mail inválido.',
    }),
    userPassword: z.string().min(6),
    permissionId: z.string({
        invalid_type_error: 'Selecione uma permissão.',
    })
})

const CreateUser = UserFormSchema.omit({ id: true })

export type UserState = {
    errors?: {
        userName?: string[]
        userEmail?: string[]
        userPassword?: string[]
        permissionId?: string[]
    }
    message?: string | null
}

export async function createUser(prevState: UserState, formData: FormData) {
    const validatedFields = CreateUser.safeParse({
        userName: formData.get('userName'),
        userEmail: formData.get('userEmail'),
        userPassword: formData.get('userPassword'),
        permissionId: formData.get('userPermission'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Algo está errado, não foi possível criar um novo usuário.',
        }
    }

    const { userName, userEmail, userPassword, permissionId } = validatedFields.data
    const hashedUserPassword = await bcrypt.hash(userPassword, 10)

    try {
        await sql`
          INSERT INTO users (name, email, password, permission_id)
          VALUES (${userName}, ${userEmail}, ${hashedUserPassword}, ${permissionId})
        `
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create User.',
        }
    }

    revalidatePath('/dashboard/usuarios')
    redirect('/dashboard/usuarios')
}
