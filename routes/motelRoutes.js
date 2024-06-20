const express = require('express');
const router = express.Router();
const models = require('../models/motelModel');
const { uploadImagesAndVideo } = require('../routes/uploadRoutes');
const { Motel, Landlord, ImageMotel, VideoMotel, UpdateInfo } = require('../models/motelModel');


// Lấy toàn bộ nhà trọ
router.get('/api/motels', async(req, res) => {
    try {
        // Lấy tất cả thông tin nhà trọ
        const motelDataList = await models.Motel.find().populate('Image Video').exec();
        if (!motelDataList || motelDataList.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy nhà trọ nào' });
        }
        // Lấy thông tin chủ nhà trọ cho tất cả các nhà trọ
        const landlordDataList = await models.Landlord.find().exec();
        // Lấy thông tin hình ảnh + video nhà trọ cho tất cả các nhà trọ
        const imageDataList = await models.ImageMotel.find().exec();
        const videoDataList = await models.VideoMotel.find().exec();

        // Tạo mảng chứa tất cả thông tin
        const fullDataList = motelDataList.map((motelData) => {
            const landlordData = landlordDataList.find((item) => item.IDMotel ?.equals(motelData._id));
            const imageData = imageDataList.filter((item) => item.IDMotel ?.equals(motelData._id));
            const videoData = videoDataList.filter((item) => item.IDMotel ?.equals(motelData._id));


            // Gộp thông tin giá điện nước và chủ nhà trọ vào thông tin nhà trọ
            const motelWithExtraInfo = {
                ...motelData.toObject(), // Chuyển đổi thành plain JavaScript object
                Landlord: landlordData,
                Image: imageData,
                Video: videoData,
            };

            return motelWithExtraInfo;
        });

        res.json(fullDataList);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
    }
});


//lấy toàn bộ nhà trọ với isAccept = 1
router.get('/api/motels/accept=1', async(req, res) => {
    try {
        // Lấy tất cả thông tin nhà trọ
        const motelDataList = await models.Motel.find({ IsAccept: 1 }).populate('Image Video').exec();
        if (!motelDataList || motelDataList.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy nhà trọ nào' });
        }
        // Lấy thông tin chủ nhà trọ cho tất cả các nhà trọ
        const landlordDataList = await models.Landlord.find().exec();
        // Lấy thông tin hình ảnh + video nhà trọ cho tất cả các nhà trọ
        const imageDataList = await models.ImageMotel.find().exec();
        const videoDataList = await models.VideoMotel.find().exec();

        // Tạo mảng chứa tất cả thông tin
        const fullDataList = motelDataList.map((motelData) => {
            const landlordData = landlordDataList.find((item) => item.IDMotel ?.equals(motelData._id));
            const imageData = imageDataList.filter((item) => item.IDMotel ?.equals(motelData._id));
            const videoData = videoDataList.filter((item) => item.IDMotel ?.equals(motelData._id));


            // Gộp thông tin giá điện nước và chủ nhà trọ vào thông tin nhà trọ
            const motelWithExtraInfo = {
                ...motelData.toObject(), // Chuyển đổi thành plain JavaScript object
                Landlord: landlordData,
                Image: imageData,
                Video: videoData,
            };

            return motelWithExtraInfo;
        });

        res.json(fullDataList);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
    }
});


//lấy toàn bộ nhà trọ với isAccept = 0
router.get('/api/motels/accept=0', async(req, res) => {
    try {
        // Lấy tất cả thông tin nhà trọ
        const motelDataList = await models.Motel.find({ IsAccept: 0 }).populate('Image Video').exec();
        if (!motelDataList || motelDataList.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy nhà trọ nào' });
        }
        // Lấy thông tin chủ nhà trọ cho tất cả các nhà trọ
        const landlordDataList = await models.Landlord.find().exec();
        // Lấy thông tin hình ảnh + video nhà trọ cho tất cả các nhà trọ
        const imageDataList = await models.ImageMotel.find().exec();
        const videoDataList = await models.VideoMotel.find().exec();

        // Tạo mảng chứa tất cả thông tin
        const fullDataList = motelDataList.map((motelData) => {
            const landlordData = landlordDataList.find((item) => item.IDMotel ?.equals(motelData._id));
            const imageData = imageDataList.filter((item) => item.IDMotel ?.equals(motelData._id));
            const videoData = videoDataList.filter((item) => item.IDMotel ?.equals(motelData._id));


            // Gộp thông tin giá điện nước và chủ nhà trọ vào thông tin nhà trọ
            const motelWithExtraInfo = {
                ...motelData.toObject(), // Chuyển đổi thành plain JavaScript object
                Landlord: landlordData,
                Image: imageData,
                Video: videoData,
            };

            return motelWithExtraInfo;
        });

        res.json(fullDataList);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
    }
});

router.get('/api/motel/:id', async(req, res) => {
    try {
        const motelId = req.params.id;
        // Lấy thông tin nhà trọ
        const motelData = await models.Motel.findById(motelId).populate('Image Video').exec();
        if (!motelData) {
            return res.status(404).json({ error: 'Không tìm thấy nhà trọ' });
        }
        // Lấy thông tin chủ nhà trọ
        const landlordData = await models.Landlord.findOne({ IDMotel: motelId }).exec();
        // Lấy thông tin hình ảnh + video nhà trọ
        const imageData = await models.ImageMotel.find({ IDMotel: motelId }).exec();
        const videoData = await models.VideoMotel.find({ IDMotel: motelId }).exec()

        // Tạo mảng chứa tất cả thông tin
        const motelWithExtraInfo = {
            ...motelData.toObject(), // Chuyển đổi thành plain JavaScript object
            Landlord: landlordData,
            Image: imageData,
            Video: videoData,

        };
        res.json(motelWithExtraInfo);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
    }
});

router.post('/api/motel', uploadImagesAndVideo.fields([{ name: 'images', maxCount: 6 }, { name: 'video', maxCount: 1 }]), async(req, res) => {
    try {
        // Nhận dữ liệu từ req.body và req.file
        const {
            nameMotel,
            latLng,
            address,
            subDistrict,
            description,
            convenient,
            acreage,
            price,
            electric,
            water,
            wifi,
            amount,
            hostName,
            addressHostName,
            numberPhone,
            distance,
            userCreate,
            isAccept,
        } = req.body;

        const listFileImage = req.files['images'] ? req.files['images'].map(image => image.filename) : [];
        const fileVideo = req.files['video'] ? req.files['video'][0].filename : null;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        // Tạo một đối tượng mới cho Nhà Trọ
        const newMotel = new Motel({
            NameMotel: nameMotel,
            LatLng: latLng,
            Address: address,
            SubDistrict: subDistrict,
            Description: description,
            Convenient: convenient,
            Acreage: acreage,
            Price: price,
            PriceElectric: electric,
            PriceWater: water,
            PriceWifi: wifi,
            Amount: amount,
            Distance: distance,
            DateCreate: formattedDate,
            UserCreate: userCreate,
            IsAccept: isAccept,
        });

        // Lưu Nhà Trọ mới vào CSDL
        const savedMotel = await newMotel.save();

        // Lưu ảnh
        let savedImageMotel = [];
        if (listFileImage.length > 0) {
            const imagePromises = listFileImage.map(image => {
                const newImageMotel = new ImageMotel({
                    IDMotel: savedMotel._id,
                    Image: image
                });
                return newImageMotel.save();
            });
            savedImageMotel = await Promise.all(imagePromises);
        }

        // Lưu video nếu có
        let savedVideoMotel = null;
        if (fileVideo) {
            const newVideoMotel = new VideoMotel({
                IDMotel: savedMotel._id,
                Video: fileVideo
            });
            savedVideoMotel = await newVideoMotel.save();
        }

        // Tạo và lưu Chủ Nhà Trọ
        const newLandLord = new Landlord({
            IDMotel: savedMotel._id,
            HostName: hostName,
            Address: addressHostName,
            NumberPhone: numberPhone,
        });
        const savedLandLord = await newLandLord.save();

        // Gửi phản hồi về frontend
        res.json({ success: true, message: 'Motel added successfully', data: { Motel: savedMotel, Landlord: savedLandLord, ImageMotel: savedImageMotel, VideoMotel: savedVideoMotel } });

    } catch (error) {
        console.error('Error adding motel:', error);
        res.status(500).json({ success: false, message: 'Error adding motel', error: error.message });
    }
});


router.delete('/api/motel/:id', async(req, res) => {
    try {
        const motelId = req.params.id;
        // Xóa Nhà Trọ dựa trên ID
        const deletedMotel = await Motel.findOneAndDelete({ _id: motelId });

        if (!deletedMotel) {
            return res.status(404).json({ success: false, message: 'Motel not found' });
        } else {
            // Xóa AnhNhaTro dựa trên IDNhaTro
            await ImageMotel.deleteMany({ IDMotel: motelId });
            // Xóa VideoNhaTro dựa trên IDNhaTro
            await VideoMotel.deleteOne({ IDMotel: motelId });
            // Xóa ChuNhaTro dựa trên IDNhaTro
            await Landlord.deleteOne({ IDMotel: motelId });
            res.json({ success: true, message: 'Motel deleted successfully', data: deletedMotel });
        }

    } catch (error) {
        console.error('Error deleting motel:', error);
        res.status(500).json({ success: false, message: 'Error deleting motel' });
    }
});

router.put('/api/motel/:id', uploadImagesAndVideo.fields([{ name: 'images', maxCount: 6 }, { name: 'video', maxCount: 1 }]), async(req, res) => {
    try {
        const motelId = req.params.id;
        const {
            nameMotel,
            latLng,
            address,
            subDistrict,
            description,
            convenient,
            acreage,
            price,
            electric,
            water,
            wifi,
            amount,
            hostName,
            addressHostName,
            numberPhone,
            distance,
            userUpdate,
            isAccept,
        } = req.body;

        const { images, video } = req.files;

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        const existingMotel = await Motel.findById(motelId);

        if (!existingMotel) {
            return res.status(404).json({ success: false, message: 'Motel not found' });
        }

        const updatedMotelData = {
            NameMotel: nameMotel,
            LatLng: latLng,
            Address: address,
            SubDistrict: subDistrict,
            Description: description,
            Convenient: convenient,
            Acreage: acreage,
            Price: price,
            PriceElectric: electric,
            PriceWater: water,
            PriceWifi: wifi,
            Amount: amount,
            Distance: distance,
            DateUpdate: formattedDate,
            UserUpdate: userUpdate,
            IsAccept: isAccept,
        };
        console.log('kc', distance);
        const updatedMotel = await Motel.findByIdAndUpdate(motelId, updatedMotelData, { new: true });

        // Handle images
        if (images) {
            await ImageMotel.deleteMany({ IDMotel: motelId });
            const savedImages = [];
            for (const image of images) {
                const newImageMotel = new ImageMotel({ IDMotel: motelId, Image: image.filename });
                const savedImage = await newImageMotel.save();
                savedImages.push(savedImage);
            }
            updatedMotel.ImageMotel = savedImages;
        }

        // Handle video (optional)
        if (video) {
            await VideoMotel.findOneAndUpdate({ IDMotel: motelId }, { Video: video.filename }, { upsert: true });
            updatedMotel.VideoMotel = video.filename;
        }

        // Update landlord information
        const updatedLandlordData = {
            HostName: hostName,
            Address: addressHostName,
            NumberPhone: numberPhone,
        };
        const updatedLandlord = await Landlord.findOneAndUpdate({ IDMotel: motelId }, updatedLandlordData, { new: true });

        res.json({
            success: true,
            message: 'Motel updated successfully',
            data: { Motel: updatedMotel, Landlord: updatedLandlord },
        });
    } catch (error) {
        console.error('Error updating motel:', error);
        res.status(500).json({ success: false, message: 'Error updating motel' });
    }
});

router.put('/api/motel-pending/:id', async(req, res) => {
    try {
        const motelId = req.params.id;
        console.log(motelId);
        const latLng = req.body.latLng;
        const distance = req.body.distance;
        const updatedMotel = await Motel.findByIdAndUpdate(
            motelId, {
                LatLng : latLng,
                Distance: distance,
                IsAccept: 0,   
            }, { new: true } // Trả về bản ghi đã được cập nhật
        );
        res.json({
            success: true,
            message: 'Motel pending updated successfully',
            data: { Motel: updatedMotel},
        });

    } catch (error) {
        console.error('Error updating motel:', error);
        res.status(500).json({ success: false, message: 'Error updating motel' });
    }
});

module.exports = router;