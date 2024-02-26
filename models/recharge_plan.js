const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thisSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
 
  planid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'plan'
  },
gstAmt:{
    type:Number
},
ttl_amt :{
    type:Number
},
transaction_id:{ 
    type:String
},
amount:{
  type:Number
},
creditAmt:{
  type:Number
},
tran_Type:{
  type:String
},
beforeAmt:{
  type:Number
},
creditedAmt:{
  type:Number
},
finalAmt:{
  type:Number
}

},
{ timestamps: true }
);
 module.exports = mongoose.model("recharWallet", thisSchema);


 