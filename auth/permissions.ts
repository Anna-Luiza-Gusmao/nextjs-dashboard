export enum UserRole {
    ADMIN = "admin",
    SUPERVISOR = "supervisor",
    MANAGER = "manager",
    ACCOUNTANT = "accountant"
}

interface IPermissions {
    [role: string]: string[]
}

enum Routers {
    DASHBOARD = "/dashboard",
    INVOICES = "/dashboard/faturas",
    CREATE_INVOICES = "/dashboard/faturas/criar",
    EDIT_INVOICES = "/dashboard/faturas/:id/editar",
    CUSTOMERS = "/dashboard/clientes",
    CREATE_CUSTOMERS = "/dashboard/clientes/criar",
    EDIT_CUSTOMERS = "/dashboard/clientes/:id/editar"
}

export const PERMISSIONS: IPermissions = {
    [UserRole.ADMIN]: ["/*"],
    [UserRole.SUPERVISOR]: [
        Routers.DASHBOARD,
        Routers.INVOICES,
        Routers.EDIT_INVOICES,
        Routers.CUSTOMERS,
        Routers.EDIT_CUSTOMERS
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
