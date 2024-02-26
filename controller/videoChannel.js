const videoChannel = require("../models/videoChannel");
const resp = require("../helpers/apiResponse");
const Astrologer = require("../models/astrologer");

exports.add_VideoChannel= async (req, res) => {
  const { astroid ,channelName} = req.body;

  const newvideoChannel= new videoChannel({
    astroid:astroid,
    channelName:channelName,
     
   });
   const findexist = await videoChannel.findOne({  $and:[{astroid: astroid},{channelName: channelName}]})
    
  if (findexist) {
      resp.alreadyr(res);
  }else{
    newvideoChannel
      .save()
      .then((data) => {
        Astrologer.findOneAndUpdate(
          {_id:astroid},
          {channelName: channelName},
          (err)=>{
            if(err){
            resp.errorr(res, err);
          }else{
            resp.successr(res, data);
          }
        }
        )
      })
      .catch((error) => resp.errorr(res, error));
  }
  }



exports.channelList= async (req, res) => {
    await videoChannel.find({astroid:req.params.id}).populate("astroid")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

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
  

  exports.dltVideoChannl= async (req, res) => {
    await videoChannel.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  