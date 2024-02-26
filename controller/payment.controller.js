const crypto = require('crypto');
const axios = require('axios')
const dotenv = require("dotenv");
var store = require('store');
var sha256 = require('sha256');
var uniqid = require('uniqid');
dotenv.config();

const newPayment = async (req, res) => {
    let tx_uuid = uniqid();
    store.set('uuid', { tx: tx_uuid });
    const merchantTransactionId = req.body.transactionId;
    const normalPayLoad = {
        merchantId: "M223RONE8EP74", //"PGTESTPAYUAT",  //process.env.merchant_id,  
        merchantTransactionId: merchantTransactionId,
        merchantUserId: req.body.MUID,
        name: req.body.name,
        amount: req.body.amount * 100,
        redirectUrl: `http://localhost:5000/api/status/${merchantTransactionId}`,
        redirectMode: 'POST',
        mobileNumber: req.body.number,
        paymentInstrument: {
            type: 'PAY_PAGE'
        }
    };
    // let saltKey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
    let saltKey = "ec032412-1849-41a7-9ba2-3b3cf0cfeb91"
    let saltIndex = 1

    let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
    let base64String = bufferObj.toString("base64");

    // console.log(base64String)

    let string = base64String + '/pg/v1/pay' + saltKey;

    let sha256_val = sha256(string);
    let checksum = sha256_val + '###' + saltIndex;
    // let url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
    let url = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
    axios.post(url, {
        'request': base64String
    }, {
        headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'accept': 'application/json'
        }
    }).then(function (response) {
        return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url)
        // return res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
        // console.log(response.data.data.instrumentResponse.redirectInfo.url)
    }).catch(function (error) {
        console.log(error)
    });
}

const checkStatus = async (req, res) => {
    // let saltKey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
    let saltKey = "ec032412-1849-41a7-9ba2-3b3cf0cfeb91"
    const merchantTransactionId = res.req.body.transactionId
    const merchantId = res.req.body.merchantId
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltKey
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
        method: 'GET',
        url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        // url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };

    // CHECK PAYMENT TATUS
    axios.request(options).then(async (response) => {
        if (response.data.code == "PAYMENT_PENDING") {
            console.log(response.data)
            // const url = `http://localhost:3000/success`
            const url = `https://www.astrogyata.in/`
            return res.redirect(url)
        } else {
            // const url = `http://localhost:3000/failure`
            // return res.redirect(url)
            const url = `https://www.astrogyata.in/`
            return res.redirect(url)
        }
    }).catch((error) => {
        console.error(error);
    });
};

// const checkStatus = async function (req, res) {
//     if (req.body.code == 'PAYMENT_SUCCESS' && req.body.merchantId && req.body.transactionId && req.body.providerReferenceId) {

//         const merchantTransactionId = res.req.body.transactionId
//         const merchantId = res.req.body.merchantId
//         if (req.body.transactionId) {
//             // let saltKey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
//             let saltKey = "ec032412-1849-41a7-9ba2-3b3cf0cfeb91"
//             let saltIndex = 1
//             let surl = 'https://api.phonepe.com/apis/hermes/pg/v1/status/M223RONE8EP74/' + merchantTransactionId;
//             let string = '/pg/v1/status/M223RONE8EP74/' + req.body.transactionId + saltKey;
//             let sha256_val = sha256(string);
//             let checksum = sha256_val + '###' + saltIndex;
//             axios.get(surl, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-VERIFY': checksum,
//                     'X-MERCHANT-ID': req.body.transactionId,
//                     'accept': 'application/json'
//                 }
//             }).then(function (response) {
//                 if (response.data.success === true) {
//                     console.log(response.data)
//                     const url = `http://localhost:3000/success`
//                     return res.redirect(url)
//                 } else {
//                     const url = `http://localhost:3000/failure`
//                     return res.redirect(url)
//                 }
//             }).catch(function (error) {
//                 console.error(error);
//             });
//         } else {
//             console.log("transactionId")
//         }
//     } else {
//         console.log("something went wrong...")
//     }
// }

module.exports = {
    newPayment,
    checkStatus
}


