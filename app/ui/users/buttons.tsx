"use client"

import { deleteInvoice } from "@/app/lib/actions"
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState } from "react"
import DeleteModal from "../delete-modal"

export function CreateUser() {
	return (
		<Link
			href="/dashboard/usuarios/criar"
			className="flex h-10 items-center rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
		>
			<span className="hidden md:block">Criar Usuário</span> <PlusIcon className="h-5 md:ml-4" />
		</Link>
	)
}

export function UpdateUser({ id }: { id: string }) {
	return (
		<Link href={`/dashboard/usuarios/${id}/editar`} className="rounded-md border p-2 hover:bg-gray-100">
			<PencilIcon className="w-5" />
		</Link>
	)
}

export function DeleteUser({ id, customerName, invoiceValue }: { id: string; customerName: string; invoiceValue: number }) {
	const deleteInvoiceWithId = deleteInvoice.bind(null, id)
	const [openDeleteCustomer, setOpenDeleteCustomer] = useState(false)

	const handleOpenDeleteModal = () => {
		setOpenDeleteCustomer(true)
	}

	return (
		<>
			<button type="button" className="rounded-md border p-2 hover:bg-gray-100" onClick={handleOpenDeleteModal}>
				<span className="sr-only">Deletar</span>
				<TrashIcon className="w-4" />
			</button>
			{openDeleteCustomer &&
				DeleteModal({
					title: `Deletar o usuário ${customerName}`,
					description: "Tem certeza que deseja deletar permanentemente o usuário?",
					openDeleteModal: openDeleteCustomer,
					setOpenDeleteModal: setOpenDeleteCustomer,
					deleteAction: deleteInvoiceWithId
				})}
		</>
	)
}
