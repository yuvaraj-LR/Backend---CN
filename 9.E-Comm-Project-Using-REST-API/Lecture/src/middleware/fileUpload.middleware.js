import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./uploads");
    },

    filename: (req, file, cb) => {
        let name = new Date().toISOString() + "-" + file.originalname;
        cb(null, name);
    }
});

export const uploadFile = multer({storage : storageConfig});