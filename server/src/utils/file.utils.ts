import multer from "multer";
import * as path from "path";

const storage = (target: string) =>
  multer.diskStorage({
    destination: (req, file, callback) => {
      // the image will be stored to the public images
      callback(null, target ? `public/images/${target}` : "public/images");
    },
    filename: (req, file, callback) => {
      callback(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });

const upload = (target: string) => multer({ storage: storage(target) });

export default { upload };
