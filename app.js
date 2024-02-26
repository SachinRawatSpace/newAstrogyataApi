const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//require

const users = require("./routes/users")
const astrologer = require("./routes/astrologer")
const admin = require("./routes/admin")
const aboutus = require("./routes/aboutus")
const terms_condition = require("./routes/terms_condition")
const contact_us = require("./routes/contact_us")
const banner = require("./routes/banner")
const faq = require("./routes/faq")
const blogs = require("./routes/blogs")
const privacy_policy = require("./routes/privacy_policy")
const notification = require("./routes/notification")
const category = require("./routes/category")
const rashi = require("./routes/rashi")
const rashihoroscope = require("./routes/rashihoroscope")
const review = require("./routes/review")
//const Horoscope = require("./routes/Horoscope")
const product = require("./routes/product")
const productcategory = require("./routes/productcategory")
const rashiImg = require("./routes/rashiImg")
const astroproduct = require("./routes/astroproduct")
const Checkout = require("./routes/Checkout")
const shipping_adrss = require("./routes/shipping_adrss")
const chat_intake_form = require("./routes/chat_intake_form")
const plan = require("./routes/plan")
const recharge_plan = require("./routes/recharge_plan")
const blog_category = require("./routes/blog_category")
const make_call = require("./routes/make_call")

const ASK_qus = require("./routes/ASK_qus")
const chat = require("./routes/chat")
const min_charges = require("./routes/min_charges")
const order = require("./routes/order")
const chatWallet = require("./routes/chatWallet")
const createTicket = require("./routes/createTicket")
const match_making = require("./routes/match_making")

const commision = require("./routes/commision")
const payout = require("./routes/payout")
const bookevent = require("./routes/bookevent")
const poojaList = require("./routes/poojaList")
const addEvent = require("./routes/addEvent")
const youtubeVideo = require("./routes/youtubeVideo")
const package = require("./routes/package")
const astro_addPoojaevent = require("./routes/astro_addPoojaevent")
const banner_pooja = require("./routes/banner_pooja")
const astroGallery = require("./routes/astroGallery")
const videoChannel = require("./routes/videoChannel")
const socialMedia = require("./routes/socialMedia")
const otherPages = require("./routes/otherPages")
const checkoutPuja = require("./routes/checkoutPuja")
const callDuration = require("./routes/callDuration")
const astroLiveStreaming = require("./routes/astroLiveStreaming")
const yog_liveStream = require("./routes/yog_liveStream")
const astroVideo_token = require("./routes/astroVideo_token")
const videoLinkNoti = require("./routes/videoLinkNoti")
const astroFollowers = require("./routes/astroFollowers")
const webAstroliveStream = require("./routes/webAstroliveStream")

const payment = require("./routes/payment")
// ----------------------------------------------------------------------------------
const newPayment = require("./routes/payment.route")

app.get("/", (req, res) => {
  res.send("Hello World!");
});



//use
app.use("/", users);
app.use("/", astrologer);

app.use("/", admin);
app.use("/", aboutus);
app.use("/", terms_condition);
app.use("/", contact_us);
app.use("/", banner);
app.use("/", faq);
app.use("/", blogs);
app.use("/", privacy_policy);
app.use("/", notification);
app.use("/", category);
app.use("/", rashi);
app.use("/", rashihoroscope);
app.use("/", review);
//app.use("/", Horoscope);
app.use("/", product);
app.use("/", productcategory);
app.use("/", rashiImg);
app.use("/", astroproduct);
app.use("/", Checkout);
app.use("/", shipping_adrss);
app.use("/", chat_intake_form);
app.use("/", plan);
app.use("/", recharge_plan);
app.use("/", blog_category);
app.use("/", make_call);
app.use("/", ASK_qus);
app.use("/", chat);
app.use("/", min_charges);
app.use("/", order);
app.use("/", chatWallet);
app.use("/", createTicket);
app.use("/", match_making);
app.use("/", commision);
app.use("/", payout);
app.use("/", bookevent);
app.use("/", poojaList);
app.use("/", addEvent);
app.use("/", youtubeVideo);
app.use("/", package);
app.use("/", astro_addPoojaevent);
app.use("/", banner_pooja);
app.use("/", astroGallery);
app.use("/", videoChannel);
app.use("/", socialMedia);
app.use("/", otherPages);
app.use("/", checkoutPuja);
app.use("/", callDuration);
app.use("/", astroLiveStreaming);
app.use("/", yog_liveStream);
app.use("/", astroVideo_token);
app.use("/", videoLinkNoti);
app.use("/", astroFollowers);

app.use("/", webAstroliveStream
);
app.use("/", payment);
app.use("/api", newPayment)



app.get("/", (req, res) => {
  res.send("Hello World!");
});

//console.log(process.env.DB);
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  }).catch((error) => {
    console.log(error);
  });


app.listen(process.env.PORT || 4000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

//    http://localhost:5000/admin
