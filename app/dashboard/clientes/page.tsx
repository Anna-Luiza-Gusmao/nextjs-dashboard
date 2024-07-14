import { fetchCustomers, fetchFilteredCustomers } from "@/app/lib/data"
import CustomersTable from "@/app/ui/customers/table"
import { inter } from "@/app/ui/fonts"
import Search from "@/app/ui/search"
import { CustomersTableSkeleton } from "@/app/ui/skeletons"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
	title: "Customers"
}

export default async function Page() {
	const filteredCustomers = await fetchFilteredCustomers("")

	return (
		<div className="w-full">
			<h1 className={`${inter.className} mb-8 text-xl md:text-2xl`}>Clientes</h1>
			<Search placeholder="Procure os clientes..." />
			<Suspense fallback={<CustomersTableSkeleton />}>
				<CustomersTable customers={filteredCustomers} />
			</Suspense>
		</div>
	)
}
