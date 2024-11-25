import multer from "multer";
import fs from 'fs';

export const getUserFolderPath = (userEmail) => {
    return `uploads/${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userEmail = req.auth.userEmail;
        const folderPath = getUserFolderPath(userEmail);

        // Ensure the folder exists
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const fileExt = originalName.split('.').pop();
        cb(null, Date.now() + '-' + file.fieldname + '.' + fileExt); // timestamp added to file name
    }
});


const upload = multer({ storage: storage });

export default upload;