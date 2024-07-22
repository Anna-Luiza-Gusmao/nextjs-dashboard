"use client"

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { deleteInvoice } from "@/app/lib/actions"
import DeleteModal from "../delete-modal"
import { useState } from "react"
import { formatCurrency } from "@/app/lib/utils"

export function CreateInvoice() {
	return (
		<Link
			href="/dashboard/faturas/criar"
			className="flex h-10 items-center rounded-lg bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
		>
			<span className="hidden md:block">Criar Fatura</span> <PlusIcon className="h-5 md:ml-4" />
		</Link>
	)
}

export function UpdateInvoice({ id }: { id: string }) {
	return (
		<Link href={`/dashboard/faturas/${id}/editar`} className="rounded-md border p-2 hover:bg-gray-100">
			<PencilIcon className="w-5" />
		</Link>
	)
}

export function DeleteInvoice({ id, customerName, invoiceValue }: { id: string; customerName: string; invoiceValue: number }) {
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
					title: `Deletar fatura de ${formatCurrency(invoiceValue)} de ${customerName}`,
					description: "Tem certeza que deseja deletar permanentemente a fatura?",
					openDeleteModal: openDeleteCustomer,
					setOpenDeleteModal: setOpenDeleteCustomer,
					deleteAction: deleteInvoiceWithId
				})}
		</>
	)
}
