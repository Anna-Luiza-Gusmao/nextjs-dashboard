import formidable from "formidable"
import path from "path"
import fs from "fs/promises"
import { v4 as uuidv4 } from "uuid"
import { NextResponse } from "next/server"

export const config = {
    api: {
        bodyParser: false
    }
}

const readFile = (
    req: Response, saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {}
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "public/customers")
        options.filename = (name, ext, path, form) => {
            const uniqueId = uuidv4()
            const fileName = `${uniqueId}-${path.originalFilename}`
            return fileName
        }
    }

    const form = formidable()
    return new Promise((resolve, reject) => {
        form.parse(req, (error, fields, files) => {
            if (error) reject(error)
            resolve({ fields, files })
        })
    })
}

export async function POST(request: Response) {
    const pathToCustomersImages = path.join(process.cwd(), "/public", "customers")

    try {
        // Read the contents of the directory specified
        await fs.readdir(pathToCustomersImages)
    } catch (error) {
        // Create the directory specified
        await fs.mkdir(pathToCustomersImages)
    }

    await readFile(request, true)

    return NextResponse.json({ message: "Image created in public folder successfully." }, { status: 200 })
}