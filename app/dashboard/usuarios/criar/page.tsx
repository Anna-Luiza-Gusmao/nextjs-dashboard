import Breadcrumbs from "@/app/ui/breadcrumbs"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Criar Usuário"
}

export default async function Page() {
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
		</main>
	)
}
