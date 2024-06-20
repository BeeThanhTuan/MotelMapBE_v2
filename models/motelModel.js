const mongoose = require('mongoose');
const Account = require('./accountModel');
// Định nghĩa schema cho các collections
const MotelSchema = new mongoose.Schema({
    // IDNhaTro: String,
    LatLng: { type: String},
    NameMotel: { type: String },
    Address: { type: String, required: true },
    SubDistrict: { type: String, required: true },
    Amount: { type: Number },
    Description: { type: String, required: true },
    Distance: { type: Number },
    Acreage: { type: Number},
    Price: { type: Number, required: true },
    Convenient: { type: String },
    PriceElectric: { type: Number},
    PriceWater: { type: Number},
    PriceWifi: Number,
    Image: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImageMotel' }],
    Video: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VideoMotel' }],
    DateCreate: { type: String },
    UserCreate: { type: String },
    IsAccept: {type: Boolean},
    DateUpdate: { type: String },
    UserUpdate: { type: String},

}, {
    collection: "Motel"
});


const LandlordSchema = new mongoose.Schema({
    // IDChuNhaTro: String,
    IDMotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Motel' },
    HostName: { type: String, required: true },
    Address: { type: String },
    NumberPhone: { type: String, required: true }
}, {
    collection: "Landlord"
});

const ImageMotelSchema = new mongoose.Schema({
    // IDAnh: String,
    IDMotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Motel' },
    Image: { type: String, required: true },

}, {
    collection: "ImageMotel"
});
const VideoMotelSchema = new mongoose.Schema({
    // IDVideo: String,
    IDMotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Motel' },
    Video: { type: String },

}, {
    collection: "VideoMotel"
});





// Tạo model từ các schema
const Motel = mongoose.model('Motel', MotelSchema);
const Landlord = mongoose.model('Landlord', LandlordSchema);
const ImageMotel = mongoose.model('ImageMotel', ImageMotelSchema);
const VideoMotel = mongoose.model('VideoMotel', VideoMotelSchema);





module.exports = {
    Motel,
    Landlord,
    ImageMotel,
    VideoMotel,
};