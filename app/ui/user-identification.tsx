export default function UserIdentification() {
    return (
        <section className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-violet-400 rounded-full text-white text-xl font-medium">
                <span>JS</span>
            </div>
            <div>
                <p>Nome do Usuário</p>
                <p className="text-sm text-gray-500">Função</p>
            </div>
        </section>
    )
}
