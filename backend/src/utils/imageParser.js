import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // folder to store imaeg
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const fileExt = originalName.split('.').pop();
        cb(null, Date.now() + '-' + file.fieldname + '.' + fileExt); // timestamp added to file name
    }
});


const upload = multer({ storage: storage });

export default upload;