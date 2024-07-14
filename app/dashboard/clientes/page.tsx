import { fetchCustomers, fetchCustomersPages, fetchFilteredCustomers } from "@/app/lib/data"
import CustomersTable from "@/app/ui/customers/table"
import { inter } from "@/app/ui/fonts"
import Pagination from "@/app/ui/invoices/pagination"
import Search from "@/app/ui/search"
import { CustomersTableSkeleton } from "@/app/ui/skeletons"
import { Metadata } from "next"
import { Suspense } from "react"

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
	const filteredCustomers = await fetchFilteredCustomers(query, currentPage)

	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${inter.className} mb-8 text-xl md:text-2xl`}>Clientes</h1>
			</div>
			<Search placeholder="Procure os clientes..." />
			<Suspense key={query} fallback={<CustomersTableSkeleton />}>
				<CustomersTable customers={filteredCustomers} />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	)
}
