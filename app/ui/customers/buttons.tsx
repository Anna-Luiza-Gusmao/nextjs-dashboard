import { deleteCustomer } from "@/app/lib/actions"
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

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

export function DeleteCustomer({ id, fileName }: { id: string; fileName: string }) {
	const deleteInvoiceWithId = deleteCustomer.bind(null, id, fileName)

	return (
		<form action={deleteInvoiceWithId}>
			<button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
				<span className="sr-only">Deletar</span>
				<TrashIcon className="w-4" />
			</button>
		</form>
	)
}

export function UpdateCustomer({ id }: { id: string }) {
	return (
		<Link href={`/dashboard/clientes/${id}/editar`} className="rounded-md border p-2 hover:bg-gray-100">
			<PencilIcon className="w-5" />
		</Link>
	)
}