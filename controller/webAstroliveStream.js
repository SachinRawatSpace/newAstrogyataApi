const WebLivestream = require("../models/webAstroliveStream");
const resp = require("../helpers/apiResponse");

exports.WebliveStream = async (req, res) => {
    const { astroid, status, videoliveStream } = req.body;


    const newWebLivestream = new WebLivestream({
        astroid: astroid,
        status: status,
        videoliveStream: videoliveStream
    });

    newWebLivestream
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.closeLiveStream = async (req, res) => {
    const getId = await WebLivestream.deleteOne({ _id: req.params.id })

        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
}

exports.listWebLiveStream = async (req, res) => {
    await WebLivestream.find({ status: "live" }).populate("astroid")
        .sort({ createdAt: -1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

