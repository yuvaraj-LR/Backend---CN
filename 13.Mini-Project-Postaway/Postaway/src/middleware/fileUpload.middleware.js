import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./uploads/img");
    },
    filename : (req, file, cb) => {
        const name = new Date().toISOString() + "-" + file.originalname;
        cb(null, name);
    }
});

export const fileUploader = multer({
    storage: storageConfig, 
})