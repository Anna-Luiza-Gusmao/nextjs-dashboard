import { NextApiHandler, NextApiRequest } from "next"
import formidable from "formidable"
import path from "path"
import fs from "fs/promises"
import { v4 as uuidv4 } from "uuid"

export const config = {
    api: {
        bodyParser: false
    }
}

const readFile = (
    req: NextApiRequest, saveLocally?: boolean
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

const handler: NextApiHandler = async (req, res) => {
    const pathToCustomersImages = path.join(process.cwd(), "/public", "customers")

    try {
        // Read the contents of the directory specified
        await fs.readdir(pathToCustomersImages)
    } catch (error) {
        // Create the directory specified
        await fs.mkdir(pathToCustomersImages)
    }

    try {
        const { files } = await readFile(req, true)
        console.log("arquivos: ", files)
        // res.json({ filePath: `/customers/${fileName}` });
    } catch (error) {
        res.status(500).json({ message: "Erro ao fazer upload da imagem para a pasta public." })
    }
}

export default handler