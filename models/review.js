const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  astroid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'astrologer'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },

  comment:{
      type : String
},
avg_rating:{
  type: Number,
},
type:{
  type: String,

},
reply:{
  type: String,
}

},
{ timestamps: true }
);
 module.exports = mongoose.model("review", ReviewSchema);


 