"use client"

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"

export default function NotAuthorized() {
    const router = useRouter()

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push("/dashboard")
        }
    }

    return (
        <main className="flex h-screen flex-col items-center justify-center gap-2">
            <ExclamationTriangleIcon className="w-12 text-red-600" />
            <h2 className="text-xl font-semibold">Você não tem permissão para acessar essa página.</h2>
            <p>Retorne para onde você estava.</p>
            <button
                onClick={handleBack}
                className="mt-4 rounded-md bg-violet-500 px-4 py-2 text-sm text-white transition-colors hover:bg-violet-400"
            >
                Voltar
            </button>
        </main>
    )
}
