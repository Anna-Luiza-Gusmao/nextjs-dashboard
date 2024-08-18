import clsx from "clsx"

export default function UserInitials({ userName, className }: { userName: string; className?: string }) {
    const userInitials = userName
            .split(" ")
            .map((part: string) => part[0])
            .join("")
            .toUpperCase()

    return (
        <div className={clsx(
            "flex items-center justify-center rounded-full text-white font-medium",
            className
        )}>
            <span>{userInitials}</span>
        </div>
    )
}
