import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Dispatch, SetStateAction, useEffect } from "react"

interface IAlertProps {
    title: string
    message: string
    handleClose: Dispatch<SetStateAction<boolean>>
}

export default function Alert({ title, message, handleClose }: IAlertProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose(false)
        }, 7000)

        return () => clearTimeout(timer)
    }, [handleClose])

    return (
        <div
            className="z-40 fixed bottom-6 right-10 bg-yellow-100 border-t-4 border-yellow-400 rounded-b text-orange-950 px-4 py-3 shadow-md transition-all ease-in-out duration-500 animate-slideIn"
            role="alert"
        >
            <div className="flex">
                <InformationCircleIcon className="w-6 h-auto mx-2 hidden md:block" />
                <section className="mr-10">
                    <p className="font-bold">{title}</p>
                    <p className="text-sm">{message}</p>
                </section>
                <button onClick={() => handleClose(false)} className="flex w-6 h-6"><XMarkIcon /></button>
            </div>
        </div>
    )
}
