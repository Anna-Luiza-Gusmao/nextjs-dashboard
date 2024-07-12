import Form from "@/app/ui/invoices/create-form"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import { fetchCustomers } from "@/app/lib/data"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Criar Fatura"
}

export default async function Page() {
	const customers = await fetchCustomers()

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Faturas", href: "/dashboard/faturas" },
					{
						label: "Criar",
						href: "/dashboard/faturas/criar",
						active: true
					}
				]}
			/>
			<Form customers={customers} />
		</main>
	)
}
