import Link from "next/link"
import { FaceFrownIcon } from "@heroicons/react/24/outline"

export default function NotFound() {
	return (
		<main className="flex items-center justify-center w-full h-screen flex-col gap-2">
			<FaceFrownIcon className="w-10 text-gray-400" />
			<h2 className="mx-8 text-center text-xl font-semibold">Ops! Página não encontrada.</h2>
			<p className="mx-8 text-center">Não foi possível encontrar a página, volte para a página principal.</p>
			<Link
				href="/dashboard"
				className="mt-4 rounded-md bg-violet-500 px-4 py-2 text-sm text-white transition-colors hover:bg-violet-400"
			>
				Voltar
			</Link>
		</main>
	)
}
