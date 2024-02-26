const AsLive = require("../models/yog_liveStream");
const resp = require("../helpers/apiResponse");
const agora = require('agora-access-token');
const Astrologer = require("../models/astrologer");

exports.goLiveStreaming = async (req, res) => {
    try {
        const { astroId, status, liveId } = req.body;
        const findexist = await AsLive.findOne({ astroId: astroId });
        //  console.log(req.body)

        // if the document does not exist, create a new one
        const getastro = await Astrologer.findOne({ _id: req.body.astroId });
        console.log("getastro", getastro)

        const newAsLive = new AsLive({
            astroId: astroId,
            status: status,
            liveId: liveId,
            name: getastro.fullname
        });

        newAsLive
            .save()
            .then((data) => {
                res.status(200).json({
                    status: true,
                    msg: "success",
                    astroId: astroId,
                    status: status,
                    name: getastro?.fullname,
                    liveId: liveId
                })
            })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred",
            error: error
        });
    }
}


exports.LiveAstrologer = async (req, res) => {
    try {
        const getdetail = await AsLive.find({ status: true }).populate("astroId").sort({ createdAt: -1 });

        if (getdetail.length > 0) {
            const astrologers = getdetail.map(detail => ({
                astroId: detail.astroId._id,
                status: detail.status,
                name: detail.astroId.fullname,
                liveId: detail.liveId,
                img: detail.astroId.img
            }));

            res.status(200).json({
                status: true,
                msg: "success",
                astrologers: astrologers
            });
        } else {
            res.status(404).json({
                status: false,
                message: "No live astrologer found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An error occurred",
            error: error
        });
    }
};



exports.discloseLiveStream = async (req, res) => {
    const getId = await AsLive.deleteOne({ liveId: req.params.id })
    if (getId) {
        res.status(200).json({
            status: true,
            msg: "Disconnect Streaming",

        })
    } else {
        res.status(500).json({
            status: false,
            message: "error",
            error: error
        });
    }

};


