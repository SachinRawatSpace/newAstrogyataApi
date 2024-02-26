const AdminEventList = require("../models/addEvent");
const resp = require("../helpers/apiResponse");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// exports.admin_Addevent = async (req, res) => {
//     const { pooja_type, duration,product, desc, pooja_price,city,liveStreaming,time_slots,location,fullfill_location, benefits } = req.body;

//     const newAdminEventList = new AdminEventList({
//         pooja_type: pooja_type,
//         duration: duration,
//         desc: desc,
//         pooja_price: pooja_price,
//         benefits: benefits,
//         location:location,
//         city:city,
//         liveStreaming:liveStreaming,
//         product:product,
//        // available_slots:available_slots,
//         time_slots:time_slots,
//         fullfill_location:fullfill_location,


//     });


//     if (req.files) {
//         if (req.files.poojaimg[0].path) {
//             alluploads = [];
//             for (let i = 0; i < req.files.poojaimg.length; i++) {
//                 const resp = await cloudinary.uploader.upload(
//                     req.files.poojaimg[i].path,
//                     { use_filename: true, unique_filename: false }
//                 );
//                 fs.unlinkSync(req.files.poojaimg[i].path);
//                 alluploads.push(resp.secure_url);
//             }
//             newAdminEventList.poojaimg = alluploads;
//         }
//     }
//     newAdminEventList.save()


//         .then((data) => resp.successr(res, data))
//         .catch((error) => resp.errorr(res, error));
// };
exports.admin_Addevent = async (req, res) => {
    const { pooja_type, duration, product, desc, pooja_price, city, liveStreaming, time_slots, location, fullfill_location, benefits, mode, name, description, price, image } = req.body;

    const newAdminEventList = new AdminEventList({
        pooja_type: pooja_type,
        duration: duration,
        desc: desc,
        pooja_price: pooja_price,
        benefits: benefits,
        location: location,
        city: city,
        liveStreaming: liveStreaming,
        // product: product.map((item) => ({ // Convert the stringified JSON objects to actual objects
        //     name: item.name,
        //     description: item.description,
        //     price: item.price,
        //     image: item.image
        // })),
        // name: req.body.name,
        product: product,
        time_slots: time_slots,
        fullfill_location: fullfill_location,
        mode: mode,
        name: name,
        description: description,
        price: price,
        image: image
    });
    console.log()
    if (req.files) {
        if (req.files.poojaimg[0].path) {
            alluploads = [];
            for (let i = 0; i < req.files.poojaimg.length; i++) {
                const resp = await cloudinary.uploader.upload(
                    req.files.poojaimg[i].path,
                    { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.poojaimg[i].path);
                alluploads.push(resp.secure_url);
            }
            newAdminEventList.poojaimg = alluploads;
        }
    }
    newAdminEventList.save()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ error: error.message }));
};

exports.get_adminevent = async (req, res) => {
    await AdminEventList.find().populate("pooja_type")
        .sort({ createdAt: -1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.admin_getone_event = async (req, res) => {
    await AdminEventList.findOne({ _id: req.params.id }).populate("pooja_type")
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.admin_edit_event = async (req, res) => {
    await AdminEventList.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        { $set: req.body },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.admin_dlt_event = async (req, res) => {
    await AdminEventList.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.productbyPoojatyp = async (req, res) => {
    const getdata = await AdminEventList.find({ pooja_type: req.params.id }).populate("pooja_type")
        .sort({ createdAt: -1 })
    res.status(200).json({
        pooja_type: getdata.pooja_type,
        //product:getdata.product
    })
    // .then((data) => resp.successr(res, data))
    // .catch((error) => resp.errorr(res, error));
};