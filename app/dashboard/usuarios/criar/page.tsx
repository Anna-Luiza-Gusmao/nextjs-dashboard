import { fetchPermissions } from "@/app/lib/data"
import Breadcrumbs from "@/app/ui/breadcrumbs"
import Form from "@/app/ui/users/create-form"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Criar Usuário"
}

export default async function Page() {
	const permissions = await fetchPermissions()
	
	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Usuários", href: "/dashboard/usuarios" },
					{
						label: "Criar",
						href: "/dashboard/usuarios/criar",
						active: true
					}
				]}
			/>
			<Form permissions={permissions} />
		</main>
	)
}
