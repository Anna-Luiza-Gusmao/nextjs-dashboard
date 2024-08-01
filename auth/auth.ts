import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { sql } from "@vercel/postgres"
import type { User } from "@/app/lib/definitions"
import bcrypt from "bcrypt"
import { UserRole } from "./permissions"

async function getUser(email: string): Promise<User | undefined> {
    try {
        const result = await sql<User>`
            SELECT 
                users.id,
                users.name,
                users.email,
                users.password,
                permissions.value AS permission
            FROM users
            JOIN permissions ON users.permission_id = permissions.id
            WHERE users.email = ${email}`
        const user = result.rows[0]

        if (user) {
            return {
                ...user,
                permission: user.permission as UserRole
            }
        }
    } catch (error) {
        console.error("Failed to fetch user:", error)
        throw new Error("Failed to fetch user.")
    }
}

export const { auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
        newUser: "/dashboard"
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await getUser(email)
                    if (!user) return null
                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            permission: user.permission as UserRole
                        }
                    }
                }
                console.log("Invalid credentials")
                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.permission = user.permission
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.permission = token.permission as UserRole
            }
            return session
        },
        async redirect({ baseUrl }) {
            return baseUrl + "/dashboard"
        }
    }
} satisfies NextAuthConfig)
