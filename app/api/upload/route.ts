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