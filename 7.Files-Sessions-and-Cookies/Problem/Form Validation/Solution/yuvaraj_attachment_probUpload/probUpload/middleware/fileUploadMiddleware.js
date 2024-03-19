// Please don't change the pre-written code
// Import the necessary modules here
import multer from "multer";
import path from "path";

// Write your code here
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public", "uploads"));
  },
  filename: (req, file, cb) => {
    const updatedFileName = Date.now() + file.originalname;
    cb(null, updatedFileName);
  },
});

export default multer({ storage : storageConfig });
