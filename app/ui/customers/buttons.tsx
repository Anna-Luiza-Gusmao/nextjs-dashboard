import { PlusIcon } from "@heroicons/react/24/outline"
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
