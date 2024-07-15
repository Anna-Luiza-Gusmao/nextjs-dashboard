"use client"

import Link from "next/link"
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline"
import { Button } from "@/app/ui/button"
import { createInvoice, State } from "@/app/lib/actions"
import { useActionState } from "react"

export default function Form() {
	const initialState: State = { message: null, errors: {} }
	const [state, formAction] = useActionState(createInvoice, initialState)
	const filesAllowedCustomerPhoto = "image/png, image/jpeg, image/jpg"

	return (
		<form action={formAction}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* Customer name */}
				<div className="mb-4">
					<label htmlFor="name" className="mb-2 block text-sm font-medium">
						Digite o nome do novo cliente
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="name"
								name="name"
								type="text"
								placeholder="Digite o nome do cliente"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="name-error"
							/>
							<UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					{/* <div id="amount-error" aria-live="polite" aria-atomic="true">
						{state.errors?.amount &&
							state.errors.amount.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div> */}
				</div>
				{/* Customer photo */}
				<div className="mb-4">
					<label htmlFor="photo" className="mb-2 block text-sm font-medium">
						Adicione uma imagem do novo cliente
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="photo"
								name="photo"
								type="file"
								accept={filesAllowedCustomerPhoto}
								className="w-full outline-2 text-sm text-violet-600
									file:mr-5 file:py-2 file:px-6
									file:rounded-lg file:border-0
									file:text-sm file:font-medium
									file:bg-violet-500 file:text-white
									hover:file:cursor-pointer hover:file:bg-violet-400
								"
								aria-describedby="photo-error"
							/>
						</div>
					</div>
					{/* <div id="amount-error" aria-live="polite" aria-atomic="true">
						{state.errors?.amount &&
							state.errors.amount.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div> */}
				</div>
				{/* Customer email */}
				<div className="mb-4">
					<label htmlFor="email" className="mb-2 block text-sm font-medium">
						Digite o e-mail do novo cliente
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="email"
								name="email"
								type="email"
								placeholder="Digite no formato cliente@sobrenome.com"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="email-error"
							/>
							<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					{/* <div id="amount-error" aria-live="polite" aria-atomic="true">
						{state.errors?.amount &&
							state.errors.amount.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div> */}
				</div>
				{state.message && (
					<div aria-live="polite" aria-atomic="true">
						<p className="mt-2 text-sm text-red-500">{state.message}</p>
					</div>
				)}
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/clientes"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancelar
				</Link>
				<Button type="submit">Criar Cliente</Button>
			</div>
		</form>
	)
}
