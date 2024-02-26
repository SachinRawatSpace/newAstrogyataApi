const astroGallery = require("../models/astroGallery");
const resp = require("../helpers/apiResponse");
const { uploadFile } = require("../helpers/awsuploader");
const { uploadBase64ImageFile } = require("../helpers/awsuploader");

var signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image.png",
  "/9j/": "image.jpg"
};

function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}



// exports.upload_astrogallery = async (req, res) => {
//   const { astroId, file } = req.body;

//   const newastroGallery = new astroGallery({
//     astroId: astroId,
//   });

//   // if (req.file) {
//   //   const getimgurl = await uploadFile(
//   //     req.files.file[0]?.path,
//   //     req.files.file[0]?.filename,
//   //     req.files.file[0]?.filename.split('.').pop() // get file extension dynamically
//   //   );
//   //   if (getimgurl) {
//   //     newastroGallery.file = getimgurl.Location;
//   //   }
//   // }
//   const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif'];

//   if (req.file) {
//     const fileExtension = req.files.file[0]?.filename.split('.').pop();

//     if (!allowedFileTypes.includes(fileExtension)) {
//       // handle invalid file type error here
//     } else {
//       const getimgurl = await uploadFile(
//         req.files.file[0]?.path,
//         req.files.file[0]?.filename,
//         fileExtension // pass file extension directly
//       );

//       if (getimgurl) {
//         newastroGallery.file = getimgurl.Location;
//       }
//     }
//   }


//   newastroGallery
//     .save()
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// }
exports.upload_astrogallery = async (req, res) => {
  const { astroId, file } = req.body;

  const newastroGallery = new astroGallery({
    astroId: astroId,
    file: file
  });

  const allowedFileTypes = ['jpg', 'jpeg', 'png', 'mp4'];

  if (req.file) {
    const fileExtension = req.file.originalname.split('.').pop();

    if (!allowedFileTypes.includes(fileExtension)) {
      // handle invalid file type error here
    } else {
      const getimgurl = await uploadFile(
        req.file.path,
        req.file.filename,
        fileExtension // pass file extension directly
      );

      if (getimgurl) {
        newastroGallery.file = getimgurl.Location;
      }
    }
  }


  newastroGallery
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}

exports.addvideobyadmin = async (req, res) => {
  const { videoTitle, } = req.body;

  const newVideo = new Video({
    videoTitle: videoTitle,
    course: course,
    teacher: teacher,
  });

  const findexist = await Video.findOne({ videoTitle: videoTitle });
  if (findexist) {
    resp.alreadyr(res);
  }

  // else{
  // const newVideo = new Video ({
  //     videoTitle : videoTitle,
  //     videolink:videolink,
  //     videoImg :videoImg
  // })
  // if(req.files){
  //     console.log(req.files)
  //     if(req.files.videoImg){
  //         const geturl = await uploadFile(
  //             req.files.videoImg[0]?.path,
  //             req.files.videoImg[0]?.filename,
  //             "jpg"
  //           );
  //           if (geturl) {
  //             newVideo.videoImg = geturl.Location;
  //             //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
  //     }
  // }

  if (req.files.video_file && req.files.video_image) {
    for (let i = 0; i < req.files.video_file.length; i++) {
      const getpdfurl = await uploadFile(
        req.files.video_file[i]?.path,
        req.files.video_file[i]?.filename,
        "mp4"
      );
      newVideo.video_file[i] = geturl.Location;
      // let videoObj = new Object();
      // if (getpdfurl) {
      //   videoObj.video_file = getpdfurl.Location;
      //fs.unlinkSync(`../uploads/${req.files.video_file[i]?.filename}`);
      //  }
      const getimgurl = await uploadFile(
        req.files.video_image[i]?.path,
        req.files.video_image[i]?.filename,
        "jpg"
      );
      // if (getimgurl) {
      //   videoObj.video_image = getimgurl.Location;
      //   //fs.unlinkSync(`../uploads/${req.files.video_image[i]?.filename}`);
      // }
      newVideo.video_image[i] = geturl.Location;
    }
  }

  newVideo
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.get_astroGallery = async (req, res) => {
  const findall = await astroGallery
    .find({ astroId: req.params.id })
    .select("file")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}

exports.delGalleryvideo = async (req, res) => {
  await astroGallery.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.videobycourse = async (req, res) => {
  const findall = await Video.find({ course: req.params.id })
    .populate("teacher")
    .populate("category_id")
    .populate("video_id")
    .populate("pdf_id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.viewonevideo = async (req, res) => {
  const findall = await Video.findOne({ _id: req.params.id })

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.edit_astrogallery = async(req,res)=>{
  const allowedFileTypes = ['jpg', 'jpeg', 'png', 'mp4'];
  data ={}
 try{
  if (req.files) {
      if (req.files.file) {
        alluploads = [];
        for (let i = 0; i < req.files.file.length; i++) {
          // console.log(i);
          const resp = await cloudinary.uploader.upload(req.files.file[i].path, {
            use_filename: true,
            unique_filename: false,
          });
          fs.unlinkSync(req.files.file[i].path);
          alluploads.push(resp.secure_url);
        }
        // newStore.storeImg = alluploads;
        data.file = alluploads;
      }
   }
   await astroGallery.findOneAndUpdate(
      { _id: req.params.id},
      { $set: data },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
   } catch(error){
    resp.errorr(res, error);
   }
  };
// exports.edit_astrogallery = async (req, res) => {
//   const { _id, astroId, file } = req.body; // Assuming you'll pass _id along with updated data

//   const allowedFileTypes = ['jpg', 'jpeg', 'png', 'mp4'];

//   try {
//     let updatedData = {};

//     if (file) {
//       const fileExtension = file.split('.').pop();

//       if (!allowedFileTypes.includes(fileExtension)) {
//         return resp.errorr(res, "Invalid file type");
//       } else {
//         const getimgurl = await uploadFile(
//           req.file.path,
//           req.file.filename,
//           fileExtension
//         );

//         if (getimgurl) {
//           updatedData.file = getimgurl.Location;
//         }
//       }
//     }

//     if (astroId) {
//       updatedData.astroId = astroId;
//     }

//     const updatedAstroGallery = await astroGallery.findByIdAndUpdate(
//       _id,
//       { $set: updatedData },
//       { new: true }
//     );

//     if (!updatedAstroGallery) {
//       return resp.errorr(res, "AstroGallery entry not found");
//     }

//     resp.successr(res, updatedAstroGallery);
//   } catch (error) {
//     resp.errorr(res, error);
//   }
// }
