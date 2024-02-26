const ChatWallet = require("../models/chatWallet");
const resp = require("../helpers/apiResponse");
const Astrologer = require("../models/astrologer");
const Minutecharge = require("../models/min_charges");
const User = require("../models/users");
const moment = require('moment');
var cron = require('node-cron');
const WalletT = require("../models/walletTransaction");



exports.addCallWallet = async (req, res) => {
  const { userid, astroid, recharge_planId, beforeAmt, deductedAmt, finalAmt } = req.body;


  const getoneastro = await Astrologer.findOne({ _id: req.body.astroid })
  console.log("ASTRO", getoneastro)
  if (getoneastro) {
    const getcharge = getoneastro.callCharge
    console.log("CALLCHARGE", getcharge)

    //  const getplanchrge = await Minutecharge.findOne({_id:req.body.recharge_planId})
    //  console.log("MIN PLAN",getplanchrge)
    //  if(getplanchrge){
    //  const getplan = getplanchrge.minute
    //  console.log("getplan",getplan)
    const minute = 5


    const getuserdetail = await User.findOne({ _id: req.body.userid })
    //console.log("GETUSER",getuserdetail)
    if (getuserdetail) {
      let totalamt = getcharge * minute
      //  console.log("TOTAL AMT WAS DEDUCTED", totalamt)
      const getwalletamt = getuserdetail.amount
      //  console.log("WALLET AMT", getwalletamt)
      let newamt = 0
      if (getwalletamt > totalamt) {
        console.log("success")
        const chatWalletData = {
          userid: req.body.userid,
          astroid: req.body.astroid,

          type: req.body.type
        };

        const chatWallet = new ChatWallet(chatWalletData);
        await chatWallet.save();



        res.status(200).json({
          status: true,
          msg: "success",
          _id: chatWallet.id
          //     type: "Chat"
        })

      } else {
        console.log("INSUFFICIENT BALANCE")
        res.status(201).json({
          status: false,
          msg: "Insufficient belence"
        })
      }

    } else {
      // console.log("ERROR")
      res.status(400).json({
        status: false,
        msg: "Something Went Wrong"
      })
    }
  } else {
    // console.log("error")
    res.status(400).json({
      status: false,
      msg: "Something Went Wrong"
    })
  }

}


// exports.addCallWallet = async (req, res) => {
//     const {userid,astroid,recharge_planId,beforeAmt,deductedAmt,finalAmt} = req.body;


// const getoneastro = await Astrologer.findOne({_id:req.body.astroid})
// //console.log("ASTRO",getoneastro)
// if(getoneastro){
// const getcharge = getoneastro.callCharge
// console.log("CALLCHARGE",getcharge)

// //  const getplanchrge = await Minutecharge.findOne({_id:req.body.recharge_planId})
// //  console.log("MIN PLAN",getplanchrge)
// //  if(getplanchrge){
// //  const getplan = getplanchrge.minute
// //  console.log("getplan",getplan)
// const minute = 5


//  const getuserdetail = await User.findOne({_id:req.body.userid})
//  //console.log("GETUSER",getuserdetail)
//  if(getuserdetail){
//     let totalamt = getcharge*minute
//     console.log("TOTAL AMT WAS DEDUCTED",totalamt)
//  const getwalletamt = getuserdetail.amount
//  console.log("WALLET AMT",getwalletamt)
//  let  newamt=0
//  if (getwalletamt>totalamt){
// console.log("success")

// // newamt =getwalletamt - totalamt
// // console.log("camt",getwalletamt)
// // console.log("new",newamt)

// // const newChatWallet = new ChatWallet({
// //   userid:userid,
// //   astroid:astroid,
// //   recharge_planId:recharge_planId,
// //   type:"Voice Call",
// //   tran_Type:"Debited",
// //   conversationId:"#"+ Date.now(),
// //   beforeAmt:getwalletamt,
// //             deductedAmt:totalamt,
// //             finalAmt:newamt

// // })
// // const newWalletT = new WalletT({
// // userid:userid,
// //   astroid:astroid,
// //   recharge_planId:recharge_planId,
// //   type:"Voice Call",
// //   tran_Type:"Debited",
// //   conversationId:"#"+ Date.now(),
// //   beforeAmt:getwalletamt,
// //             deductedAmt:totalamt,
// //             finalAmt:newamt
// // })
// // newChatWallet.save()
// //         .then(async(data) => {
// //           const createnewtable = await WalletT.create(newWalletT);
// //           console.log("MMMMMM",createnewtable)
// //           res.status(200).json({
// //             status: true,
// //             msg: "success",
// //             data: data,
// //             beforeAmt:getwalletamt,
// //             deductedAmt:totalamt,
// //             finalAmt:newamt

// //             // callCharge:getoneastro.callCharge,
// //             // minute:
// //           });
// //         }) 
// //         .catch((error) => {
// //           res.status(400).json({
// //             status: false,
// //             msg: "error",
// //             error: error,
// //           });
// //         });
// //         const finduserAndupdate = await User.findOneAndUpdate(

// //             { _id: req.body.userid },

// //             { $set: {amount:newamt,deductedAmt:totalamt } },

// //           //     { amount: currntamt },

// //           // { $set: {status:"success"} },
// //           { new: true },
// //           )
// //           if(finduserAndupdate){
// // console.log("UPDATE USER AMOUNT",finduserAndupdate)

// //           }
//           // const tableUpdate = await ChatWallet.findOneAndUpdate(

//           //   { userid: req.body.userid },

//           //   { $set: {beforeAmt:getwalletamt,deductedAmt:totalamt, finalAmt:newamt} },
//           // { new: true },
//           // )
//           // if(tableUpdate){
//           //   console.log("UPDATE",tableUpdate)

//           //             }

//           //             const updateSuccess = await WalletT.findOneAndUpdate(

//           //               { userid: req.body.userid },

//           //               { $set: {beforeAmt:getwalletamt,deductedAmt:totalamt, finalAmt:newamt} },
//           //             { new: true },
//           //             )
//           //             if(updateSuccess){
//           //               console.log("UPDATE",updateSuccess)

//           //                         }
//           res.status(200).json({
//             status:true,
//             msg :"success",
//             type:"Voice Call"
//           })

//  }else{
//     console.log("INSUFFICIENT BALANCE")
//     res.status(201).json({
//         status:false,
//         msg:"Insufficient belence"
//     })
//  }

//  }else{
//     console.log("ERROR")
//     res.status(400).json({
//         status:false,
//         msg :"Something Went Wrong"
//     })
//  }
//  }else{
// console.log("error")
// res.status(400).json({
//     status:false,
//     msg :"Something Went Wrong"
// })
//  }

// }


exports.addVideoCallWallet = async (req, res) => {
  const { userid, astroid } = req.body;



  const getoneastro = await Astrologer.findOne({ _id: req.body.astroid })
  //console.log("ASTRO",getoneastro)
  if (getoneastro) {
    const getcharge = getoneastro.callCharge
    console.log("CALLCHARGE", getcharge)

    const minute = 5


    const getuserdetail = await User.findOne({ _id: req.body.userid })
    //console.log("GETUSER",getuserdetail)
    if (getuserdetail) {
      let totalamt = getcharge * minute
      // console.log("TOTAL AMT WAS DEDUCTED", totalamt)
      const getwalletamt = getuserdetail.amount
      console.log("WALLET AMT", getwalletamt)
      let newamt = 0
      if (getwalletamt > totalamt) {
        console.log("success")
        res.status(200).json({
          status: true,
          msg: "success"
        })


        const newChatWallet = new ChatWallet({
          userid: userid,
          astroid: astroid,
          type: "Video Call",
          tran_Type: "Debited",
          conversationId: "#" + Date.now(),


        })
        const newWalletT = new WalletT({
          userid: userid,
          astroid: astroid,
          recharge_planId: recharge_planId,
          type: "Video Call",
          //   tran_Type: "Debited",
          conversationId: "#" + Date.now(),
          // beforeAmt: getwalletamt,
          // deductedAmt: totalamt,
          // finalAmt: newamt
        })
        newChatWallet.save()

          .then(async (data) => {
            const createnewtable = await WalletT.create(newWalletT);
            console.log("MMMMMM", createnewtable)
            res.status(200).json({
              status: true,
              msg: "success",
              data: data,
              // callCharge:getoneastro.callCharge,
              // minute:
            });
          })
          .catch((error) => {
            res.status(400).json({
              status: false,
              msg: "error",
              error: error,
            });
          });
        // const finduserAndupdate = await User.findOneAndUpdate(

        //   { _id: req.body.userid },

        //   { $set: { amount: newamt, deductedAmt: totalamt } },

        //   //     { amount: currntamt },

        //   // { $set: {status:"success"} },
        //   { new: true },
        // )
        // if (finduserAndupdate) {
        //   console.log("UPDATE USER AMOUNT", finduserAndupdate)

        // }



      } else {
        console.log("INSUFFICIENT BALANCE")
        res.status(201).json({
          status: false,
          msg: "Insufficient Balance"
        })
      }

    } else {
      console.log("ERROR")
      res.status(400).json({
        status: false,
        msg: "Something Went Wrong"
      })
    }
  } else {
    console.log("error")
    res.status(400).json({
      status: false,
      msg: "Something Went Wrong"
    })
  }

}

exports.ChatWaiting = async (req, res) => {
  const getone = await ChatWallet.findOne({ _id: req.params.id })
    //.populate("astroid")


    //console.log("strng",getone)
    //  if(getone){
    //   const astropro = getone.astro_product
    //   console.log("pp",astropro)
    //   const price  =astropro.price
    //     console.log(price)
    //     let gstotal =0

    //     gstotal = price *18/100
    //     console.log("gstotal",gstotal)
    //     total_amt =price + gstotal


    //     res.status(200).json({
    //       status: true,
    //       msg: "success",
    //       data: getone,
    //     //  gsttotal: gsttotal, 
    //     total_amt :total_amt    
    //     });

    //  }else{
    //   res.status(400).json({
    //     status: false,
    //     msg: "error",
    //     error: "error",
    //   });


    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}


exports.cartbycustomer = async (req, res) => {
  //await Cart.remove()
  const findone = await Cart.find({ userid: req.userId })
  // .populate("customer")
  if (findone) {
    const findall = await Product.find({ product: req.params.id })
    //console.log(findall)
    const value = findall.value
    // console.log(findall)
    if (findall) {
      const getgst = await Gstrate.findOne({ gstrate: findall.gstrate });
      let value = getgst.value
      // console.log(getgst)
      // console.log(value)

      let sum = 0;
      //const value = 0
      for (let i = 0; i < findone.length; i++) {
        let element_price = findone[i].product_price;
        let element_qty = findone[i].product_qty;

        //  let element_gst = findone[i].gsttotal;
        sum = (element_price * element_qty);
        // let sum = 0;
        // sum =  (element_price * element_qty);
        //  gsttotal = value +(element_price*element_qty)
        //   console.log(gsttotal)
      }
      res.status(200).json({
        status: true,
        msg: "success",
        data: findone,
        //  gsttotal: gsttotal, 
        //  ttl :gsttotal    
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  }
}
exports.getOne_Conversation_Wallet = async (req, res) => {
  await ChatWallet.find({ userid: req.params.id }).populate("userid").populate("astroid").populate("recharge_planId")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.dltNotificattion = async (req, res) => {
  await ChatWallet.deleteOne({_id:req.params.id})
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.acceptNotificationByAstro = async (req, res) => {
  const getdata = await ChatWallet.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { status: req.body.status } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}
exports.acceptChat = async (req, res) => {
  const getdata = await ChatWallet.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { status: req.body.status } },
    { new: true }
  )
  let astroid = getdata.astroid
  // console.log("astroid",astroid)
  let planid = getdata.recharge_planId
  // console.log("astroid",astroid)
  let userid = getdata.userid

  if (getdata.status == "Completed") {
    // console.log("Completed")
    const getoneastro = await Astrologer.findOne({ _id: astroid })

    // console.log("ASTRO", getoneastro)
    if (getoneastro) {
      const getcharge = getoneastro.callCharge
      // console.log("CALLCHARGE", getcharge)

      const getplanchrge = await Minutecharge.findOne({ _id: planid })
      // console.log("MIN PLAN", getplanchrge)
      if (getplanchrge) {
        const getplan = getplanchrge.minute
        //  console.log("getplan", getplan)

        const getuserdetail = await User.findOne({ _id: userid })
        //console.log("GETUSER",getuserdetail)
        if (getuserdetail) {
          let totalamt = getcharge * getplan
          //  console.log("TOTAL AMT WAS DEDUCTED", totalamt)
          const getwalletamt = getuserdetail.amount
          // console.log("WALLET AMT", getwalletamt)
          let newamt = 0
          if (getwalletamt > totalamt) {
            //  console.log("success")

            newamt = getwalletamt - totalamt
            // console.log("Before", getwalletamt)
            //console.log("new", newamt)

            const newWalletT = new WalletT({
              userid: userid,
              astroid: astroid,
              recharge_planId: planid,
              type: "Chat",
              tran_Type: "Debited",
              conversationId: "#" + Date.now(),
              beforeAmt: getwalletamt,
              deductedAmt: totalamt,
              finalAmt: newamt,
              status: "Completed"
            })
            newWalletT.save()
              .then(async (data) => {
                const createnewtable = await WalletT.create(newWalletT);
                //   console.log("MMMMMM",createnewtable)
                res.status(200).json({
                  status: true,
                  msg: "success",
                  data: data,
                  beforeAmt: getwalletamt,
                  deductedAmt: totalamt,
                  finalAmt: newamt

                  // callCharge:getoneastro.callCharge,
                  // minute:
                });
              })
              .catch((error) => {
                res.status(400).json({
                  status: false,
                  msg: "error",
                  error: error,
                });
              });
            const finduserAndupdate = await User.findOneAndUpdate(

              { _id: userid },

              { $set: { amount: newamt, deductedAmt: totalamt } },
              { new: true },
            )
            if (finduserAndupdate) {
              //  console.log("UPDATE USER AMOUNT", finduserAndupdate)

            }

          }
        }
      }
    } else {
      // console.log("error")
      res.status(400).json({
        status: false,
        msg: "Something Went Wrong"
      })
    }

  } else if (getdata.status == "Accepted") {
    // console.log("Accepted")
    const getplanchrge = await Minutecharge.findOne({ _id: planid })
    // console.log("MIN PLAN", getplanchrge)
    if (getplanchrge) {


      var getplan = getplanchrge.minute
      //  console.log("getplan", getplan)
      let milliseconds = getplan * 60000
      // console.log("milliseconds", milliseconds)
      var f = new Date()
      var dtime = new Date(f.getTime()).toLocaleTimeString()
      //console.log("dtime", dtime)
      var minutesToAdd = getplan;
      // var currentDate = new Date();
      // var delay30min = new Date(currentDate.getTime() + minutesToAdd*60000).toLocaleTimeString()
      // console.log("fghg",delay30min)

      //  const [hours, minutes, seconds,ff] = delay30min.split(":");
      // console.log(hours); // 👉️ "09"
      // console.log(minutes); // 👉️ "30"


      // setTimeout(() => {
      //   console.log('Hello World!');
      // }, `${milliseconds}`);


      function myFunction() {
        timeout = setTimeout(alertFunc, `${getplan}` * 60 * 1000);
        //console.log("success")
      }

      async function alertFunc() {
        //  console.log("Hello!");
        const getdata = await ChatWallet.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          { $set: { status: "Completed" } },
          { new: true }
        )

        await Astrologer.findOneAndUpdate(
          {
            _id: astroid,
          },
          { $set: { waiting_queue: getplan } },
          { new: true }
        )
      }
      //console.log("DATA", getdata)
      myFunction()

      res.status(200).json({
        status: true,
        msg: "Your Request is Accepted",
        data: getdata
      })


      // const task = cron.schedule(`0 ${minutes} ${hours} * * *`,async () => {

      //   console.log('running a task every minute');
      //   const getdata=  await ChatWallet.findOneAndUpdate(
      //     {
      //       _id: req.params.id,
      //     },
      //     { $set:{status: "Completed"} },
      //     { new: true }
      //   )
      //   task.stop()
      //   console.log("DATA",getdata)



      // });
    }

  } else if (getdata.status == "Rejected") {
    //  console.log("Rejected")
    res.status(200).json({
      status: true,
      msg: "Your Request is Rejected"
    })

  }

  // .then((data) => resp.successr(res, data))
  // .catch((error) => resp.errorr(res, error));
}

exports.acceptVoiceCall = async (req, res) => {
  const getdata = await ChatWallet.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { status: req.body.status } },
    { new: true }
  )
  let astroid = getdata.astroid
  // console.log("astroid",astroid)
  let planid = getdata.recharge_planId
  // console.log("astroid",astroid)
  let userid = getdata.userid

  if (getdata.status == "Completed") {
    // console.log("Completed")
    const getoneastro = await Astrologer.findOne({ _id: astroid })

    // console.log("ASTRO", getoneastro)
    if (getoneastro) {
      const getcharge = getoneastro.callCharge
      //  console.log("CALLCHARGE", getcharge)

      const getplanchrge = await Minutecharge.findOne({ _id: planid })
      //  console.log("MIN PLAN", getplanchrge)
      if (getplanchrge) {
        const getplan = getplanchrge.minute
        //  console.log("getplan", getplan)

        const getuserdetail = await User.findOne({ _id: userid })
        //console.log("GETUSER",getuserdetail)
        if (getuserdetail) {
          let totalamt = getcharge * getplan
          //  console.log("TOTAL AMT WAS DEDUCTED", totalamt)
          const getwalletamt = getuserdetail.amount
          //  console.log("WALLET AMT", getwalletamt)
          let newamt = 0
          if (getwalletamt > totalamt) {
            //  console.log("success")

            newamt = getwalletamt - totalamt
            // console.log("Before", getwalletamt)
            // console.log("new", newamt)

            const newWalletT = new WalletT({
              userid: userid,
              astroid: astroid,
              recharge_planId: planid,
              type: "Chat",
              tran_Type: "Debited",
              conversationId: "#" + Date.now(),
              beforeAmt: getwalletamt,
              deductedAmt: totalamt,
              finalAmt: newamt,
              status: "Completed"
            })
            newWalletT.save()
              .then(async (data) => {
                //  const createnewtable = await WalletT.create(newWalletT);
                //   console.log("MMMMMM",createnewtable)
                res.status(200).json({
                  status: true,
                  msg: "success",
                  data: data,
                  beforeAmt: getwalletamt,
                  deductedAmt: totalamt,
                  finalAmt: newamt

                  // callCharge:getoneastro.callCharge,
                  // minute:
                });
              })
              .catch((error) => {
                res.status(400).json({
                  status: false,
                  msg: "error",
                  error: error,
                });
              });
            const finduserAndupdate = await User.findOneAndUpdate(

              { _id: userid },

              { $set: { amount: newamt, deductedAmt: totalamt } },
              { new: true },
            )
            if (finduserAndupdate) {
              // console.log("UPDATE USER AMOUNT", finduserAndupdate)

            }

          }
        }
      }
    } else {
      // console.log("error")
      res.status(400).json({
        status: false,
        msg: "Something Went Wrong"
      })
    }

  } else if (getdata.status == "Accepted") {
    // console.log("Accepted")
  } else if (getdata.status == "Rejected") {
    // console.log("Rejected")

  }

  // .then((data) => resp.successr(res, data))
  // .catch((error) => resp.errorr(res, error));
}

exports.acceptVideoChat = async (req, res) => {
  const getdata = await ChatWallet.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { status: req.body.status } },
    { new: true }
  )
  let astroid = getdata.astroid
  // console.log("astroid",astroid)
  let planid = getdata.recharge_planId
  // console.log("astroid",astroid)
  let userid = getdata.userid

  if (getdata.status == "Completed") {
    // console.log("Completed")
    const getoneastro = await Astrologer.findOne({ _id: astroid })

    // console.log("ASTRO", getoneastro)
    if (getoneastro) {
      const getcharge = getoneastro.callCharge
      //  console.log("CALLCHARGE", getcharge)

      const getplanchrge = await Minutecharge.findOne({ _id: planid })
      //  console.log("MIN PLAN", getplanchrge)
      if (getplanchrge) {
        const getplan = getplanchrge.minute
        //  console.log("getplan", getplan)

        const getuserdetail = await User.findOne({ _id: userid })
        //console.log("GETUSER",getuserdetail)
        if (getuserdetail) {
          let totalamt = getcharge * getplan
          // console.log("TOTAL AMT WAS DEDUCTED", totalamt)
          const getwalletamt = getuserdetail.amount
          //  console.log("WALLET AMT", getwalletamt)
          let newamt = 0
          if (getwalletamt > totalamt) {
            //  console.log("success")

            newamt = getwalletamt - totalamt
            // console.log("Before", getwalletamt)
            // console.log("new", newamt)

            const newWalletT = new WalletT({
              userid: userid,
              astroid: astroid,
              recharge_planId: planid,
              type: "Chat",
              tran_Type: "Debited",
              conversationId: "#" + Date.now(),
              beforeAmt: getwalletamt,
              deductedAmt: totalamt,
              finalAmt: newamt,
              status: "Completed"
            })
            newWalletT.save()
              .then(async (data) => {
                //  const createnewtable = await WalletT.create(newWalletT);
                //   console.log("MMMMMM",createnewtable)
                res.status(200).json({
                  status: true,
                  msg: "success",
                  data: data,
                  beforeAmt: getwalletamt,
                  deductedAmt: totalamt,
                  finalAmt: newamt

                  // callCharge:getoneastro.callCharge,
                  // minute:
                });
              })
              .catch((error) => {
                res.status(400).json({
                  status: false,
                  msg: "error",
                  error: error,
                });
              });
            const finduserAndupdate = await User.findOneAndUpdate(

              { _id: userid },

              { $set: { amount: newamt, deductedAmt: totalamt } },
              { new: true },
            )
            if (finduserAndupdate) {
              // console.log("UPDATE USER AMOUNT", finduserAndupdate)

            }

          }
        }
      }
    } else {
      // console.log("error")
      res.status(400).json({
        status: false,
        msg: "Something Went Wrong"
      })
    }

  } else if (getdata.status == "Accepted") {
    //  console.log("Accepted")
  } else if (getdata.status == "Rejected") {
    //console.log("Rejected")

  }

  // .then((data) => resp.successr(res, data))
  // .catch((error) => resp.errorr(res, error));
}




exports.wait_queue_list = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the next day

  await ChatWallet.find({
    $and: [
      { astroid: req.params.id },
      { status: "Requested" },
      { createdAt: { $gte: today, $lt: tomorrow } } // Filter for today's data
    ]
  })
    .populate("astroid")
    .populate("userid")
    .populate("recharge_planId")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.appVideoCalling = async (req, res) => {
  let requsetedId = req.body.id
  const getdata = await ChatWallet.findOneAndUpdate(
    {
      _id: req.body.requsetedId,
    },
    { $set: { channelName: req.body.channelName, token: req.body.token } },
    { new: true }
  )
    .then((data) => {
      // Custom success response format
      const response = {
        status: 'true',
        message: 'success',
        requsetedId: req.body.requsetedId,
        channelName: req.body.channelName,
        token: req.body.token
        // Assuming you want to send the updated data in the response
      };
      res.status(200).json(response);
    })
    .catch((error) => {
      // Custom error response format
      const response = {
        status: 'false',
        message: 'error',
        error: error.message, // Assuming you want to send the error message in the response
      };
      res.status(500).json(response);
    });
};

// .then((data) => resp.successr(res, data))
// .catch((error) => resp.errorr(res, error));

exports.VideoNotification = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the next day

  await ChatWallet.find({
    $and: [
      { astroid: req.params.id },
      { status: "Requested" }, { type: "Video" },
      { createdAt: { $gte: today, $lt: tomorrow } } // Filter for today's data
    ]
  })
    // .populate("astroid")
    .populate("userid")
    .populate("recharge_planId")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dlt_wait_queue = async (req, res) => {
  await ChatWallet.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.accepted_notification = async (req, res) => {
  await ChatWallet.find({ $and: [{ userid: req.params.id }, { status: "Accepted" }] }).populate("astroid").populate("userid").populate("recharge_planId")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.addChatWallet = async (req, res) => {
  const { userid, astroid, recharge_planId, beforeAmt, deductedAmt, finalAmt } = req.body;


  const getoneastro = await Astrologer.findOne({ _id: req.body.astroid })
  //console.log("ASTRO",getoneastro)
  if (getoneastro) {
    const getcharge = getoneastro.callCharge
    //console.log("CALLCHARGE", getcharge)


    const minute = 5


    const getuserdetail = await User.findOne({ _id: req.body.userid })
    //console.log("GETUSER",getuserdetail)
    if (getuserdetail) {
      let totalamt = getcharge * minute
      //  console.log("TOTAL AMT WAS DEDUCTED", totalamt)

      const getwalletamt = getuserdetail.amount
      // console.log("WALLET AMT", getwalletamt)
      let newamt = 0
      if (getwalletamt > totalamt) {
        // console.log("success")

        // newamt =getwalletamt - totalamt
        // console.log("camt",getwalletamt)
        // console.log("new",newamt)

        // const newChatWallet = new ChatWallet({
        //   userid:userid,
        //   astroid:astroid,
        //   recharge_planId:recharge_planId,
        //   type:"Voice Call",
        //   tran_Type:"Debited",
        //   conversationId:"#"+ Date.now(),
        //   beforeAmt:getwalletamt,
        //             deductedAmt:totalamt,
        //             finalAmt:newamt

        // })
        // const newWalletT = new WalletT({
        // userid:userid,
        //   astroid:astroid,
        //   recharge_planId:recharge_planId,
        //   type:"Voice Call",
        //   tran_Type:"Debited",
        //   conversationId:"#"+ Date.now(),
        //   beforeAmt:getwalletamt,
        //             deductedAmt:totalamt,
        //             finalAmt:newamt
        // })
        // newChatWallet.save()
        //         .then(async(data) => {
        //           const createnewtable = await WalletT.create(newWalletT);
        //           console.log("MMMMMM",createnewtable)
        //           res.status(200).json({
        //             status: true,
        //             msg: "success",
        //             data: data,
        //             beforeAmt:getwalletamt,
        //             deductedAmt:totalamt,
        //             finalAmt:newamt

        //             // callCharge:getoneastro.callCharge,
        //             // minute:
        //           });
        //         }) 
        //         .catch((error) => {
        //           res.status(400).json({
        //             status: false,
        //             msg: "error",
        //             error: error,
        //           });
        //         });
        //         const finduserAndupdate = await User.findOneAndUpdate(

        //             { _id: req.body.userid },

        //             { $set: {amount:newamt,deductedAmt:totalamt } },

        //           //     { amount: currntamt },

        //           // { $set: {status:"success"} },
        //           { new: true },
        //           )
        //           if(finduserAndupdate){
        // console.log("UPDATE USER AMOUNT",finduserAndupdate)

        //           }
        res.status(200).json({
          status: true,
          msg: "success",
          type: "Chat"
        })


      } else {
        // console.log("INSUFFICIENT BALANCE")
        res.status(201).json({
          status: false,
          msg: "Insufficient belence"
        })
      }

    } else {
      // console.log("ERROR")
      res.status(400).json({
        status: false,
        msg: "Something Went Wrong"
      })
    }
  } else {
    // console.log("error")
    res.status(400).json({
      status: false,
      msg: "Something Went Wrong"
    })
  }

}


exports.getOnenotificationByastro = async (req, res) => {
  await ChatWallet.findOne({ _id: req.params.id }).populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dltallAllChat = async (req, res) => {
  await ChatWallet.deleteMany()
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};