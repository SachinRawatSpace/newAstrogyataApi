const VideoLinkNoti = require("../models/videoLinkNoti");
const resp = require("../helpers/apiResponse");
const Astrologer = require("../models/astrologer");

exports.send_VideoLink = async (req, res) => {
    const { astroid, videoLink, userid, type } = req.body;

    const newVideoLinkNoti = new VideoLinkNoti({
        astroid: astroid,
        videoLink: videoLink,
        userid: userid,
        type: "Video"

    });

    newVideoLinkNoti

        .save()
        .then((data) => resp.successr(res, data))

        .catch((error) => resp.errorr(res, error));
}




exports.VdolinkList = async (req, res) => {
    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

    await VideoLinkNoti.find({
        $and: [
            { astroid: req.params.id },
            { status: "Requested" }, { type: "Video" },
            { createdAt: { $gte: today } } // Filter by createdAt field >= today
        ]
    })


        .populate("astroid").populate("userid")
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};
exports.acceptVideoNotificationByAstro = async (req, res) => {
    const getdata = await VideoLinkNoti.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        { $set: { status: req.body.status } },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
}
exports.getoneChannl = async (req, res) => {
    await videoChannel.findOne({ _id: req.params.id }).populate("astroid")
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.updateRashi = async (req, res) => {
    await Rashi.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        { $set: req.body },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.dltVideoNotification = async (req, res) => {
    await VideoLinkNoti.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};
