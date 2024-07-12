import { inter } from "@/app/ui/fonts"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Customers"
}

export default function Page() {
	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${inter.className} text-2xl`}>Clientes</h1>
			</div>
		</div>
	)
}
