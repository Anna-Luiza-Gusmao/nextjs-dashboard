import { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"
import { UserRole } from "../permissions"

// 1. Extend the default user object to include the role property.
declare module "next-auth" {
    interface Session {
        user: {
            permission: UserRole
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        permission: UserRole
    }
}

// 2. Extend the JWT interface to include the role property.
declare module "next-auth/jwt" {
    interface JWT {
        permission: UserRole
    }
}
