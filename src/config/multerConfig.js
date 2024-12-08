import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dirPath = path.resolve("./src/thumbnails/");
    cb(null, dirPath);
  },
  filename: function(req, file, cb) {
    const filmeId = req.params.id;
    const newFileName = filmeId + "_" + Date.now() + ".jpg";
    cb(null, newFileName);
  }
});

export const upload = multer({ storage })
