export enum UserRole {
    ADMIN = "admin",
    SUPERVISOR = "supervisor",
    MANAGER = "manager",
    ACCOUNTANT = "accountant"
}

interface IPermissions {
    [role: string]: string[]
}

const defaultPath = "/dashboard"

enum Routers {
    DASHBOARD = defaultPath,
    INVOICES = `${defaultPath}/faturas`,
    CREATE_INVOICES = `${defaultPath}/faturas/criar`,
    EDIT_INVOICES = `${defaultPath}/faturas/:id/editar`,
    CUSTOMERS = `${defaultPath}/clientes`,
    CREATE_CUSTOMERS = `${defaultPath}/clientes/criar`,
    EDIT_CUSTOMERS = `${defaultPath}/clientes/:id/editar`,
    USERS = `${defaultPath}/usuarios`,
    CREATE_USERS = `${defaultPath}/usuarios/criar`,
    EDIT_USERS = `${defaultPath}/usuarios/:id/editar`
}

export const PERMISSIONS: IPermissions = {
    [UserRole.ADMIN]: ["/*"],
    [UserRole.SUPERVISOR]: [
        Routers.DASHBOARD,
        Routers.INVOICES,
        Routers.EDIT_INVOICES,
        Routers.CUSTOMERS,
        Routers.EDIT_CUSTOMERS,
        Routers.USERS,
        Routers.EDIT_USERS
    ],
    [UserRole.MANAGER]: ["/*"],
    [UserRole.ACCOUNTANT]: [
        Routers.DASHBOARD,
        Routers.INVOICES,
        Routers.CREATE_INVOICES,
        Routers.EDIT_INVOICES,
        Routers.CUSTOMERS
    ]
}
