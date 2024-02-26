const Order = require("../models/order");
const resp = require("../helpers/apiResponse");
const Cart = require("../models/Checkout");

exports.AddOrder = async (req, res) => {
  const { cartId, userid, astroid, orderId, razorpay_payment_id, status, orderNote } = req.body
  const cus_orderId = "ORDC" + Date.now();
  let d = new Date().toLocaleDateString()
  //    console.log('Today is: ' + d.toLocaleDateString());
  //    var today = moment(d).format('DD-MM-YYYY');
  //    console.log("Today",today)
  const getproduct = await Cart.findOne({ _id: req.body.cartId })
  console.log("getproduct", getproduct)
  const getoneproduct = getproduct.productid
  console.log("product", getoneproduct)

  const newOrder = new Order({
    cartId: cartId,
    products: getoneproduct,
    userid: userid,
    astroid: astroid,
    orderId: cus_orderId,
    razorpay_payment_id: razorpay_payment_id,
    date: d,
    status: "PENDING",
    orderNote: orderNote
  })
  console.log(newOrder)


  if ((req.body.razorpay_payment_id) !== undefined || (req.body.razorpay_payment_id) != null || (req.body.razorpay_payment_id) || '') {
    newOrder.save()
      .then((data) => {
        res.status(200).json({

          status: true,
          msg: "Product Ordered",
          data: data,
        })
      })
  } else {
    res.status(400).json({
      status: false,
      msg: "error",

    });
  }
}


exports.getoneOrder = async (req, res) => {
  await Order.findOne({ _id: req.params.id }).populate("cartId")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.myOrders = async (req, res) => {
  await Order.find({ $and: [{ status: "COMPLETED" }, { userid: req.params.id }], }).populate({
    path: "products",
    populate: {
      path: "product",
    },
  })
    .populate("cartId")
    .populate("userid")
    .populate({
      path: "cartId",
      populate: {
        path: "shipping_address",
      },
    })
    // .populate({
    //     path: "cartId",
    //     populate: {
    //       path: "astroId",
    //      // path:"astroid"
    //     },
    // })
    .populate({
      path: "cartId",
      populate: {
        path: "productid",
      },

    })
    .populate("astroid")






    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.editOrder = async (req, res) => {
  await Order.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.admin_product_Orderslist = async (req, res) => {
  await Order.find().populate({
    path: "products",
    populate: {
      path: "product",
    },
  })
    .populate("cartId")
    .populate("userid")
    .populate({
      path: "cartId",
      populate: {
        path: "shipping_address",
      },
    })
    .populate({
      path: "cartId",
      populate: {
        path: "astroId",
        // path:"astroid"
      },
    })



    .populate("astroid")






    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.dltOrder = async (req, res) => {
  await Order.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.completed_order = async (req, res) => {
  const getdata = await Order.find({ $and: [{ status: "COMPLETED" }, { userid: req.params.id }], }).populate({
    path: "products",
    populate: {
      path: "product",
    },
  })
    .populate("cartId")
    .populate("userid")
    .populate({
      path: "cartId",
      populate: {
        path: "shipping_address",
      },
    })
    // .populate({
    //     path: "cartId",
    //     populate: {
    //       path: "astroId",
    //      // path:"astroid"
    //     },
    // })
    .populate({
      path: "cartId",
      populate: {
        path: "productid",
      },

    })
    // console.log("data",getdata)
    // if(getdata){
    //   res.status(200).json({
    //     status: true,
    //       message:"success",
    //      data:getdata

    //   })
    //       }else{

    //       }
    .populate("astroid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
