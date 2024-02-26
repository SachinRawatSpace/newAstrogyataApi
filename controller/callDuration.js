const callDuration = require("../models/callDuration");
const ChatHistory = require("../models/callDuration");
const resp = require("../helpers/apiResponse");
const { findOne } = require("../models/addEvent");
const Astrologer = require("../models/astrologer");
const User = require("../models/users");
const cron = require("node-cron")
const AdminComision = require("../models/admin");

exports.addCallDuration = async (req, res) => {
  const { userId, astroId, status } = req.body;

  try {
    // Finding the astrologer
    const astro = await Astrologer.findOne({ _id: astroId });

    // Getting the call charge
    console.log("call charge", astro.callCharge);
    const getastrochrge = astro.callCharge;
    const astroCallCharge = astro.callCharge * 5;
    console.log("astroCallCharge", astroCallCharge);
    const user = await User.findOne({ _id: userId });
    const userAmount = user.amount;
    console.log("userAmount", userAmount);
    const onemincharge = astro.callCharge;
    const amountToDeduct = astroCallCharge;
    let waitTym = userAmount / getastrochrge;
    console.log("waitTym", waitTym);

    if (amountToDeduct <= userAmount) {
      const updatedAmount = userAmount - onemincharge;
      user.amount = updatedAmount;

      const newCallDuration = new callDuration({
        duration: 60, // One minute duration
        userId: userId,
        astroId: astroId,
        status: status,
      });

      await Promise.all([user.save(), newCallDuration.save()]);

      res.status(200).json({ message: "Call duration added successfully" });
    } else {
      res.status(400).json({ message: "Insufficient balance for the call" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.intetakeNotification = async (req, res) => {
  await intakeNotification
    .find()
    .populate("userId")
    .populate("chatIntekId")
    .populate("astroId")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


let cron_job
let duration = 0;
let totalDuration = 0;

// exports.deductBalance = async (req, res) => {
//   const { userId, astroId, type } = req.body;
//   const user = await User.findById(userId);
//   const astro = await Astrologer.findById(astroId);
//   console.log("Me call hua hu");
//   // if (!cron_job) {
//     const cron_job = cron.schedule("* * * * *", async () => {
//       duration++;
//       totalDuration++;
//       console.log("duration++", duration);
//       console.log("Total duration:", totalDuration);
//       console.log("cron is running");
//       const user = await User.findById(userId);
//       const astro = await Astrologer.findById(astroId);


//       const deductedBalance = user.amount - astro.callCharge;
//       await User.updateOne({ _id: userId }, { amount: deductedBalance });
//       if (user.amount < astro.callCharge) {
//         const resp = await Astrologer.updateOne(
//           { _id: astroId },
//           { callingStatus: "Available" }
//         );
//         console.log("resp", resp);
//         cron_job.stop();
//         return res.status(404).send("Your balance is not enough to chat");
//       } else if (user.amount <= astro.callCharge * 5) {


//         return res.status(203).send("Balance is low");
//       } else {
//         const user = await User.findById(userId);
//         const astro = await Astrologer.findById(astroId);
//         console.log("astro Charge", astro.callCharge);
//         console.log("Deducted Balance", deductedBalance);
//         console.log("USER", user.amount);

//         // Fetch the user again to get the updated user amount
//         const updatedUser = await User.findById(userId);

//         // Update the user's balance after deduction
//         await User.updateOne({ _id: userId }, { amount: deductedBalance });

//         const newChatHistory = new ChatHistory({
//           userId: userId,
//           astroId: astroId,
//           type: type,
//           userAmt: updatedUser.amount, // Use the updated user.amount after deduction
//           userDeductedAmt: deductedBalance,
//           totalDuration: totalDuration // Use the global totalDuration
//         });

//         const savedChatHistory = await newChatHistory.save();
//         console.log("savedChatHistory", savedChatHistory);
//         const getid = savedChatHistory._id;
//         const respss = await ChatHistory.updateOne(
//           { _id: getid },
//           { userAmt: updatedUser.amount } // Use the updated user.amount after deduction
//         );

//         const resp = await Astrologer.updateOne(
//           { _id: astroId },
//           { callingStatus: "Busy" }
//         );

//         console.log(resp);
//         return res.status(200).send("Balance Deducted successfully");
//       }
//     });
//   };

//}

// Declare a variable to store the cron job instance


// Declare a variable to store the cron job instance
// Declare a variable to store the cron job instance
let cron_jobs = {};

// Declare totalDuration and duration variables at the top level
// let totalDuration = 0;
// let duration = 0;

exports.deductBalance = async (req, res) => {
  const { userId, astroId, type } = req.body;
  const user = await User.findById(userId);
  const astro = await Astrologer.findById(astroId);
  let astrocharge = astro.callCharge

  let previousUserBalance = user.amount;
  console.log("previousUserBalance", previousUserBalance)


  // Check if a cron job already exists for this userId and astroId
  if (cron_jobs[`${userId}-${astroId}`]) {
    return res.status(400).send("Cron job already running for this user and astrologer.");
  }



  // Create the cron job with a unique key made of userId and astroId
  console.log("Me call hua hu");

  const cron_job = cron.schedule("* * * * *", async () => {
    duration++;
    totalDuration++;
    console.log("duration++", duration);
    console.log("Total duration:", totalDuration);
    // Calculate the deducted balance and update the user's amount if necessary
    const user = await User.findById(userId);
    const astro = await Astrologer.findById(astroId);
    const deductedBalance = user.amount - astro.callCharge;
    console.log("user.amount", user.amount)
    if (deductedBalance < 0) {
      // Stop the cron job when the balance is not enough to chat
      cron_job.stop();
      delete cron_jobs[`${userId}-${astroId}`];
      return res.status(404).send("Your balance is not enough to chat");
    } else if (deductedBalance <= astro.callCharge * 5) {
      // Stop the cron job when the balance is low
      cron_job.stop();
      delete cron_jobs[`${userId}-${astroId}`];
      return res.status(203).send("Balance is low");
    } else {

      // Update the user's balance after deduction

      const user = await User.findById(userId);
      const astro = await Astrologer.findById(astroId);


      const useramt =
        user.amount - parseInt(1 * astro.callCharge);
      console.log("useramt", useramt)


      const firsttymuseramt =
        user.amount - parseInt(1 * astro.callCharge);

      const getcom = await AdminComision.findOne({
        _id: "64a96b8deb11484339fb7d68"
      })
      console.log("getcom", getcom.admincomision)
      const getadmincommision = parseFloat((astro.callCharge - astro.callCharge * 100 / (100 + parseInt(getcom.admincomision))).toFixed(2));
      const adminCommission = 1 * getadmincommision
      console.log("getadmincommision", adminCommission)

      let totalDeductedAmount =
        user.amount - firsttymuseramt;


      console.log("totalDeductedAmount", totalDeductedAmount)

      console.log("ASTROLOGERCOMMISION", totalDeductedAmount - adminCommission)

      const astrocredit = totalDeductedAmount - adminCommission

      console.log("astro Charge", astro.callCharge);
      console.log("Deducted Balance", deductedBalance);
      console.log("USER", user.amount);
      // Fetch the user again to get the updated user amount
      const updatedUser = await User.findById(userId);
      // Update the user's balance after deduction
      await User.updateOne({ _id: userId }, { amount: deductedBalance });
      const newChatHistory = new ChatHistory({
        userId: userId,
        astroId: astroId,
        type: type,
        userAmt: firsttymuseramt, // Use the deductedBalance after deduction
        userdeductedAmt: astrocharge,
        totalDuration: totalDuration,// Use the global totalDuration
        adminCredited: getadmincommision,
        astroCredited: astrocredit,
        totalCredited: astrocharge
      });
      console.log("newChatHistory", newChatHistory)
      const savedChatHistory = await newChatHistory.save();
      console.log("savedChatHistory", savedChatHistory);
      const getid = savedChatHistory._id;
      console.log("getid", getid)

      const resp = await Astrologer.updateOne(
        { _id: req.body.astroId },
        { callingStatus: "Busy" }
      );

      console.log(resp);
      const updatparamters = await ChatHistory.findOneAndUpdate(
        { _id: getid },
        { userDeductedAmt: astro.callCharge }
      )
      //  console.log("updatparamters",updatparamters)
      return res.status(200).send("Balance Deducted successfully");
    }
  });

  // Store the cron job reference using the userId and astroId as the key
  cron_jobs[`${userId}-${astroId}`] = cron_job;
};


exports.changeToAvailable = async (req, res) => {
  const { userId, astroId } = req.body;
  const key = `${userId}-${astroId}`;
  const cron_job = cron_jobs[key];

  if (cron_job) {
    cron_job.stop();
    delete cron_jobs[key];
    //   return res.status(200).send("Status updated successfully");
    try {
      const updatedAstrologer = await Astrologer.findByIdAndUpdate(
        astroId,
        { callingStatus: "Available" },
        { new: true }
      );
      return res.status(200).send("Status updated successfully");

    } catch (error) {
      return res.status(500).send("Error updating astrologer status.");
    }

  } else {
    return res.status(400).send("No cron job is running for this user and astrologer.");
  }
};




exports.stop_cron = async (req, res) => {
  try {
    const lastDocument = await ChatHistory.findOne()
      .sort({ createdAt: -1 }) // Assuming `createdAt` is the field by which you want to sort
      .limit(1);
    console.log("lastDocument", lastDocument)
    const updatedChat = await ChatHistory.findOneAndUpdate(
      { _id: lastDocument._id },
      { $set: { vc_status: 0 } },
      { new: true }
    );
    //333333333333333
    // const lastChatHistory = await ChatHistory.find
    //   ({ $and: [{ userId: req.body.userId }, { astroId: req.body.astroId }] })
    //  // .sort({ createdAt: -1 })
    //   (
    //     { userId: req.body.userId, astroId: req.body.astroId },
    //     { $set: { vc_status: 0 } },
    //     { new: true }
    //   )
    //   //.sort({ createdAt: 1 })
    //   .exec();



    // Check if cron_job is defined and stop it
    if (cron_job) {
      cron_job.stop();
      cron_job = null; // Set cron_job to null after stopping to avoid reusing the old job
    }

    console.log("Status updated successfully");
    console.log("Last Chat History:", lastDocument);
    let astroid = lastDocument.astroId
    console.log("astroid", astroid)

    const updatedAstrologer = await Astrologer.findOneAndUpdate(
      { _id: astroid },
      { $set: { callingStatus: "Available" } },
      { new: true }
    );
    // console.log("Chat History with IDs:", chatHistoryWithIds);
    res.status(200).send("Status updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update status" });
  }
};
// exports.changeToAvailable = async (req, res) => {
//   try {
//     const updatechat = await ChatHistory.findOneAndUpdate(
//       { _id: req.body.id },
//       { $set: { vc_status: 0 } },
//       { new: true }
//     );

//     // Check if cron_job is defined and stop it
//     if (cron_job) {
//       cron_job.stop();
//       cron_job = null; // Set cron_job to null after stopping to avoid reusing the old job
//     }

//     console.log("Status updated successfully", updatechat);
//     res.status(200).send("Status updated successfully");
//     let astroid = updatechat.astroId
//     const updatedAstrologer = await Astrologer.findOneAndUpdate(
//       { _id: astroid },
//       { $set: { callingStatus: "Available" } },
//       { new: true }
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update status" });
//   }
// };

exports.userChathistory = async (req, res) => {
  await ChatHistory.find({ userId: req.params.id })
    .sort({ createdAt: 1 }).populate("userId").populate("astroId")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.astroChathistory = async (req, res) => {
  await ChatHistory.find({ astroid: req.params.id }).populate("userId").populate("astroId")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.adminVedioChathistory = async (req, res) => {
  await ChatHistory.find().populate("userId").populate("astroId")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dltallChat = async (req, res) => {
  await callDuration.deleteMany()
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.userVideohistory = async (req, res) => {
  await ChatHistory.find({ $and:[{userId:req.params.id},{type:"Video"}]})
    .sort({ createdAt: -1 }).populate("userId").populate("astroId")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};