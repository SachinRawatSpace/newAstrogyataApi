const Astoken = require("../models/astroVideo_token");

const resp = require("../helpers/apiResponse");
const jwt = require('jsonwebtoken');


exports.token = async (req, res) => {
    const jwt = require('jsonwebtoken');

    const appID = 1011009319; // type: number
    const secret = '0b7c5477f07346c1a906c99d3f171f2e'; // type: 32 byte length string
    const userId = 'demo'; // type: string
    const effectiveTimeInSeconds = 3600; // type: number; unit: s
    const payloadObject = {
        room_id: 'demo',
        privilege: {
            1: 1,   // loginRoom: 1 pass, 0 not pass
            2: 0    // publishStream: 1 pass, 0 not pass
        },
        stream_id_list: null
    };
    const payload = JSON.stringify(payloadObject);

    // Build token
    const token = jwt.sign(
        {
            appID: appID,
            userId: userId,
            payload: payload
        },
        secret,
        {
            expiresIn: effectiveTimeInSeconds
        }
    );

    console.log(token);
}









