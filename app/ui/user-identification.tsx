import { auth } from "@/auth/auth"
import UserInitials from "./user-initials"

export default async function UserIdentification() {
    const session = await auth()
    const userName = session?.user.name || ""

    const userPermission = () => {
        switch (session?.user.permission) {
            case "admin":
                return "Administrador"
            case "supervisor":
                return "Supervisor de Cobrança"
            case "manager":
                return "Gerente Financeiro"
            default:
                return "Contador"
        }
    }

    return (
        <section className="flex items-center gap-4 min-w-40">
            <UserInitials userName={userName} className="w-12 h-12 bg-violet-400 text-xl" />
            <div>
                <p>{userName}</p>
                <p className="text-sm text-gray-500">{userPermission()}</p>
            </div>
        </section>
    )
}
