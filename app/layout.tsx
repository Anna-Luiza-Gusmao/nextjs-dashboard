import "@/app/ui/global.css"
import { inter } from "@/app/ui/fonts"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: {
		template: "%s | Acme Dashboard",
		default: "Acme Dashboard"
	},
	description: "Uma aplicação web para gerenciar clientes e suas faturas utilizando o NextJS e o React.",
	metadataBase: new URL("https://next-learn-dashboard.vercel.sh")
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-br">
			<body className={`${inter.className} antialiased`}>
				{children}
			</body>
		</html>
	)
}
