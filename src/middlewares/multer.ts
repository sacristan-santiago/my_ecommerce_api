import multer from "multer"
import { GridFsStorage } from "multer-gridfs-storage";
import { myURI } from "../services/atlasDB"

const storage = new GridFsStorage({
    url: myURI,
    file: (req: any, file:any) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-Avatar-${file.originalname}`
        }
    }
})

export const upload = multer ({storage})

