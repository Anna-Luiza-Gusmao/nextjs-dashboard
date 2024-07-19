import path from "path"
import fs from "fs/promises"
import { v4 as uuidv4 } from "uuid"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const formData = await request.formData()

    const file: File | null = formData.get("file") as File
    if (!file) {
        return NextResponse.json(
            { error: "No file updated." },
            { status: 400 }
        )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const uniqueId = uuidv4()
    const fileName = `${uniqueId}-${file.name}`
    const filePath = path.join(process.cwd(), 'public', 'customers', fileName)

    const pathToCustomersImages = path.join(process.cwd(), "public", "customers")

    try {
        // Read the contents of the directory specified
        await fs.readdir(pathToCustomersImages)
    } catch (error) {
        // Create the directory specified
        await fs.mkdir(pathToCustomersImages)
    }

    // Save the file
    await fs.writeFile(filePath, buffer)

    return NextResponse.json(
        { message: "Image created in public folder successfully.", fileName },
        { status: 200 }
    )
}

export async function DELETE(request: NextRequest) {
    const { fileName } = await request.json()
    const filePath = path.join(process.cwd(), "public", fileName)

    try {
        await fs.unlink(filePath)
        return NextResponse.json({ message: "File deleted successfully." }, { status: 200 })
    } catch (error) {
        console.error("Error deleting file:", error)
        return NextResponse.json({ error: "The customer image cannot be removed." }, { status: 400 })
    }
}

export async function PATCH(request: NextRequest) {
    const formData = await request.formData()
    const oldFileName = formData.get("oldFileName") as string

    // Delete old image
    const oldFilePath = path.join(process.cwd(), "public", "customers", oldFileName)
    try {
        await fs.unlink(oldFilePath)
    } catch (error) {
        console.error("Error deleting old file:", error)
        return NextResponse.json({ error: "Failed to delete old customer image." }, { status: 400 })
    }

    // Handle new image upload
    const file: File | null = formData.get("customerPhoto") as File
    if (!file) {
        return NextResponse.json(
            { error: "No file uploaded." },
            { status: 400 }
        )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const uniqueId = uuidv4()
    const newFileName = `${uniqueId}-${file.name}`
    const newFilePath = path.join(process.cwd(), 'public', 'customers', newFileName)

    try {
        await fs.writeFile(newFilePath, buffer)
    } catch (error) {
        console.error("Error saving new file:", error)
        return NextResponse.json({ error: "Failed to save new image." }, { status: 500 })
    }

    return NextResponse.json(
        { message: "Image updated successfully.", fileName: newFileName },
        { status: 200 }
    )
}
