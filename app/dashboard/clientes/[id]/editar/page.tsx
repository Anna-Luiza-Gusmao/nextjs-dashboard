import Breadcrumbs from "@/app/ui/breadcrumbs"
import { fetchCustomerById } from "@/app/lib/data"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Form from "@/app/ui/customers/edit-form"

export const metadata: Metadata = {
	title: "Atualizar Cliente"
}

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id
	const customer = await Promise.resolve(fetchCustomerById(id))

	if (!customer) {
		notFound()
	}

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Clientes", href: "/dashboard/clientes" },
					{
						label: "Editar",
						href: `/dashboard/clientes/${id}/editar`,
						active: true
					}
				]}
			/>
			<Form customer={customer} />
		</main>
	)
}
