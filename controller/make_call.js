const make_call = require("../models/make_call.js");
const VideoModel = require("../models/videomodel.js");
const AdminComision = require("../models/admin");
const Astrologer = require("../models/astrologer");
const resp = require("../helpers/apiResponse");
const User = require("../models/users");

// const astrodetail = Astrologer.findOne({ astroid: req.body.id })
// console.log("astrodetail", astrodetail)
// const getchrge = astrodetail.callCharge
// const userdetail = User.findOne({ userid: req.body.id })
// console.log("userdetail", userdetail)
// const useramt = userdetail.amount
// const astpmc = useramt / getchrge
// const isValidMobileNumber = (mobileNumber) => {
//   // Regular expression to validate Indian mobile numbers (10 digits, starting with a digit between 6 to 9)
//   const indianMobileNumberPattern = /^(91)?[6-9]\d{9}$/;
//   return indianMobileNumberPattern.test(mobileNumber);
// };
let cron_job = null;
let callDetails = { sid: "", userId: "" };

exports.make_call = async (req, res) => {
  if (cron_job) {
    console.log("running")
    return res.status(409).json({ message: "Cron job is already running." });
  }
  // Check if the "From" mobile number is valid before proceeding

  const crntym = new Date();
  callDetails.astroid = req.body?.astroid;
  callDetails.userId = req.body.userid;
  let user = await User.find({ _id: callDetails.userId });
  let astrologer = await Astrologer.find({ _id: callDetails.astroid });
  user = user[0];
  astrologer = astrologer[0];
  console.log("astrologer", astrologer)
  console.log("astrologer", astrologer.callCharge)
  callDetails.previousUserBalance = user.amount;
  // Check minimum balance of user
  // if (user.amount > astrologer.min_amount) {
  const axios = require("axios");
  const CircularJSON = require("circular-json");
  const key = "d909e2e0120d0bcbd2ef795dd19eb2e97c2f8d78d8ebb6d4";
  const sid = "sveltosetechnologies2";
  const token = "856371fe6a97e8be8fed6ab14c95b4832f82d1d3116cb17e";
  const from = req.body.from;
  const to = req.body.to;
  const formUrlEncoded = (x) =>
    Object.keys(x).reduce(
      (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
      ""
    );
  const url = `https://${key}:${token}@api.exotel.in/v1/Accounts/${sid}/Calls/connect.json`;
  try {
    const response = await axios.post(
      url,
      formUrlEncoded({
        From: req.body.From, //USER
        To: req.body.To, //ASTRO
        userid: req.body.userid,
        astroid: req.body.astroid.trim(), // Remove extra whitespace using trim()
        walletId: req.body.walletId,
        CallerId: "080-473-59942",
        CallerType: "promo",
        TimeLimit: parseInt(user.amount / astrologer.callCharge) * 60,
      }),
      {
        withCredentials: true,
        headers: {
          Accept: "application/x-www-form-urlencoded",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const str = CircularJSON.stringify(response.data);
    const getdata = JSON.parse(str);
    console.log(getdata);
    callDetails.sid = getdata.Call?.Sid;
    let options = {
      From: req.body.From, //USER\
      To: req.body.To, //ASTRO
      userid: req.body.userid,
      astroid: req.body?.astroid,
      Sid: getdata.Call?.Sid,
      ParentCallSid: getdata.Call?.ParentCallSid,
      DateCreated: getdata.Call?.DateCreated,
      DateUpdated: getdata.Call?.DateUpdated,
      AccountSid: getdata.Call?.AccountSid,
      PhoneNumberSid: getdata.Call?.PhoneNumberSid,
      Status: getdata.Call?.Status,
      StartTime: getdata.Call?.StartTime,
      EndTime: getdata.Call?.EndTime,
      Duration: getdata.Call?.Duration,
      Price: getdata.Call?.Price,
      Direction: getdata.Call?.Direction,
      AnsweredBy: getdata.Call?.AnsweredBy,
      ForwardedFrom: getdata.Call?.ForwardedFrom,
      CallerName: getdata.Call?.CallerName,
      Uri: getdata.Call?.Uri,
      RecordingUrl: getdata.Call?.RecordingUrl,
    };
    make_call.create(options, async function (err, response) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        console.log("RESULT", response);
        callDetails.callId = response._id;
        callDetails.callduration = response.Duration
        options.maxTime = parseInt(user.amount / astrologer.callCharge);
        const astroStatus = await Astrologer.updateOne(
          { _id: callDetails.astroid },
          { callingStatus: "Busy" }
        );
        await Astrologer.updateOne(
          { _id: callDetails.astroId },
          { $pull: { waitQueue: callDetails.userId } }
        );
        console.log(
          "User balance is ",
          user.amount,
          " and astrologer charge is ",
          astrologer.callCharge
        );
        res.status(200).json({ order: options });
        setTimeout(() => {
          checkCallStatus();
      },40000)
        //checkCallStatus();
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
};
const axios = require("axios");
const cron = require("node-cron");
//const database = require('./database'); // Import your database module or ORM


const request = require('request');

exports.callStatus = async (req, res) => {
  console.log("I am called");

  const key = "d909e2e0120d0bcbd2ef795dd19eb2e97c2f8d78d8ebb6d4";
  const token = "856371fe6a97e8be8fed6ab14c95b4832f82d1d3116cb17e";
  const sid = "sveltosetechnologies2";
  const url = `https://d909e2e0120d0bcbd2ef795dd19eb2e97c2f8d78d8ebb6d4:856371fe6a97e8be8fed6ab14c95b4832f82d1d3116cb17e@api.exotel.in/v1/Accounts/sveltosetechnologies2/Calls/${req.params.sid}.json`;
  console.log("url", url);

  try {
    const response = await axios.get(url);
    const responseData = response.data; // Axios already parses the response as JSON
    console.log(responseData); // Print the response data to the console
  } catch (error) {
    console.log("Error occurred:", error.message);
  }
}
//let duration = 0;
let totalDuration = 0;
const checkCallStatus = async () => {

  const cron_job = cron.schedule("* * * * *", async () => {
    const key = "d909e2e0120d0bcbd2ef795dd19eb2e97c2f8d78d8ebb6d4";
    const sid = "sveltosetechnologies2";
    const token = "856371fe6a97e8be8fed6ab14c95b4832f82d1d3116cb17e";
    // const Sid = req.params.sid;
    const url = `https://${key}:${token}@api.exotel.in/v1/Accounts/${sid}/Calls/${callDetails.sid}.json`;
    try {
      const response = await axios.get(url);
      const { status, data } = response;
      //  let duration = 0;
      if (status === 200) {
        const callStatus = data.Call.Status;
        //    const calldur = data.Call.Duration;
        //  console.log("callduration", calldur)
        //   let ttlminute = calldur / 60
        //       console.log("ttlminute", ttlminute)
        let user = await User.find({ _id: callDetails.userId });
        let astrologer = await Astrologer.find({ _id: callDetails.astroid });
        user = user[0];
        astrologer = astrologer[0];
        // if (callStatus === "pending") {
        //   console.log("Call is still pending");
        //   // Handle pending status logic
        // }
        console.log(callStatus);

        // if (callStatus === "ringing ") {
        //   console.log("Call has been ringing ");
        //   // Handle rejected status logic
        //   let updateststt = await make_call.updateOne(
        //     { _id: callDetails.callId },
        //     { Status: "ringing " }
        //   );
        //   response = await Astrologer.updateOne(
        //     { _id: callDetails.astroid },
        //     { callingStatus: "Available", waiting_tym: 0 }
        //   );

        //   console.log(updateststt);
        //   cron_job.stop();

        // }
        if (callStatus === "completed") {
          console.log("Call has been completed");
          // Handle completed status logic
          let totalDeductedAmount =
            callDetails.previousUserBalance - user.amount;
          const useramt =
            user.amount - parseInt(totalDuration * astrologer.callCharge);
          console.log("totalDeductedAmount", totalDeductedAmount)
          const getcom = await AdminComision.findOne({
            _id: "64a96b8deb11484339fb7d68"
          })
          console.log("getcom", getcom.admincomision)
          const getadmincommision = (astrologer.callCharge) - astrologer.callCharge * 100 / (100 + parseInt(getcom.admincomision))
          const adminCommission = totalDuration * getadmincommision
          console.log("getadmincommision", adminCommission)
          if (data.Call?.Duration) {
            let updatestst = await make_call.updateOne(
              { _id: callDetails.callId },
              { Status: "completed", userdeductedAmt: totalDeductedAmount, userAmt: useramt, astroCredited: totalDeductedAmount - adminCommission, adminCredited: adminCommission, totalCredited: totalDeductedAmount }
            );
            let admincom = await AdminComision.updateOne(
              { _id: "64a96b8deb11484339fb7d68" },
              {
                $push: { totalEarning: { amount: adminCommission } },
              }
            );
            console.log(totalDeductedAmount);
            console.log("ASTROLOGERCOMMISION", totalDeductedAmount - adminCommission)
            let astroCommision = totalDeductedAmount - adminCommission
            let ttlastroCommision = astroCommision * totalDuration
            console.log("ttlastroCommision", ttlastroCommision)
            updatestst = await Astrologer.updateOne(
              { _id: callDetails.astroid },
              {
                callingStatus: "Available",
                waiting_tym: 0,
                $push: { totalEarning: { amount: totalDeductedAmount - adminCommission } },
              }
            );
            // console.log(updatestst);
            cron_job.stop();
          }
        }
        else if (callStatus === "no-answer") {
          console.log("Call has been rejected");
          // Handle rejected status logic
          let updatestst = await make_call.updateOne(
            { _id: callDetails.callId },
            { Status: "rejected" }
          );
          response = await Astrologer.updateOne(
            { _id: callDetails.astroid },
            { callingStatus: "Available", waiting_tym: 0 }
          );
          console.log(updatestst);
          cron_job.stop();
        } else if (callStatus === "failed") {
          console.log("Call has been failed");
          // Handle rejected status logic
          let updatestst = await make_call.updateOne(
            { _id: callDetails.callId },
            { Status: "failed" }
          );
          response = await Astrologer.updateOne(
            { _id: callDetails.astroid },
            { callingStatus: "Available", waiting_tym: 0 }
          );
          console.log(updatestst);
          cron_job.stop();
        }
        else if (callStatus === "in-progress") {

          let duration = 0;
          duration++;
          totalDuration++;
          console.log("duration++", duration);
          console.log("Total duration:", totalDuration);
          const amountDeduct =
            user.amount - parseInt(duration * astrologer.callCharge);
          console.log(
            "Current amount is ",
            user.amount,
            "Amount after deduction will be ",
            amountDeduct,
            "total call duration is ",
            duration
          );

          // let updatestst = await make_call.updateOne(
          //   { _id: callDetails.callId },
          //   { duration:duration++ }
          // );
          let response = await User.updateOne(
            { _id: callDetails.userId },
            { amount: amountDeduct }
          );
          console.log(response);
          console.log(
            "Call ongoing Balance left is ",
            amountDeduct,
            "max time is ",
            parseInt(amountDeduct / astrologer.callCharge)
          );
          updatetym = await Astrologer.updateOne(
            { _id: callDetails.astroid },
            { waiting_tym: parseInt(amountDeduct / astrologer.callCharge) }
          );

          let updatestst = await make_call.updateOne(
            { _id: callDetails.callId },
            { Duration: totalDuration }
          );
        } else {
          response = await Astrologer.updateOne(
            { _id: callDetails.astroid },
            { callingStatus: "Available", waiting_tym: 0 }
          );
          console.log(response);
          cron_job.stop();
          cron_job = null;
          console.log("Unknown call status:", callStatus);
        }
      } else {
        console.log("API request failed with status:", status);
      }
    } catch (error) {
      console.log("Error occurred:", error.message);
    }
  });
};


exports.on_make_another_call = async (req, res) => {
  const { userId, callType } = req.body;
  let { id } = req.params;

  try {
    const senddata = await Astrologer.updateOne(
      { _id: id },
      {
        $push: {
          waitQueue: {
            userId,
            callType,
            createdAt: new Date() // Add the createdAt parameter with the current date and time
          }
        }
      }
    );
    console.log("Data updated successfully");
    res.status(200).json({ message: "Added in waitQueue list", data: req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update data" });
  }
};




exports.getEarnings = async (req, res) => {
  const { id } = req.params;
  const astro = await Astrologer.findById(id);
  const report = { today: 0, week: 0, month: 0, total: 0 };

  astro.totalEarning.map((e) => {
    if (e.date.toString().slice(0, 16) == new Date().toString().slice(0, 16)) {
      report.today += e.amount;
    }
    if (
      e.date.toString().slice(0, 16) >=
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toString().slice(0, 16)
    ) {
      report.week += e.amount;
    }
    if (
      e.date.toString().slice(0, 16) >=
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toString().slice(0, 16)
    ) {
      report.month += e.amount;
    }
    report.total += e.amount;
  })

  report.today = parseFloat(report.today.toFixed(2));
  report.week = parseFloat(report.week.toFixed(2));
  report.month = parseFloat(report.month.toFixed(2));
  report.total = parseFloat(report.total.toFixed(2));
  // console.log(report)
  res.status(200).json({
    status: true,
    message: "success",
    data: report
  })

};

exports.call_Status = async (req, res) => {
  var request = require('request');

  const key = "d909e2e0120d0bcbd2ef795dd19eb2e97c2f8d78d8ebb6d4";
  const sid = "sveltosetechnologies2";
  const token = "856371fe6a97e8be8fed6ab14c95b4832f82d1d3116cb17e";
  // const Sid = req.params.sid;

  const url = `https://${key}:${token}@api.exotel.in/v1/Accounts/${sid}/Calls/${callDetails.sid}.json`;

  // var options = {
  //     url: 'https://${key}:<your_api_token><subdomain>/v1/Accounts/<your_sid>/Calls/b6cfaf5f5cef3ca0fc937749ef960e25'
  // };

  console.log("url", url)


  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }

  request(options, callback);
};

const agora = require("agora-access-token");
const { ConnectionPoolClearedEvent } = require("mongodb");
const { CloudWatchLogs } = require("aws-sdk");

exports.astroVideoCall = async (req, res) => {
  const { RtcTokenBuilder, RtcRole } = agora;

  const getchnlname = await Astrologer.findOne({ _id: req.body.astroAccount });
  //console.log("astro", getchnlname)
  const channelName = getchnlname.channelName;
  const generateRtcToken = () => {
    // Rtc Examples
    const appId = "7d1f07c76f9d46be86bc46a791884023";
    const appCertificate = "14cdb5fc04344d0da3270c35d8d75431";
    // const channelName = 'anujesh';
    const channelName = getchnlname.channelName;

    const uid = 0;
    // const userAccount = "a76414c384874a389be2aeebec534b2a";
    const { astroAccount } = req.body;

    //const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 36000;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      astroAccount,
      privilegeExpiredTs
    );

    res.status(200).json({
      astroAccount: tokenA,
      channelName: channelName,
      astroId: astroAccount,
    });
  };
  generateRtcToken();
};

exports.userVideoCall = async (req, res) => {
  const { RtcTokenBuilder, RtcRole } = agora;
  const { astroAccount, userAccount } = req.body;

  const getuser = await User.findOne({ _id: req.body.userAccount });
  const getamt = getuser.amount;
  // console.log("amt", getamt)

  const getchnlname = await Astrologer.findOne({ _id: req.body.astroAccount });
  const callcrg = getchnlname.callCharge;
  const tokend = (getamt / callcrg) * 60;
  // console.log("tokend", tokend)
  const channelName = getchnlname.channelName;
  const generateRtcToken = () => {
    // Rtc Examples
    const appId = "7d1f07c76f9d46be86bc46a791884023";
    const appCertificate = "14cdb5fc04344d0da3270c35d8d75431";
    // const channelName = 'anujesh';
    const channelName = getchnlname.channelName;

    const uid = 0;
    // const userAccount = "a76414c384874a389be2aeebec534b2a";

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + tokend;
    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      privilegeExpiredTs
    );

    res.status(200).json({
      userAccount: tokenA,
      channelName: channelName,
    });
  };
  generateRtcToken();
};

exports.Calling = async (req, res) => {
  var request = require("request");

  var dataString = "From=7489651191&To=8103988072&CallerId=011-411-68588";

  var options = {
    url: "https://90c1bddcdace6f704819ebc54d740ebbbdf37f2ad30a4e8f:04d432d9144e8521e1e31f8297e3d199d3c73b8676c49df8@api.exotel.in/v1/Accounts/astrologically3 /Calls/connect",
    method: "POST",
    body: dataString,
  };
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }
  console.log("options", options);
  request(options, callback);
};

exports.astroCallHistory = async (req, res) => {
  await make_call
    .find({ $and: [{ astroid: req.params.id }, { Status: "completed" }] })

    .populate("userid")
    .populate("astroid")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.userCallHistory = async (req, res) => {
  await make_call
    .find({ $and: [{ userid: req.params.id }, { Status: "completed" }] })
    .populate("userid")
    .populate("astroid")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.astroCompleteCall = async (req, res) => {
  await make_call
    .find({ astroid: req.params.id, Status: "completed" })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.dlCallHistory = async (req, res) => {
  await make_call
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.adminCallHistory = async (req, res) => {
  await make_call
    .find({ Status: "completed" }).populate("userid").populate("astroid")
    .populate("userid")
    .populate("astroid")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
