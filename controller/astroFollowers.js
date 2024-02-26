const AstroFollowers = require("../models/astroFollowers");
const resp = require("../helpers/apiResponse");

exports.addAstroFollowers = async (req, res) => {
  const { astroid, userid, follow } = req.body;

  // Check if the combination of userid and astroid already exists in the database
  // const existingAstroFollowers = await AstroFollowers.findOne({
  //   astroid: astroid,
  //   userid: userid,
  // });

  // if (existingAstroFollowers) {
  //   return resp.errorr(res, "Combination already exists in the database");
  // }

  const newAstroFollowers = new AstroFollowers({
    astroid: astroid,
    userid: userid,
    follow: "true",
  });

  newAstroFollowers
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};




exports.getAstroFollowers = async (req, res) => {
  await AstroFollowers.find().populate("userid")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneAstroFollowers = async (req, res) => {
  await AstroFollowers.findOne({ _id: req.params.id }).populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.edit_AstroFollowers = async (req, res) => {
  await AstroFollowers.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.dlt_AstroFollowers = async (req, res) => {
  await AstroFollowers.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.getone_followers = async (req, res) => {
  await AstroFollowers.findOne({ $and: [{ userid: req.params.userid }, { astroid: req.params.astroid }] })
    

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.unfollow_astrologer = async (req, res) => {
  const astroid = req.params.astroid;
  const userid = req.params.userid;

  try {
    const astrologer = await AstroFollowers.findOneAndUpdate(
      { astroid, userid: astroid, userid: userid },
      { $set: { status: false } },
      { new: true }
    );

    if (astrologer) {
      const deletedAstrologer = await AstroFollowers.findOneAndDelete({ astroid: astroid, userid: userid, status: false });
      return res.status(200).json({ message: "Unfollowed successfully." });
    } else {
      return res.status(404).json({ message: "Astrologer not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occurred.", error: error });
  }
};





// exports.unfollow_astrologer = async (req, res) => {
//   const astrologerId = req.params.id;

//   try {
//     const astrologer = await like.findOne({ _id: astrologerId });

//     if (astrologer.status === false) {
//       await like.deleteOne({ _id: astrologerId });
//       resp.successr(res, "Astrologer unfollowed and deleted successfully.");
//     } else {
//       astrologer.status = false;
//       await astrologer.save();
//       resp.successr(res, "Astrologer unfollowed successfully.");
//     }
//   } catch (error) {
//     resp.errorr(res, error);
//   }
// };
