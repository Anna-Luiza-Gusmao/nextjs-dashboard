"use client"

import Link from "next/link"
import { AtSymbolIcon, ClipboardDocumentCheckIcon, LockClosedIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import { Button } from "@/app/ui/button"
import { updateUser, UserState } from "@/app/lib/actions"
import { PermissionField, UsersTable } from "@/app/lib/definitions"
import { useActionState } from "react"

export default function Form({ user, permissions }: { user: UsersTable; permissions: PermissionField[] }) {
	const initialState: UserState = { message: null, errors: {} }
	const updateUserWithId = updateUser.bind(null, user.id)
	const [state, formAction] = useActionState(updateUserWithId, initialState)

	return (
		<form action={formAction}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* User Name */}
				<div className="mb-4">
					<label htmlFor="userName" className="mb-2 block text-sm font-medium">
						Digite o novo nome do usuário
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
                                defaultValue={user.name}
							/>
							<UserPlusIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div id="name-error" aria-live="polite" aria-atomic="true">
						{state.errors?.userName &&
							state.errors.userName.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div>
				</div>
				{/* User email */}
				<div className="mb-4">
					<label htmlFor="userEmail" className="mb-2 block text-sm font-medium">
						Digite o novo e-mail do usuário
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
                                defaultValue={user.email}
							/>
							<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div id="email-error" aria-live="polite" aria-atomic="true">
						{state.errors?.userEmail &&
							state.errors.userEmail.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div>
				</div>
				{/* User password */}
				<div className="mb-4">
					<label htmlFor="userPassword" className="mb-2 block text-sm font-medium">
						Digite a nova senha do usuário (caso não se aplique deixe o campo <b>vazio</b> para não alterar a senha)
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="password"
								name="userPassword"
								type="password"
								placeholder="Digite uma senha de no mínimo 6 caracteres"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								aria-describedby="password-error"
							/>
							<LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div id="password-error" aria-live="polite" aria-atomic="true">
						{state.errors?.userPassword &&
							state.errors.userPassword.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div>
				</div>
				{/* User permission */}
				<div className="mb-4">
					<label htmlFor="userPermission" className="mb-2 block text-sm font-medium">
						Escolha uma nova permissão para o usuário
					</label>
					<div className="relative">
						<select
							id="permission"
							name="userPermission"
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							defaultValue={user.permission}
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
						{state.errors?.permissionId &&
							state.errors.permissionId.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div>
				</div>
				{state.message && (
					<div aria-live="polite" aria-atomic="true">
						<p className="mt-2 text-sm text-red-500">{state.message}</p>
					</div>
				)}
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/usuarios"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancelar
				</Link>
				<Button type="submit">Editar Usuário</Button>
			</div>
		</form>
	)
}
