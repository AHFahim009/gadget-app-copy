import { extname } from "path";
import { diskStorage } from "multer";
import multer from "multer";

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
        console.log(file);

    },
    filename: (req, file, cb) => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const uniqueSuffix = `${randomNumber}${extname(file.originalname)}`;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage });

export default upload;
