import Form from "@/app/ui/customers/create-form"
import Breadcrumbs from "@/app/ui/breadcrumbs"
import { fetchCustomers } from "@/app/lib/data"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Criar Cliente"
}

export default async function Page() {
	const customers = await fetchCustomers()

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Clientes", href: "/dashboard/clientes" },
					{
						label: "Criar",
						href: "/dashboard/clientes/criar",
						active: true
					}
				]}
			/>
			<Form customers={customers} />
		</main>
	)
}
