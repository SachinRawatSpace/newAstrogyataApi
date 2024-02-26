const Chat = require("../models/chat");
const mongoose = require("mongoose");

const Chatroom = require("../models/chatroom");
const resp = require("../helpers/apiResponse");
const { v4: uuidv4 } = require("uuid");
var cron = require('node-cron');

// cron.schedule('*/10 * * * * *', () => {
//   console.log('running a task every minute');
// });


exports.addchat = async (req, res) => {
  const uniqueroom = uuidv4();
  const { userid, astroid, msg } = req.body;

  const newChat = new Chat({
    userid: req.params.id,
    astroid: astroid,
    msg: msg,
    roomid: uniqueroom,
    type: "user"

  });

  const newChatroom = new Chatroom({

    userid: req.params.id,
    astroid: astroid,
    last_msg: msg,
    new_unread_msg: 1,
    // roomid:  
  });
  const findchatroom = await Chatroom.findOne({ $and: [{ userid: req.params.id }, { astroid: astroid }] });

  // console.log("FINDDATA",findchatroom)
  if (findchatroom) {
    newChat.roomid = findchatroom._id;
    let data = {
      new_unread_msg: parseInt(findchatroom.new_unread_msg) + 1,
    };
    // if (!msgbysupport) {
    //   data.last_msg = msg;
    // }
    // console.log("DATA", data);
    const updatechat = await Chatroom.findOneAndUpdate(
      {
        $or: [
          { $and: [{ reciver: req.params.userid }, { sender: req.body.id }] },
          { $and: [{ sender: req.body.id }, { reciver: req.params.userid }] },
        ],
      },
      {
        $set: data,
      },
      { new: true }
    );
    // console.log("updatechat", updatechat)
    newChat
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  } else {
    const savechat = await newChatroom.save();
    const savechatt = savechat._id
    //  console.log("savechatt", savechatt)
    if (savechat) {
      newChat.roomid = savechat._id;
      newChatroom.roomid = savechatt
      newChat
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }
};




exports.add_chatroom = async (req, res) => {
  const uniqueroom = uuidv4();
  const { reciver, sender, astroid, msg, msg_reply } = req.body;

  const newChat = new Chat({
    reciver: reciver,
    sender: req.params.id,
    msg: msg,
    type: "astrologer"
    //   roomid: uniqueroom,

  });

  // const newChatroom = new Chatroom({
  //   userid: req.params.id,
  //   astroid:astroid,
  //   last_msg: msg,
  //   new_unread_msg: 1,
  // });
  // const findchatroom = await Chatroom.findOne( { $and: [{ userid: req.params.id }, { astroid:astroid }]} );
  // console.log("FINDDATA",findchatroom)
  // if (findchatroom) {
  //   newChat.roomid = findchatroom._id;
  //   let data = {
  //     new_unread_msg: parseInt(findchatroom.new_unread_msg) + 1,
  //   };
  //   if (!msgbysupport) {
  //     data.last_msg = msg;
  //   }
  //   console.log("DATA",data);
  // const updatechat = await Chatroom.findOneAndUpdate(
  //     {
  //         $or: [
  //           { $and: [{ userid: req.params.id }, { astroid: req.body.id }] },
  //           { $and: [{ astroid: req.body.id }, { userid: req.params.id }] },
  //         ],
  //       },
  //   {
  //     $set: req.body,
  //   },
  //   { new: true }
  // );
  // newChat
  //   .save()
  //   .then((data) => resp.successr(res, data))
  //   .catch((error) => resp.errorr(res, error));
  // } else {
  //   const savechat = await newChatroom.save();
  //   if (savechat) {
  //     newChat.roomid = savechat._id;
  //     newChat
  //       .save()
  //       .then((data) => resp.successr(res, data))
  //       .catch((error) => resp.errorr(res, error));
  //   }

  const findchatroom = await Chatroom.findOne({ $and: [{ userid: reciver }, { astroid: req.params.id }] });
  // console.log("FINDDATA", findchatroom)
  if (findchatroom) {
    newChat.roomid = findchatroom._id;
    let data = {
      new_unread_msg: parseInt(findchatroom.new_unread_msg) + 1,
    };
    // if (!msgbysupport) {
    //   data.last_msg = msg;
    // }
    //console.log("DATA", data);
    const updatechat = await Chatroom.findOneAndUpdate(
      {
        $or: [
          { $and: [{ userid: req.params.id }, { astroid: req.body.id }] },
          { $and: [{ sender: req.params.id }, { userid: req.body.id }] },
        ],
      },
      {
        $set: data,
      },
      { new: true }
    );
    newChat
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  } else {
    res.status(400).json({
      status: false,
      error: "error"
    })
  }
}



exports.allchatwithuser = async (req, res) => {
  //const{roomid} = req.body
  await Chat.find({ roomid: req.params.id }).populate("userid").populate("astroid").populate("reciver").populate("sender")
    // .populate("userid").populate("astroid")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getone_chat = async (req, res) => {
  //const{roomid} = req.body
  const getone = await Chat.findOne({ $and: [{ userid: req.params.userid }, { astroid: req.params.astroid }] }).populate("userid").populate("astroid")
    //  console.log("getone",getone)

    // .populate("userid").populate("astroid")
    .sort({ createdAt: 1 })
  res.status(200).json({
    status: true,
    message: "success",
    //  count: data.length,
    data: getone
  })
  // .then((data) => resp.successr(res, data))
  // .catch((error) => resp.errorr(res, error));
};

exports.userChatList = async (req, res) => {
  const getdetails = await Chat.find({ userid: req.params.id }).populate("userid").populate("astroid")
  let record = [];
  for (const element of getdetails) {
    if (element.astroid) {

      record.push(element.astroid,);
      // record.push(element.astroid.img);

      // var getroomid =   record.push(element.roomid)

    }
  }

  //console.log("Record", record)
  let uniqueCharss = [...new Set(record)]
  let uniqueCharsss = [...new Set(record.roomid)]

  // console.log("hfjdbf", uniqueCharss)
  // console.log("uniqueCharss", uniqueCharsss)


  const newArray = getdetails.map((m) => [m.id, m]);
  const newMap = new Map(newArray);
  const iterator = newMap.values();
  const unique = [...uniqueCharss];
  //console.log("UNIQUE", unique)

  function removeDuplicates(getdetails) {
    return getdetails.filter((item,
      index) => getdetails.indexOf(item) === index);
  }
  //console.log("string",removeDuplicates(getdetails));

  // console.log(unique);

  let addresses = [...new Set([...getdetails.map(address => getdetails[address.roomid])])]

  // console.log("ADDRESS", addresses)
  let newarr = []
  if (getdetails) {
    var newarr1 = getdetails.map(function (getdetails) {
      // return value+= value;
      return getdetails.roomid
      // newarr.push(value.roomid)
    });

    let uniq = [...new Set(newarr1)]
    // console.log("uniq", uniq)
    // console.log("UNIQUE", newarr1)
  }

  //let uniq =indexOf(newarr1);


  res.status(200).json({
    status: true,
    message: "success",
    //  count: getdetails.length,
    //data : getdetails,
    //student :record,
    //count :
    // astroid:uniqueCharss,
    // roomid:uniqueid,
    //  data:getdetails,
    data: uniqueCharss,
    //  roomid:

  })
};

exports.allchatwithAstro = async (req, res) => {
  await Chat.find({ $or: [{ astroid: req.params.id }, { sender: req.params.id }] })
    .populate("userid").populate("astroid").populate("reciver").populate("sender")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.unreadmessages = async (req, res) => {
  await Chatroom.findOne({ userid: req.params.id })
    .populate("userid")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getallchatrooms = async (req, res) => {
  await Chatroom.find()
    .populate("userid")
    .sort({ updatedAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.clearchat = async (req, res) => {
  await Chat.deleteMany({ userid: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.markasread = async (req, res) => {
  await Chatroom.findOneAndUpdate(
    { userid: req.params.id },
    {
      $set: { new_unread_msg: 0 },
    },
    { new: true }
  )
    .populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.getroomid = async (req, res) => {

  const arrOfObj = await Chat.find({ userid: req.params.id }).populate("userid").populate("astroid")
  // console.log("arrOfObj",arrOfObj)
  let newIterable = arrOfObj.entries(arrOfObj);
  //console.log("newIterable",newIterable)
  let record = [];
  for (const element of arrOfObj) {
    if (element.roomid) {
      //  console.log("key " + key + " has value " + myArray[key]);
      record.push(element.roomid,);
    }
  }
  //  console.log("Record",record)
  // let uniqueCharss = [...new Set(record)]
  // console.log("Record",record)
  //let uniqueCharss = [...new Set(record)]
  //console.log("MP",record.keys());

  //const dataArr = ['1','5','6','1','3','5','90','334','90'];
  var dataArr = arrOfObj.map(item => {
    return [JSON.stringify(item.roomid), item.roomid]
  }); // creates array of array
  var maparr = new Map(dataArr); // create key value pair from array of array
  //console.log("maparr",maparr)
  var result = [...maparr.values()];//converting back to array from mapobject


  //console.log(result); 
  //[{"name":"abc","age":27},{"name":"pqr","age":27}]


  let recordss = [];

  for (const [key, value] of Object.entries(arrOfObj)) {
    // console.log(`${key}: ${value}`);
    //  recordss.push ("DATA",`${key}: ${value}`)
  }
  newarr = {}
  var newarr = Object.entries(arrOfObj).forEach(([key, value]) => {
    //console.log("data",`${key} ${value}`);
    //  push.newarr(`${key} ${value}`)
    var newarr = `${key} ${value}`
    //  console.log("array",newarr)

    //array.push[JSON.stringify(`${key} ${value}`)]
    //console.log("data",data)
    return newarr

  })

  var newObject = Object.keys(arrOfObj).map(function (key) {
    return arrOfObj[key];

  });
  function removeDuplicates(newObject) {
    return [...new Set(newObject)];

  }
  //console.log("ggg",removeDuplicates(newObject));
  const unique = Array.from(new Set(newObject))
  //let uniqueCharss = [...new Set(newObject)]

  //console.log("uuuu",unique)

  var dataArr = arrOfObj.map(item => {
    return [JSON.stringify(item)]
  }); // creates array of array
  var maparr = new Map(dataArr); // create key value pair from array of array
  //console.log("maparr",maparr)
  var result = [...maparr.values()]
  var dtt = ([...new Map(dataArr.astroid)]);
  // console.log("kkk", dtt)
  // console.log("hhhh", result)


  const map = new Map(arrOfObj.map((obj) => [obj.key, obj.value]));
  //console.log("MAP",map);

  const arr = [
    { key: 'user1', value: 'John' },
    { key: 'user2', value: 'Kate' },
    { key: 'user3', value: 'Peter' },
  ];
  const mapp = new Map();
  arrOfObj.forEach((arrOfObj) => {
    map.set(arrOfObj.key, arrOfObj.value);
  });
  // Map(3) { 'user1' => 'John', 'user2' => 'Kate', 'user3' => 'Peter' }
  // console.log(mapp);



  var result = arrOfObj.reduce(function (map, obj) {
    map[obj.key] = obj.val;
    return map;
  }, {});

  // console.log(result);

  const twoDimensionalArr = arrOfObj.map(
    object => [object.key, object.value]
  );
  // console.log(twoDimensionalArr)

  const mapToObj = m => {
    return Array.from(m).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  };

  // console.log(JSON.stringify(mapToObj(map)));
  // { foo:'bar', hello:'world' }
  //console.log("recordss",recordss)


  var arrOfObjj = [
    {
      name: 'abc', age: 27
    },
    {
      name: 'pqr', age: 27
    },
    {
      name: 'abc', age: 27
    },
  ]
  var dataArr = arrOfObj.map(item => {
    return [item.astroid, item]
  }); // creates array of array
  var maparr = new Map(dataArr); // create key value pair from array of array
  var result = [...maparr.values()];//converting back to array from mapobject
  //console.log(result); //[{"name":"abc","age":27},{"name":"pqr","age":27}]
  res.status(200).json({
    status: true,
    message: "success",
    // length:uniqueCharss.length,
    data: result,
    //  details:arrOfObj
  })
};


// exports.getroomid = async (req, res) => {
//   const arrOfObj=  await Chat.find({userid:req.params.id}).populate("userid").populate("astroid")







//     res.status(200).json({
//       status: true,
//       message: "success", 
//     data:arrOfObj,
//   //  details:arrOfObj
//     })
// };

exports.astrogetRoomid = async (req, res) => {

  const arrOfObj = await Chat.find({ astroid: req.params.id }).populate("userid").populate("astroid")

  var dataArr = arrOfObj.map(item => {
    return [item.userid, item]
  }); // creates array of array
  var maparr = new Map(dataArr); // create key value pair from array of array
  var result = [...maparr.values()];//converting back to array from mapobject
  //  console.log(result); //[{"name":"abc","age":27},{"name":"pqr","age":27}]
  res.status(200).json({
    status: true,
    message: "success",
    // length:uniqueCharss.length,
    data: result,
    //  details:arrOfObj
  })
};