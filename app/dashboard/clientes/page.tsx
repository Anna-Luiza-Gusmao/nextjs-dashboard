import { fetchCustomersPages } from "@/app/lib/data"
import { CreateCustomer } from "@/app/ui/customers/buttons"
import CustomersTable from "@/app/ui/customers/table"
import { inter } from "@/app/ui/fonts"
import Pagination from "@/app/ui/pagination"
import Search from "@/app/ui/search"
import { CustomersTableSkeleton } from "@/app/ui/customers/skeletons"
import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/auth/auth"
import { UserRole } from "@/auth/permissions"

export const metadata: Metadata = {
	title: "Customers"
}

export default async function Page({
	searchParams
}: {
	searchParams?: {
		query?: string
		page?: string
	}
}) {
	const query = searchParams?.query || ""
	const currentPage = Number(searchParams?.page) || 1

	const totalPages = await fetchCustomersPages(query)
	const session = await auth()

	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${inter.className} text-2xl`}>Clientes</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Procure os clientes..." />
				{
					session?.user.permission === (UserRole.ADMIN || UserRole.MANAGER) && <CreateCustomer />
				}
			</div>
			<Suspense key={query} fallback={<CustomersTableSkeleton />}>
				<CustomersTable query={query} currentPage={currentPage} />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	)
}
