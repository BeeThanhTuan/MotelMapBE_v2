const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'resources/'); // Thư mục chứa ảnh tải lên
    },
    filename: function(req, file, cb) {
        //Date.now() là trả về miligiây kể từ 1970
        cb(null,Date.now() + path.extname(file.originalname) );
    }
});

// const upload = multer({ storage: storage });

// module.exports = upload;

const uploadImagesAndVideo = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (file.fieldname === 'images' && !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Chỉ chấp nhận các tệp tin ảnh!'));
        } else if (file.fieldname === 'video' && !file.originalname.match(/\.(mp4|avi|mkv|mov)$/)) {
            return cb(new Error('Chỉ chấp nhận các tệp tin video!'));
        }
        cb(null, true);
    }
});

module.exports = { uploadImagesAndVideo };