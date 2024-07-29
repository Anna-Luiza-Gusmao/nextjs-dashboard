"use client"

import Link from "next/link"
import { AtSymbolIcon, ClipboardDocumentCheckIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import { Button } from "@/app/ui/button"
import { State } from "@/app/lib/actions"
import { PermissionField } from "@/app/lib/definitions"

export default function Form({ permissions }: { permissions: PermissionField[] }) {
	const initialState: State = { message: null, errors: {} }
	// const [state, formAction] = useActionState(createInvoice, initialState)

	return (
		<form>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* User Name */}
				<div className="mb-4">
					<label htmlFor="userName" className="mb-2 block text-sm font-medium">
						Digite o nome do novo usuário
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="name"
								name="userName"
								type="text"
								placeholder="Digite o nome do usuário"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="name-error"
							/>
							<UserPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div id="name-error" aria-live="polite" aria-atomic="true">
						{/* {state.errors?.customerName &&
							state.errors.customerName.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))} */}
					</div>
				</div>
				{/* User email */}
				<div className="mb-4">
					<label htmlFor="userEmail" className="mb-2 block text-sm font-medium">
						Digite o e-mail do novo usuário
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="email"
								name="userEmail"
								type="email"
								placeholder="Digite no formato usuario@nextmail.com"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="email-error"
							/>
							<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div id="email-error" aria-live="polite" aria-atomic="true">
						{/* {state.errors?.customerEmail &&
							state.errors.customerEmail.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))} */}
					</div>
				</div>
				{/* User permission */}
				<div className="mb-4">
					<label htmlFor="permission" className="mb-2 block text-sm font-medium">
						Escolha uma permissão para o usuário
					</label>
					<div className="relative">
						<select
							id="permission"
							name="permission"
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							defaultValue=""
							aria-describedby="permission-error"
						>
							<option value="" disabled>
								Selecione a permissão
							</option>
							{permissions.map((role) => (
								<option key={role.id} value={role.id}>
									{role.permission}
								</option>
							))}
						</select>
						<ClipboardDocumentCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
					</div>
					<div id="permission-error" aria-live="polite" aria-atomic="true">
						{/* {state.errors?.customerId &&
							state.errors.customerId.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))} */}
					</div>
				</div>
				{/* {state.message && (
					<div aria-live="polite" aria-atomic="true">
						<p className="mt-2 text-sm text-red-500">{state.message}</p>
					</div>
				)} */}
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/usuarios"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancelar
				</Link>
				<Button type="submit">Criar Usuário</Button>
			</div>
		</form>
	)
}
