import { auth } from "@/auth/auth"
import Breadcrumbs from "../breadcrumbs"
import { inter } from "../fonts"
import { UserRole } from "@/auth/permissions"

export async function InvoicesTableRowSkeleton() {
	const session = await auth()

	return (
		<tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
			{/* Customer Name and Image */}
			<td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 rounded-full bg-gray-100"></div>
					<div className="h-6 w-24 rounded bg-gray-100"></div>
				</div>
			</td>
			{/* Email */}
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-32 rounded bg-gray-100"></div>
			</td>
			{/* Amount */}
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-16 rounded bg-gray-100"></div>
			</td>
			{/* Date */}
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-16 rounded bg-gray-100"></div>
			</td>
			{/* Status */}
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-16 rounded bg-gray-100"></div>
			</td>
			{/* Actions */}
			<td className="whitespace-nowrap py-3 pl-6 pr-3">
				<div className="flex justify-end gap-3">
					<div className="h-[38px] w-[38px] rounded bg-gray-100" />
					{
						session?.user.permission === (UserRole.ADMIN || UserRole.MANAGER)
						&& <div className="h-[38px] w-[38px] rounded bg-gray-100" />
					}
				</div>
			</td>
		</tr>
	)
}

export function InvoicesMobileSkeleton() {
	return (
		<div className="mb-2 w-full rounded-md bg-white p-4">
			<div className="flex items-center justify-between border-b border-gray-100 pb-8">
				<div className="flex items-center">
					<div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
					<div className="h-6 w-16 rounded bg-gray-100"></div>
				</div>
				<div className="h-6 w-16 rounded bg-gray-100"></div>
			</div>
			<div className="flex w-full items-center justify-between pt-4">
				<div>
					<div className="h-6 w-16 rounded bg-gray-100"></div>
					<div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
				</div>
				<div className="flex justify-end gap-2">
					<div className="h-10 w-10 rounded bg-gray-100"></div>
					<div className="h-10 w-10 rounded bg-gray-100"></div>
				</div>
			</div>
		</div>
	)
}

export function InvoicesTableSkeleton() {
	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<div className="md:hidden">
						<InvoicesMobileSkeleton />
						<InvoicesMobileSkeleton />
						<InvoicesMobileSkeleton />
						<InvoicesMobileSkeleton />
						<InvoicesMobileSkeleton />
						<InvoicesMobileSkeleton />
					</div>
					<table className="hidden min-w-full text-gray-900 md:table">
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th scope="col" className="px-4 py-5 font-medium sm:pl-6">
									Cliente
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									E-mail
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Valor
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Data
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Status
								</th>
								<th scope="col" className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6">
									<span className="sr-only">Editar</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							<InvoicesTableRowSkeleton />
							<InvoicesTableRowSkeleton />
							<InvoicesTableRowSkeleton />
							<InvoicesTableRowSkeleton />
							<InvoicesTableRowSkeleton />
							<InvoicesTableRowSkeleton />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export function InvoicesPageSkeleton() {
	return (
		<div className="w-full h-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${inter.className} text-2xl`}>Faturas</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<div className="flex-1 h-10 rounded-lg bg-gray-50" />
				<div className="w-14 sm:w-36 h-10 rounded-lg bg-gray-50" />
			</div>
			<div className="mt-6 flex w-full h-1/4 md:h-1/2 rounded-lg bg-gray-50" />
			<div className="md:hidden mt-6 flex w-full h-1/4 md:h-1/2 rounded-lg bg-gray-50" />
			<div className="md:hidden mt-6 flex w-full h-1/4 md:h-1/2 rounded-lg bg-gray-50" />
			<div className="mt-5 flex w-full justify-center">
				<div className="w-1/2 sm:w-1/6 h-10 rounded-lg bg-gray-50" />
			</div>
		</div>
	)
}

export function CreateAndEditInvoicesPageSkeleton(pageLabel: string, pageHref: string) {
	return (
		<main className="w-full h-full">
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Faturas", href: "/dashboard/faturas" },
					{
						label: pageLabel,
						href: pageHref,
						active: true
					}
				]}
			/>
			<div className="w-full h-2/5 md:h-1/3 rounded-md bg-gray-50 p-4 md:p-6" />
			<div className="mt-6 flex justify-end gap-4">
				<div className="w-32 md:w-36 h-10 bg-gray-50" />
				<div className="w-32 md:w-36 h-10 bg-gray-50" />
			</div>
		</main>
	)
}