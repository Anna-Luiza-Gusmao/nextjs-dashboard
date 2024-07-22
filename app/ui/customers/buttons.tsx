"use client"

import { deleteCustomer } from "@/app/lib/actions"
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import DeleteModal from "../delete-modal"
import { useCallback, useState } from "react"

export function CreateCustomer() {
	return (
		<Link
			href="/dashboard/clientes/criar"
			className="flex h-10 items-center rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
		>
			<span className="hidden md:block">Criar Cliente</span> <PlusIcon className="h-5 md:ml-4" />
		</Link>
	)
}

export function DeleteCustomer({ id, customerName, fileName }: { id: string; customerName: string; fileName: string }) {
	const deleteCustomerWithId = deleteCustomer.bind(null, id, fileName)
	const [openDeleteCustomer, setOpenDeleteCustomer] = useState(false)

	const handleOpenDeleteModal = useCallback(() => {
		setOpenDeleteCustomer(true)
	}, [openDeleteCustomer])

	return (
		<>
			<button
				type="button"
				className="rounded-md border p-2 hover:bg-gray-100"
				onClick={handleOpenDeleteModal}
			>
				<span className="sr-only">Deletar</span>
				<TrashIcon className="w-4" />
			</button>
			{openDeleteCustomer && DeleteModal({
				title: `Deletar ${customerName}`,
				description: `Tem certeza que deseja deletar permanentemente o cliente ${customerName}?`,
				openDeleteModal: openDeleteCustomer,
				setOpenDeleteModal: setOpenDeleteCustomer,
				deleteAction: deleteCustomerWithId
			})}
		</>
	)
}

export function UpdateCustomer({ id }: { id: string }) {
	return (
		<Link href={`/dashboard/clientes/${id}/editar`} className="rounded-md border p-2 hover:bg-gray-100">
			<PencilIcon className="w-5" />
		</Link>
	)
}