"use client"

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Dispatch, SetStateAction, useCallback } from "react"

interface IDeleteModalProps {
    title: string
    description: string
    openDeleteModal: boolean
    setOpenDeleteModal: Dispatch<SetStateAction<boolean>>
    deleteAction: () => Promise<{
        message: string
    }>
}

export default function DeleteModal({
    title,
    description,
    openDeleteModal,
    setOpenDeleteModal,
    deleteAction
}: IDeleteModalProps) {
    const handleCancelButton = useCallback(() => {
        setOpenDeleteModal(false)
    }, [openDeleteModal])

    return (
        <div className={`absolute z-30 ${clsx(openDeleteModal ? "block" : "hidden")}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="flex flex-col gap-2 mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-base font-semibold leading-6 text-gray-900"
                                        id="modal-title"
                                    >
                                        {title}
                                    </h3>
                                    <p className="break-words whitespace-normal text-sm text-gray-500">{description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <form action={deleteAction}>
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md 
                                        bg-red-600 px-3 py-2 text-sm font-semibold text-white 
                                        shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Deletar
                                </button>
                            </form>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md 
                                    bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                                    shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={handleCancelButton}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}