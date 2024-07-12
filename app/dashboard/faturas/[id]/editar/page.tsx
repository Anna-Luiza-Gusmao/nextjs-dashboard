import Form from "@/app/ui/invoices/edit-form"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data"
import { notFound } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Atualizar Fatura"
}

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id
	const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()])
	if (!invoice) {
		notFound()
	}

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Faturas", href: "/dashboard/faturas" },
					{
						label: "Editar",
						href: `/dashboard/faturas/${id}/editar`,
						active: true
					}
				]}
			/>
			<Form invoice={invoice} customers={customers} />
		</main>
	)
}
