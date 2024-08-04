import { auth } from "@/auth/auth"

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

    const userInitials = (userName: string) => {
        const userInitials = userName
            .split(' ')
            .map((part: string) => part[0])
            .join('')
            .toUpperCase()

        return (
            <div className="flex items-center justify-center w-12 h-12 bg-violet-400 rounded-full text-white text-xl font-medium">
                <span>{userInitials}</span>
            </div>
        )
    }

    return (
        <section className="flex items-center gap-4 min-w-40">
            {userInitials(userName)}
            <div>
                <p>{userName}</p>
                <p className="text-sm text-gray-500">{userPermission()}</p>
            </div>
        </section>
    )
}
