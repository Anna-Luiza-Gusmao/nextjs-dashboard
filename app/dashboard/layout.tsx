import SideNav from "@/app/ui/dashboard/sidenav"
import UserIdentification from "../ui/user-identification"

export const experimental_ppr = true

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
			<div className="w-full flex-none md:w-64">
				<SideNav />
			</div>
			<section className="flex flex-col w-full pt-4 md:overflow-hidden">
				<div className="flex md:justify-end px-6 py-4 md:px-12 md:py-2">
					<UserIdentification />
				</div>
				<div className="flex-grow px-6 py-3 md:overflow-y-auto md:px-12 md:py-6">{children}</div>
			</section>
		</div>
	)
}
