const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thisSchema = new Schema({
 
    select_sslmedia: {
        type : String},
  url:{
    type: String,
  },
   
 
 

},
{ timestamps: true }
);
 module.exports = mongoose.model("Socailmedia", thisSchema);


 