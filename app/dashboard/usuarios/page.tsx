import Pagination from "@/app/ui/pagination"
import Search from "@/app/ui/search"
import { inter } from "@/app/ui/fonts"
import { fetchUsersPages } from "@/app/lib/data"
import { Metadata } from "next"
import { auth } from "@/auth/auth"
import { UserRole } from "@/auth/permissions"
import { CreateUser } from "@/app/ui/users/buttons"
import { Suspense } from "react"
import Table from "@/app/ui/users/table"
import { UsersTableSkeleton } from "@/app/ui/users/skeletons"

export const metadata: Metadata = {
	title: "Usuários"
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

	const totalPages = await fetchUsersPages(query)
	const session = await auth()

	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${inter.className} text-2xl`}>Usuários</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Procure os usuários..." />
				{
					session?.user.permission === (UserRole.ADMIN || UserRole.MANAGER) && <CreateUser />
				}
			</div>
			<Suspense key={query + currentPage} fallback={<UsersTableSkeleton />}>
				<Table query={query} currentPage={currentPage} />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	)
}
