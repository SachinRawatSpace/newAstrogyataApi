 

const express = require('express');
const https = require('https');
const fetch = require('node-fetch');
const app = express();

 
// exports.phonepay =async(req, res) => {
//     const requestData = {
//         merchantId: 'Merchantid',
//         transactionId: 'TX123456789',
//         merchantUserId: 'U123456789',
//         amount: 1,
//         merchantOrderId: 'OD1234',
//         mobileNumber: '7489651191',
//         message: 'payment for order placed OD1234',
//         subMerchant: 'DemoMerchant',
//         email: 'guptapratima98710@gmail.com',
//         shortName: 'Amit'
//       };
    
//       const url = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';
//       const options = {
//         method: 'POST',
//         headers: { accept: 'application/json', 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestData)
//       };
    
//       fetch(url, options)
//         .then(response => response.json())
//         .then(json => {
//           res.status(200).json(json); // Send the JSON response to the client
//         })
//         .catch(err => {
//           res.status(500).json({ error: 'An error occurred' });
//         });
//     }

 
    // exports.instaMojopay =async(req,res)=>{

    //   var name =req.body.name;
    //   var email = req.body.email;
    //   var amount = req.body.amount;
      
    //   var data = new Insta.PaymentData()
      
    //   const REDIRECT_URL ="http://localhost:3000/sucess"
      
    //   data.setRedirectUrl(REDIRECT_URL);
      
    //   data.send_email = "True";
    //   data.purpose = "Test"//Required
      
    //   data.amount =amount
    //   data.name = name 
    //   data.email= email
      
    //   Insta.createPayment(data,function(error,response){
      
    //   if(error){
    //   //same error
    //   }else{
    //   console.log(response)
    //   res.send ("Please check your email to make payment")
    //   }
    //   })
    //   }
    

 
//const https = require('https');

const clientId = 'your_client_id';
const clientSecret = 'your_client_secret';
  
exports.generate_access_token = async (req, res) => {
  const clientId = 'JBlzrCJc1xiodrzBoGhkCZ4BBTP2syP0hSxOaCzG';
  const clientSecret = 'SAkGEWSiRuKLViQ12dN0fRj9OVv77K33XWQflC0HGqQOB5nHwmiAS8kNy04au4pXj0X9DNyYqvclUXDxonRjGUNJHh95CdvqaZhvKBeNb7rHNsTUnRK8K593Sdb5panp';

  const options = {
    method: 'POST',
    hostname: 'api.instamojo.com',
    path: '/oauth2/token/',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const request = https.request(options, function (instamojoRes) {
    const chunks = [];

    instamojoRes.on('data', function (chunk) {
      chunks.push(chunk);
    });

    instamojoRes.on('end', function () {
      const body = Buffer.concat(chunks);
   //   console.log(body.toString());
      res.send(body.toString()); // You might want to send the response to the client here
    });
  });

  // Construct the form data
  const formData = qs.stringify({
    grant_type: 'client_credentials',
    client_id:clientId,
    client_secret:clientSecret,
  });
console.log(formData)
  request.write(formData);
  request.end();
};



 
 
const qs = require('querystring');

exports.payment_requests = async (req, res) => {
  const accessToken = req.headers['authorization'];

  // Check if the Authorization header is present and starts with "Bearer "
  if (!accessToken || !accessToken.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization Bearer token missing or invalid' });
  }

  // Remove "Bearer " from the token
  const token = accessToken.split(' ')[1];

  const options = {
    method: 'POST',
    hostname: 'api.instamojo.com',
    path: '/v2/payment_requests/',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`, // Use the extracted token
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const request = https.request(options, function (instamojoRes) {
    const chunks = [];

    instamojoRes.on('data', function (chunk) {
      chunks.push(chunk);
    });

    instamojoRes.on('end', function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      res.send(body.toString()); // You might want to send the response to the client here
    });
  });

  // Construct the form data
  const formData = qs.stringify({
    allow_repeated_payments: false,
    send_email: false,
    amount: '9', // Add the desired amount
    purpose: 'Payment for Order #123', // Add the purpose of the payment
    send_sms: true,
    phone: 8461809095,
    send_email: true,
    email: 'pratimadevelopersveltosest@gmail.com',
    mark_fulfilled: true,
    // Add other required and optional fields as needed
  });

  request.write(formData);
  request.end();
};


//const https = require('https');

exports.fetch_payment_details = async (req, res) => {
  const accessToken = '-oVHAyA_T_IRbPB-Y9HXtx6ZH1RvYnLXD0-joIwdWV4.qfU2pL91HV-fJaEuWIeeW55O4lkqB5SJOQhFM9_Nnb4'; // Replace with your actual access token
  const paymentRequestId = req.params.paymentRequestId; // Get the paymentRequestId from the URL parameter

  const options = {
    method: 'GET',
    hostname: 'api.instamojo.com',
    path: `/v2/payment_requests/${paymentRequestId}/`, // Use the actual payment request ID
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  };

  const request = https.request(options, function (instamojoRes) {
    const chunks = [];

    instamojoRes.on('data', function (chunk) {
      chunks.push(chunk);
    });

    instamojoRes.on('end', function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      res.send(body.toString()); // Send the response to the client
    });
  });

  request.end();
};
