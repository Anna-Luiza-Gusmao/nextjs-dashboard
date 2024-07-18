import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

export default NextAuth(authConfig).auth

// A vantagem de empregar o Middleware para essa tarefa é que as rotas protegidas não começarão a renderizar até que o Middleware verifique a autenticação,
// melhorando a segurança e o desempenho do seu aplicativo.

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}