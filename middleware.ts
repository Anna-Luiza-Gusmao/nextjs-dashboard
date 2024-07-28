// A vantagem de empregar o Middleware para essa tarefa é que as rotas protegidas não começarão a renderizar até que o Middleware verifique a autenticação,
// melhorando a segurança e o desempenho do aplicativo.

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { PERMISSIONS, UserRole } from "./auth/permissions"

const secret = process.env.NEXTAUTH_SECRET as string

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret, salt: "authjs.session-token" })

    // Check if the user is authenticated
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    const currentPath = request.nextUrl.pathname
    const userRole = token.permission as UserRole
    const userPermissions = PERMISSIONS[userRole]

    // Check if user has permission to access the current route
    const hasPermission = userPermissions.some((path) => {
        // Replace dynamic segments like ":id" with regex matchers
        const regexPath = path.replace(/:\w+/g, "[^/]+")

        if (path === '/*') {
            return true // Grant access to all paths
        }

        // Create a regex from the path to match the current URL
        const regex = new RegExp(`^${regexPath}$`)
        return regex.test(currentPath)
    })

    if (!hasPermission) {
        console.log(`User with role ${userRole} does not have access to ${currentPath}`)
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: "/dashboard/:path*"
}
