"use client"

import { UserGroupIcon, HomeIcon, DocumentDuplicateIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { verifyAccountantUser } from "@/app/lib/actions"
import { useEffect, useState } from "react"

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{ name: "Home", href: "/dashboard", icon: HomeIcon },
	{
		name: "Faturas",
		href: "/dashboard/faturas",
		icon: DocumentDuplicateIcon
	},
	{ name: "Clientes", href: "/dashboard/clientes", icon: UserCircleIcon },
	{ name: "Usuários", href: "/dashboard/usuarios", icon: UserGroupIcon }
]

export default function NavLinks() {
	const pathname = usePathname()
	const [isAccountantUser, setIsAccountantUser] = useState<boolean>(true)

	useEffect(() => {
		verifyAccountantUser()
			.then((isAccountantUser) => setIsAccountantUser(isAccountantUser))
	}, [])

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon

				if (isAccountantUser && link.name === "Usuários") {
					return null
				}

				const isHomeLink = link.href === "/dashboard"
				const isActive = isHomeLink
					? pathname === link.href
					: pathname.startsWith(link.href)

				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(
							"flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-violet-100 hover:text-violet-600 md:flex-none md:justify-start md:p-2 md:px-3",
							{
								"bg-violet-100 text-violet-600": isActive
							}
						)}
					>
						<LinkIcon className="w-6" />
						<p className="hidden md:block">{link.name}</p>
					</Link>
				)
			})}
		</>
	)
}
