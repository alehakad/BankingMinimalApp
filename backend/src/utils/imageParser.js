import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // folder to store imaeg
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // timestamp added to file name
    }
});


const upload = multer({ storage: storage });

export default upload;