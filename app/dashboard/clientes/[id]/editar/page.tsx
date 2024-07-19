import Breadcrumbs from "@/app/ui/breadcrumbs"
import { fetchCustomerById } from "@/app/lib/data"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Customer, CustomerForm } from "@/app/lib/definitions"

export const metadata: Metadata = {
	title: "Atualizar Cliente"
}

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id
	// async function getCustomer(id: string): Promise<{ customer: CustomerForm }> {
	// 	const customer = await fetchCustomerById(id)
	// 	return customer
	// }

	// const customer = getCustomer(id)

	// if (!customer) {
	// 	notFound()
	// }

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
			{/* <Form /> */}
		</main>
	)
}
