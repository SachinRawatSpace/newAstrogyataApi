const AsLive = require("../models/astroLiveStreaming");
const resp = require("../helpers/apiResponse");
const agora = require('agora-access-token');
const Astrologer = require("../models/astrologer");


exports.listLiveStreamAstro = async (req, res) => {
    await AsLive.find({ status: true }).populate("astroAccount")
        .sort({ createdAt: -1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.updateLiveStream = async (req, res) => {
    await AsLive.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        { $set: req.body },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.astroLiveStreaming = async (req, res) => {

    const {
        RtcTokenBuilder,
        RtcRole,
    } = agora;

    const getchnlname = await Astrologer.findOne({ _id: req.body.astroAccount })
    //   console.log("astro", getchnlname)
    const channelName = getchnlname.channelName
    const generateRtcToken = () => {
        const appId = '7d1f07c76f9d46be86bc46a791884023';
        const appCertificate = '14cdb5fc04344d0da3270c35d8d75431';
        const uid = 0;
        const { astroAccount } = req.body;
        const expirationTimeInSeconds = 36000;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, astroAccount, privilegeExpiredTs);
        //  console.log("Token With Integer Number Uid: " + tokenA);
        //  console.log("tokenA", channelName);
        return tokenA;
    }

    const tokenA = await generateRtcToken();
    // console.log("tokenA", tokenA)
    const { astroAccount, status, token } = req.body
    const newAsLive = new AsLive({
        astroAccount: astroAccount,
        status: status,
        token: tokenA,
        channelName: channelName

    })


    newAsLive
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
}
// res.status(200).json({
//   astroAccount: tokenA,

// });


// exports.astroLiveStreaming = async (req, res) => {

//     const {
//         RtcTokenBuilder,
//         RtcRole,
//     } = agora;

//     const getchnlname = await Astrologer.findOne({ _id: req.body.astroAccount })
//     //   console.log("astro", getchnlname)
//     const channelName = getchnlname.channelName

//     const generateRtcToken = () => {
//         const appId = '7d1f07c76f9d46be86bc46a791884023';
//         const appCertificate = '14cdb5fc04344d0da3270c35d8d75431';
//         const uid = 0;
//         const { astroAccount } = req.body;
//         const expirationTimeInSeconds = 3600 * 24; // 24 hours expiration time
//         const currentTimestamp = Math.floor(Date.now() / 1000);
//         const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
//         const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, astroAccount, privilegeExpiredTs);
//         //  console.log("Token With Integer Number Uid: " + tokenA);
//         //  console.log("tokenA", channelName);
//         return tokenA;
//     }

//     const { astroAccount, status, token } = req.body
//     const findexist = await AsLive.findOne({ astroAccount: astroAccount });
//     if (findexist) {
//         const currentTimeStamp = Math.floor(Date.now() / 1000);
//         const { token: oldToken, expiredAt } = findexist;
//         if (currentTimeStamp < expiredAt) {
//             res.status(201).json({
//                 status: true,
//                 msg: "already exists",
//                 _id: findexist._id,
//                 token: oldToken,
//                 channelName: findexist.channelName,
//                 status: findexist.status,
//                 astroAccount: findexist.astroAccount
//             })
//         } else {
//             const newToken = await generateRtcToken();
//             await AsLive.findByIdAndUpdate(findexist._id, {
//                 token: newToken,
//                 expiredAt: Math.floor(Date.now() / 1000) + (3600 * 24) // 24 hours from now
//             });
//             res.status(201).json({
//                 status: true,
//                 msg: "token updated",
//                 _id: findexist._id,
//                 token: newToken,
//                 channelName: findexist.channelName,
//                 status: findexist.status,
//                 astroAccount: findexist.astroAccount
//             })
//         }
//     } else {
//         const newAsLive = new AsLive({
//             astroAccount: astroAccount,
//             status: status,
//             token: await generateRtcToken(),
//             channelName: channelName,
//             expiredAt: Math.floor(Date.now() / 1000) + (3600 * 24) // 24 hours from now
//         })
//         newAsLive
//             .save()
//             .then((data) => resp.successr(res, data))
//             .catch((error) => resp.errorr(res, error));
//     }
// }


exports.UerLiveStreamingToken = async (req, res) => {

    const {
        RtcTokenBuilder,
        RtcRole,
    } = agora;

    const getchnlname = await Astrologer.findOne({ _id: req.body.astroAccount })
    //   console.log("astro", getchnlname)
    const channelName = getchnlname.channelName

    const generateRtcToken = () => {
        const appId = '7d1f07c76f9d46be86bc46a791884023';
        const appCertificate = '14cdb5fc04344d0da3270c35d8d75431';
        const uid = 0;
        const { astroAccount, userAccount } = req.body;
        const expirationTimeInSeconds = 3600 * 24; // 24 hours expiration time
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, userAccount, privilegeExpiredTs);
        //  console.log("Token With Integer Number Uid: " + tokenA);
        //  console.log("tokenA", channelName);
        return tokenA;
    }

    const { astroAccount, userAccount, token } = req.body
    const findexist = await AsLive.findOne({ astroAccount: astroAccount });
    if (findexist) {
        const currentTimeStamp = Math.floor(Date.now() / 1000);
        const { token: oldToken, expiredAt } = findexist;
        if (currentTimeStamp < expiredAt) {
            res.status(201).json({
                status: true,
                msg: "already exists",
                _id: findexist._id,
                token: oldToken,
                userAccount: userAccount,
                channelName: findexist.channelName,
                status: findexist.status,
                astroAccount: findexist.astroAccount,
                // astroAccount: findexist.userAccount
            })
        }
    } else {
        const newAsLive = new AsLive({
            astroAccount: astroAccount,
            userAccount: userAccount,
            token: await generateRtcToken(),
            channelName: channelName,
            expiredAt: Math.floor(Date.now() / 1000) + (3600 * 24) // 24 hours from now
        })
        newAsLive
            .save()
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
    }
}

exports.disConnectLiveStream = async (req, res) => {
    const getId = await AsLive.deleteOne({ _id: req.params.id })
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
