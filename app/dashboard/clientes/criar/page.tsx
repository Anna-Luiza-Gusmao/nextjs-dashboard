import Form from "@/app/ui/customers/create-form"
import Breadcrumbs from "@/app/ui/breadcrumbs"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Criar Cliente"
}

export default async function Page() {
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
			<Form />
		</main>
	)
}
