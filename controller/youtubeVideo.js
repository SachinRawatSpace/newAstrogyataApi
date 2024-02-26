const Video = require("../models/youtubeVideo");
const resp = require("../helpers/apiResponse");

exports.video = async (req, res) => {
    const { youtube_link } = req.body;

    const newVideo = new Video({
        youtube_link: youtube_link,
    });

    newVideo
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
}



exports.video_list = async (req, res) => {
    await Video.find()
        .sort({ sortorder: 1 })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.getone_video = async (req, res) => {
    await Video.findOne({ _id: req.params.id })
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.edit_video = async (req, res) => {
    await Video.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        { $set: req.body },
        { new: true }
    )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};


exports.dlt_video = async (req, res) => {
    await Video.deleteOne({ _id: req.params.id })
        .then((data) => resp.deleter(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.zegoLveStreaming = async (req, res) => {
    const appID = "" // type: number

    // 请将 serverSecret 修改为你的 serverSecret，serverSecret 为 string
    // 举例：'sdfsdfsd323sdfsdf'
    const serverSecret = ""
    // type: 32 byte length string

    // 请将 userId 修改为用户的 userId
    const userId = 'user1';// type: string

    const effectiveTimeInSeconds = 3600; //type: number; unit: s； token 过期时间，单位：秒
    const payloadObject = {
        room_id: 'room1', // 请修改为用户的 roomID
        // 本示例生成的 token 允许 loginRoom（登录房间）
        // 本示例生成的 token 不允许 publishStream（推流）
        privilege: {
            1: 1,   // loginRoom: 1 pass , 0 not pass
            2: 0    // publishStream: 1 pass , 0 not pass
        },
        stream_id_list: null
    }; // 
    const payload = JSON.stringify(payloadObject);
    // Build token 
    const token = generateToken04(appID, userId, serverSecret, effectiveTimeInSeconds, payload);
    console.log('token:', token);

}