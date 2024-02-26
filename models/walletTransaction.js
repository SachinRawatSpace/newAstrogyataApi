const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletTransactionSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
 
  planid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'plan'
  },
  astroid:{type: Schema.Types.ObjectId, ref: "astrologer"},
   recharge_planId: {
        type: Schema.Types.ObjectId, ref: "minCharge",
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
 conversationId:{
      type:String
    },
    type:{
      type:String
    },
    beforeAmt:{
      type:Number
    },
    deductedAmt:{
      type:Number
    },
    creditedAmt:{
      type:Number
    },
    finalAmt:{
      type:Number
    },
    status:{
      type:String,
      default:"Requested"
      //Requested,Accepted,Rejected,Completed
    }

},
{ timestamps: true }
);
 module.exports = mongoose.model("WalletTransaction", WalletTransactionSchema);


 