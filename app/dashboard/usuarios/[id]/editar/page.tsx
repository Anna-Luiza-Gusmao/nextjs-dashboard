import { fetchPermissions, fetchUserById } from "@/app/lib/data"
import Breadcrumbs from "@/app/ui/breadcrumbs"
import Form from "@/app/ui/users/edit-form"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
	title: "Atualizar Usuário"
}

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id
    const [user, permissions] = await Promise.all([fetchUserById(id), fetchPermissions()])

	if (!user) {
		notFound()
	}

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Usuários", href: "/dashboard/usuarios" },
					{
						label: "Editar",
						href: `/dashboard/usuarios/${id}/editar`,
						active: true
					}
				]}
			/>
            <Form user={user} permissions={permissions} />
		</main>
	)
}
