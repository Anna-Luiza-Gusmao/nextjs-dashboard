'use server'

import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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

import { signIn } from '@/auth'
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

const customerPhotoSchema = z.object({
    name: z.string(),
    size: z.number().max(5 * 1024 * 1024), // maximum size of 5MB
    type: z.enum(['image/jpeg', 'image/png', 'image/jpg']) // allowed file types
})

const CustomerFormSchema = z.object({
    id: z.string(),
    customerName: z.string().min(2, {
        message: "Digite no mínimo 2 caracteres para o nome do cliente."
    }),
    customerPhoto: customerPhotoSchema,
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

    const photoFile = customerPhoto as File
    const imageFormData = new FormData()
    imageFormData.append("file", photoFile)

    try {
        // Insert customer image to public folder
        await fetch("/api", {
            method: "POST",
            body: imageFormData
        })
            .then(response => response.json())
            .then(data => {
                const imagePath = data.filePath
                console.log("Image path ", imagePath)

                try {
                    // await sql`
                    //   INSERT INTO customers (name, email, image_url)
                    //   VALUES (${customerName}, ${customerEmail}, ${`/customers/${imagePath}`})
                    // `
                } catch (error) {
                    return {
                        message: `Database Error: Failed to Create Customer. ${error}`,
                    }
                }
            })
    } catch (error) {
        console.error("Error in request with api: ", error)
    }

    revalidatePath("/dashboard/clientes")
    redirect("/dashboard/clientes")
}

// export async function deleteCustomer(id: string) {
//     try {
//         await sql`DELETE FROM customers WHERE id = ${id}`
//         revalidatePath('/dashboard/clientes')
//         return { message: 'Deleted Customer.' }
//     } catch (error) {
//         return {
//             message: 'Database Error: Failed to Delete Customer.',
//         }
//     }
// }
