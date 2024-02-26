const Askqustion = require("../models/ASK_qus");
const resp = require("../helpers/apiResponse");
const Product = require("../models/product");
const Order = require("../models/order");
const Astroproduct = require("../models/astroproduct");


// exports.user_ask_qus = async (req, res) => {
//   const { astroid, userid, question, answer, bundleOffer } = req.body;

//   const getdata = await Order.find({
//     $and: [
//       { status: "COMPLETED" }, { astroid: req.body.astroid },
//       { userid: userid },

//     ],
//   })

//     .populate({
//       path: "product",
//       populate: {
//         path: "product",
//       },
//     });

//   console.log("getdatassss", getdata);
//   let totalQsCount = 0;
//   for (const order of getdata) {
//     totalQsCount += order.product.qsCount;
//   }
//   const questions = await Askqustion.find({ userid: userid });
//   console.log("totalQsCount", totalQsCount - questions.length)
//   let remainqus = totalQsCount - questions.length
//   const getete = await Askqustion.findOneAndUpdate(
//     { astroid: astroid, userid: userid },
//     { $set: { remaining_qus: totalQsCount - questions.length } },
//     { new: true }
//   );
//   console.log("getete", getete)
//   console.log("remainqus", remainqus)
//   if (questions.length > totalQsCount - 1) {
//     console.log("your question limit is over");
//     res.status(403).json({
//       msg: "Your question limit is over",
//       limit: totalQsCount
//     });

//     const lastQuestion = questions[questions.length - 1];

//     await Askqustion.findOneAndUpdate(
//       { _id: lastQuestion._id },
//       { $set: { view_button: false, remaining_qus: remainqus } },
//       { new: true }
//     );
//   } else {
//     const newAskqustion = new Askqustion({
//       astroid: astroid,
//       userid: userid,
//       question: question,
//       answer: answer,
//       bundleOffer: bundleOffer,
//       remaining_qus: remainqus - 1,
//       totalQus: totalQsCount
//     });

//     newAskqustion
//       .save()
//       .then((data) => resp.successr(res, data))
//       .catch((error) => resp.errorr(res, error));
//   }
// };
exports.user_ask_qus = async (req, res) => {
  const { astroid, userid, question, answer, bundleOffer } = req.body;

  try {
    const getdata = await Order.find({
      $and: [
        { status: "COMPLETED" },
        { astroid: req.body.astroid },
        { userid: userid },
      ],
    })
      .populate({
        path: "products",
        populate: {
          path: "product",
        },
      });
    console.log("getdata", getdata)
    if (getdata.length === 0) {
      // No data found for the given criteria
      return res.status(404).json({ msg: "No data found for the given criteria" });
    }

    console.log("getdatassss", getdata);
    let totalQsCount = 0;
    for (const order of getdata) {
      totalQsCount += order.products.qsCount;
    }
    const questions = await Askqustion.find({ userid: userid });
    console.log("totalQsCount", totalQsCount - questions.length);
    let remainqus = totalQsCount - questions.length;
    const getete = await Askqustion.findOneAndUpdate(
      { astroid: astroid, userid: userid },
      { $set: { remaining_qus: totalQsCount - questions.length } },
      { new: true }
    );
    console.log("getete", getete);
    console.log("remainqus", remainqus);
    if (questions.length > totalQsCount - 1) {
      console.log("your question limit is over");
      res.status(403).json({
        msg: "Your question limit is over",
        limit: totalQsCount,
      });

      const lastQuestion = questions[questions.length - 1];

      await Askqustion.findOneAndUpdate(
        { _id: lastQuestion._id },
        { $set: { view_button: false, remaining_qus: remainqus } },
        { new: true }
      );
    } else {
      const newAskqustion = new Askqustion({
        astroid: astroid,
        userid: userid,
        question: question,
        answer: answer,
        bundleOffer: bundleOffer,
        remaining_qus: remainqus - 1,
        totalQus: totalQsCount,
      });

      newAskqustion
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  } catch (error) {
    if (error.name === 'StrictPopulateError') {
      // Handle populate error and send a user-friendly response
      return res.status(400).json({ msg: "Order Not Found" });
    }
    console.error("Error in user_ask_qus:", error);
    resp.errorr(res, error);
  }
};


exports.user_ask_qus_list = async (req, res) => {
  await Askqustion.find({ userid: req.params.id }).populate({
    path: "bundleOffer",
    populate: {
      path: "product",
    },
  })
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.list_ask_qus = async (req, res) => {
  await Askqustion.find({ $and: [{ astroid: req.params.astroid }, { userid: req.params.userid }] }).populate("astroid").populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.astro_ques_list = async (req, res) => {
  await Askqustion.find({ astroid: req.params.id }).populate("astroid").populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getone_ask_qus = async (req, res) => {
  await Askqustion.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


// userId: req.params.userId,
// plan_Id: req.params.id,

exports.reply = async (req, res) => {
  const getlimit = await Askqustion.find({ _id: req.params.id }).populate("bundleOffer")
  console.log("getlimit", getlimit)
  let limit = getlimit.bundleOffer
  console.log("limit", limit)
  await Askqustion.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.dlt_ask_qus = async (req, res) => {
  await Askqustion.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


