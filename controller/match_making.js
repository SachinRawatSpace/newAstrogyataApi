
const matchMaking = require("../models/match_making.js");
const BirthDetail = require("../models/match_making.js");
const HoroChart = require("../models/match_making.js");

const resp = require("../helpers/apiResponse");

var sdkClient = require("../sdk");
var $ = require("jquery");
var btoa = require('btoa');
var request = require('request');
require('dotenv').config();
const fetch = require('node-fetch');



exports.match_making_report = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);

  var api = 'match_making_report';
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;



  var request_data = {

    m_day: req.body.m_day,
    m_month: req.body.m_month,
    m_year: req.body.m_year,
    m_hour: req.body.m_hour,
    m_min: req.body.m_min,
    m_lat: 19.132,
    m_lon: 72.342,
    m_tzone: 5.5,
    f_day: 03,
    f_month: req.body.f_month,
    f_year: req.body.f_year,
    f_hour: req.body.f_hour,
    f_min: req.body.f_min,
    f_lat: 19.132,
    f_lon: 72.342,
    f_tzone: 5.5,
  };

  var request = $.ajax({
    url: "https://json.astrologyapi.com/v1/match_making_report",
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": "Basic " + btoa(`${userId}` + ":" + `${apiKey}`),
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(request_data)
  });

  request.then(function (resp) {
    // console.log(resp);
    res.status(200).json({
      status: true,
      msg: "success",
      data: resp
    })
  }, function (err) {
    res.status(400).json({
      status: false,
      msg: err
    })
    //  console.log(err);
  });
}


exports.dailyHoroscope = async (req, res) => {

  //Zodiac sign
  var zodiacName = req.body.zodiacName;
  var timezone = 5.5;
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  //Daily Horoscope APIs need to be called
  var resource = "sun_sign_prediction/daily/" + `${zodiacName}`;
  //call dailyHoroCall method for daily predictions
  var dailyHoroData = sdkClient.dailyHoroCall(
    resource,
    zodiacName,
    timezone,
    function (error, result) {
      if (error) {
        // console.log("Error returned!!");
        res.status(405).json({
          error
        })

      } else {
        // console.log("Response has arrived from API server --");
        //console.log(JSON.parse(result));

        res.status(200).json({
          status: true,
          msg: "success",
          // data :result
          data: JSON.parse(result)
        })

      }
    }
  );
}


exports.weeklyHoroscope = async (req, res) => {

  //Zodiac sign
  var zodiacName = req.body.zodiacName;
  var timezone = 5.5;
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  //Daily Horoscope APIs need to be called

  var resource = "horoscope_prediction/weekly/" + `${zodiacName}`;

  //call dailyHoroCall method for daily predictions
  var dailyHoroData = sdkClient.dailyHoroCall(
    resource,
    zodiacName,
    timezone,
    function (error, result) {
      if (error) {
        //  console.log("Error returned!!");
        res.status(405).json({
          error
        })
      } else {
        // console.log("Response has arrived from API server --");
        // console.log(JSON.parse(result));

        res.status(200).json({
          status: true,
          msg: "success",
          // data :result
          data: JSON.parse(result)
        })

      }
    }
  );
}


exports.monthlyHoroscope = async (req, res) => {

  //Zodiac sign
  var zodiacName = req.body.zodiacName;
  var timezone = 5.5;
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  //Daily Horoscope APIs need to be called


  var resource = "horoscope_prediction/monthly/" + `${zodiacName}`
  //call dailyHoroCall method for daily predictions
  var dailyHoroData = sdkClient.dailyHoroCall(
    resource,
    zodiacName,
    timezone,
    function (error, result) {
      if (error) {
        //  console.log("Error returned!!");
        res.status(405).json({
          error
        })
      } else {
        //console.log("Response has arrived from API server --");
        //  console.log(JSON.parse(result));

        res.status(200).json({
          status: true,
          msg: "success",
          // data :result
          data: JSON.parse(result)
        })

      }
    }
  );
}


exports.ChineseHoroscope = async (req, res) => {
  // const fetch = require('node-fetch');

  var api = 'chinese_zodiac';
  var userId = '622068';
  var apiKey = '9368f495ac9208713487f09c063269e9';
  var data = {
    day: 6,
    month: 1,
    year: 2000,
    hour: 7,
    min: 45,
    lat: 19.132,
    lon: 72.342,
    tzone: 5.5,
  };

  var auth = "Basic " + Buffer.from(userId + ":" + apiKey).toString('base64');

  fetch("https://json.astrologyapi.com/v1/" + api, {
    method: "POST",
    headers: {
      "Authorization": auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

}



exports.ManglikDosh = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);

  var api = 'manglik';
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;

  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: req.body.tzone,
  };
  //https://json.astrologyapi.com/v1/match_making_report
  var request = $.ajax({
    // url: "https://json.astrologyapi.com/v1/match_making_report",
    url: "https://json.astrologyapi.com/v1/" + `${api}`,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": "Basic " + btoa(`${userId}` + ":" + `${apiKey}`),
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    // console.log(resp);
    res.status(200).json({
      status: true,
      msg: "success",
      data: resp
    })
  }, function (err) {
    // console.log(err);
    res.status(405).json({
      err
    })
  });
}

exports.kalsharpDosh = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);

  var api = 'kalsarpa_details';
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;

  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: req.body.tzone,
  };
  //https://json.astrologyapi.com/v1/match_making_report
  var request = $.ajax({
    // url: "https://json.astrologyapi.com/v1/match_making_report",
    url: "https://json.astrologyapi.com/v1/" + `${api}`,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": "Basic " + btoa(`${userId}` + ":" + `${apiKey}`),
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    // console.log(resp);
    res.status(200).json({
      status: true,
      msg: "success",
      data: resp
    })
  }, function (err) {
    // console.log(err);
    res.status(405).json({
      err
    })
  });
}

exports.PitriDosh = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);

  var api = 'pitra_dosha_report';
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;


  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: req.body.tzone,
  };
  //https://json.astrologyapi.com/v1/match_making_report
  var request = $.ajax({
    // url: "https://json.astrologyapi.com/v1/match_making_report",
    url: "https://json.astrologyapi.com/v1/" + `${api}`,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": "Basic " + btoa(`${userId}` + ":" + `${apiKey}`),
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    console.log(resp);
    res.status(200).json({
      status: true,
      msg: "success",
      data: resp
    })
  }, function (err) {
    console.log(err);
    res.status(405).json({
      err
    })
  });
}


exports.geo_detail = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);

  var api = 'geo_details';
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  var data = {
    place: req.body.place,
    maxRows: 6,

  };
  //https://json.astrologyapi.com/v1/match_making_report
  var request = $.ajax({
    // url: "https://json.astrologyapi.com/v1/match_making_report",
    url: "https://json.astrologyapi.com/v1/" + `${api}`,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": "Basic " + btoa(`${userId}` + ":" + `${apiKey}`),
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    // console.log(resp);
    res.status(200).json({
      status: true,
      msg: "success",
      data: resp
    })
  }, function (err) {
    //  console.log(err);
    res.status(405).json({
      err
    })
  });
}

exports.time_zone = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);

  var api = 'timezone';
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  var data = {
    country_code: req.body.country_code,
    isDst: true,
  };
  //https://json.astrologyapi.com/v1/match_making_report
  var request = $.ajax({
    // url: "https://json.astrologyapi.com/v1/match_making_report",
    url: "https://json.astrologyapi.com/v1/" + `${api}`,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": "Basic " + btoa(`${userId}` + ":" + `${apiKey}`),
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    //  console.log(resp);
    res.status(200).json({
      status: true,
      msg: "success",
      data: resp
    })
  }, function (err) {
    //  console.log(err);
    res.status(405).json({
      err
    })
  });
}

const axios = require('axios');
const api = 'panchang_festival';
// const userId = '622692';
// const apiKey = '220d9d0777a7645f8f62e6b03354cf51';

exports.birth_details = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);
  var api = 'birth_details';
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  const data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,
    ayanamsha: req.body.ayanamsha,
    sunrise: req.body.sunrise,
    sunset: req.body.sunset,
    userid: req.body.userid,
    astroid: req.body.astroid

  };
  const auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString("base64");


  var request = $.ajax({
    url: "https://json.astrologyapi.com/v1/" + api,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": auth,
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    const birthDetail = new BirthDetail({
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      hour: req.body.hour,
      min: req.body.min,
      lat: req.body.lat,
      lon: req.body.lon,
      tzone: 5.5,
      ayanamsha: req.body.ayanamsha,
      sunrise: req.body.sunrise,
      sunset: req.body.sunset,
      userid: req.body.userid,
      astroid: req.body.astroid,
      ayanamsha: resp.ayanamsha,
      sunrise: resp.sunrise,
      sunset: resp.sunset
    });

    birthDetail.save()
      .then(savedDetail => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: resp
        });
      })
      .catch(error => {
        res.status(500).json({
          status: false,
          msg: "Failed to save data",
          error: error.message
        });
      });
  }, function (err) {
    res.status(405).json({
      err
    });
  });
}
exports.getbirth_details = async (req, res) => {
  await BirthDetail.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.birth_detailsByAstroid = async (req, res) => {
  await BirthDetail.find({ astroid: req.params.id })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.lalkitab_horoscope = async (req, res) => {

  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);
  var api = 'lalkitab_horoscope';
  // var userId = '<Your User Id>';
  // var apiKey = '<Your Api Key>';
  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,
  };

  //var auth = "Basic " + new Buffer(userId + ":" + apiKey).toString("base64");
  const auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString("base64");


  var request = $.ajax({
    url: "https://json.astrologyapi.com/v1/" + api,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": auth,
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    //  console.log(resp);
    res.status(200).json({
      status: true,
      msg: "success",
      data: resp
    })
  }, function (err) {
    //  console.log(err);
    res.status(405).json({
      err
    })

  });
}


exports.numerologyApi = async (req, res) => {

  //var userId = '622068';
  //var apiKey = '9368f495ac9208713487f09c063269e9';


  var api = 'numero_table';
  var data = {
    name: req.body.name,
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,
  };

  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString("base64");

  fetch("https://json.astrologyapi.com/v1/" + api, {
    method: "POST",
    headers: {
      "authorization": auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => res.status(200).json({
      status: true,
      msg: "success",
      data: data
    }))
    .catch(error => res.status(405).json({ error }));
}

exports.tomorrowHoroscope = async (req, res) => {

  //Zodiac sign
  var zodiacName = req.body.zodiacName;
  var timezone = 5.5;
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  //Daily Horoscope APIs need to be called
  var resource = "sun_sign_prediction/daily/next/" + `${zodiacName}`;
  //var resource = "sun_sign_prediction/daily/next/" + zodiacName;

  //call dailyHoroCall method for daily predictions
  var dailyHoroData = sdkClient.dailyHoroCall(
    resource,
    zodiacName,
    timezone,
    function (error, result) {
      if (error) {
        // console.log("Error returned!!");
        res.status(405).json({
          error
        })

      } else {
        // console.log("Response has arrived from API server --");
        //console.log(JSON.parse(result));

        res.status(200).json({
          status: true,
          msg: "success",
          // data :result
          data: JSON.parse(result)
        })

      }
    }
  );
}

const fs = require('fs');

const downloadPdf = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://pdf.astrologyapi.com/v1/match_making_pdf',
      responseType: 'stream'
    });

    const writer = fs.createWriteStream('match_making.pdf');

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    //  console.log(error);
  }
}

downloadPdf();

exports.basicPanchang = async (req, res) => {
  var api = 'basic_panchang';
  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: 12,
    min: 00,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,
  };
  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');

  try {
    const response = await fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.status(200).json({
      status: true,
      msg: "success",
      data: result
    });
  } catch (error) {
    res.status(405).json({
      error
    });
  }
};
exports.taraot_prediction = async (req, res) => {
  var api = 'tarot_predictions';
  var data = {
    love: 13,
    career: 2,
    finance: 54
  };
  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');

  try {
    const response = await fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.status(200).json({
      status: true,
      msg: "success",
      data: result
    });
  } catch (error) {
    res.status(405).json({
      error
    });
  }
};


exports.lalkitab_debts = async (req, res) => {
  var api = 'lalkitab_debts';


  var data = {
    day: 6,
    month: 1,
    year: 2000,
    hour: 7,
    min: 45,
    lat: 19.132,
    lon: 72.342,
    tzone: 5.5,
  };
  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');

  try {
    const response = await fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.status(200).json({
      status: true,
      msg: "success",
      data: result
    });
  } catch (error) {
    res.status(405).json({
      error
    });
  }
};

exports.todayPanchang = async (req, res) => {
  var api = 'basic_panchang';

  var now = new Date();
  var data = {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    hour: now.getHours(),
    min: now.getMinutes(),
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,
  };

  // var auth = "Basic " + new Buffer(userId + ":" + apiKey).toString("base64");
  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');


  try {
    const response = await fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.status(200).json({
      status: true,
      msg: "success",
      data: result
    });
  } catch (error) {
    res.status(405).json({
      error
    });
  }

};

exports.lalkitab_houses = async (req, res) => {
  var api = 'lalkitab_houses';


  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,
  };

  // var auth = "Basic " + new Buffer(userId + ":" + apiKey).toString("base64");
  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');


  try {
    const response = await fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.status(200).json({
      status: true,
      msg: "success",
      data: result
    });
  } catch (error) {
    res.status(405).json({
      error
    });
  }

};

exports.lalkitab_planets = async (req, res) => {
  var api = 'lalkitab_planets';


  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,

  };


  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');


  try {
    const response = await fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.status(200).json({
      status: true,
      msg: "success",
      data: result
    });
  } catch (error) {
    res.status(405).json({
      error
    });
  }

};
exports.lalkitab_remedies = async (req, res) => {
  ;
  var api = 'lalkitab_remedies/:planet_name';


  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,

  };


  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');


  try {
    const response = await fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.status(200).json({
      status: true,
      msg: "success",
      data: result
    });
  } catch (error) {
    res.status(405).json({
      error
    });
  }

};

exports.basic_gem_suggestion = async (req, res) => {
  ;
  var api = 'basic_gem_suggestion';


  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,

  };


  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');


  try {
    const response = await fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.status(200).json({
      status: true,
      msg: "success",
      data: result
    });
  } catch (error) {
    res.status(405).json({
      error
    });
  }

};

exports.panchang_festival = async (req, res) => {
  ;
  var api = 'panchang_festival';


  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,

  };


  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');


  try {
    const response = await fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.status(200).json({
      status: true,
      msg: "success",
      data: result
    });
  } catch (error) {
    res.status(405).json({
      error
    });
  }

};

// exports.pdf_report = async (req, res) => {

//   // Request data - replace with your own values
//   const birthDetails = {
//     date: '1990-01-01',
//     time: '12:00:00',
//     latitude: '51.5074',
//     longitude: '0.1278',
//     timezone: 'Europe/London',
//     name: 'John Doe'
//   };
//   const options = {
//     borderStyle: 'dashed',
//     footerLinks: ['https://example.com', 'https://example.net'],
//     lordGaneshaStyle: 'circle'
//   };

//   // Make API request
//   axios.post('https://pdf.astrologyapi.com/v1/basic_horoscope_pdf', {
//     birth_details: birthDetails,
//     options: options
//   }, {
//     headers: {
//       'Authorization': 'Bearer9368f495ac9208713487f09c063269e9',
//       'Content-Type': 'application/json'
//     }

//   }).then(response => {
//     console.log(response.data); // Contains the PDF URL
//   }).catch(error => {
//     console.log(error);
//   });
// }

exports.pdf_report = async (req, res) => {

  try {
    const birthDetails = {
      date: '1990-01-01',
      time: '12:00:00',
      latitude: '51.5074',
      longitude: '0.1278',
      timezone: 'Europe/London',
      name: 'John Doe'
    };
    const options = {
      borderStyle: 'dashed',
      footerLinks: ['https://example.com', 'https://example.net'],
      lordGaneshaStyle: 'circle'
    };
    // Check if variables are defined
    if (!birthDetails || !options) {
      throw new Error('Birth details and options are required');
    }

    // Make API request
    const response = await axios.post('https://pdf.astrologyapi.com/v1/basic_horoscope_pdf', {
      birth_details: birthDetails,
      options: options
    }, {
      headers: {
        'Authorization': 'Bearer ByVOIaODH57QRVi6CqswHXGlcpDvj7tZBRoorY',
        'Content-Type': 'application/json'
      }
    });

    // Return response
    res.status(200).json({
      status: true,
      msg: "success",
      data: response.data
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      status: false,
      msg: "An error occurred",
      error: error.message
    });
  }

}

exports.planetDasha = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);
  var chart_id = req.params.chart_id; // Assuming planet_name is passed as a parameter

  var api = 'planets';
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,

    apiName: "planets"
  };

  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');

  var request = $.ajax({
    url: "https://json.astrologyapi.com/v1/" + api,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": auth,
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    const newHoroChart = new HoroChart({
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      hour: req.body.hour,
      min: req.body.min,
      lat: req.body.lat,
      lon: req.body.lon,
      tzone: 5.5,
      apiName: "planets",

    });

    newHoroChart.save()
      .then(savedDetail => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: resp,
          userid: req.body.userid,
          astroid: req.body.astroid
        });
      })
      .catch(error => {
        res.status(500).json({
          status: false,
          msg: "Failed to save data",
          error: error.message
        });
      });
  }, function (err) {
    res.status(405).json({
      err
    });
  });

};
exports.yogini_dasha = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);
  var chart_id = req.params.chart_id; // Assuming planet_name is passed as a parameter

  var api = 'major_yogini_dasha';
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,
    userid: req.body.userid,
    astroid: req.body.astroid,
    apiName: "yogini_dasha"
  };

  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');

  var request = $.ajax({
    url: "https://json.astrologyapi.com/v1/" + api,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": auth,
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    const newHoroChart = new HoroChart({
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      hour: req.body.hour,
      min: req.body.min,
      lat: req.body.lat,
      lon: req.body.lon,
      tzone: 5.5,
      apiName: "yogini_dasha",
      userid: req.body.userid,
      astroid: req.body.astroid
    });

    newHoroChart.save()
      .then(savedDetail => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: resp,
          userid: req.body.userid,
          astroid: req.body.astroid
        });
      })
      .catch(error => {
        res.status(500).json({
          status: false,
          msg: "Failed to save data",
          error: error.message
        });
      });
  }, function (err) {
    res.status(405).json({
      err
    });
  });

};

exports.VimshottariDasha = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);
  var chart_id = req.params.chart_id; // Assuming planet_name is passed as a parameter

  var api = 'current_vdasha';
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,
    userid: req.body.userid,
    astroid: req.body.astroid,
    apiName: "VimshottariDasha"
  };

  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');

  var request = $.ajax({
    url: "https://json.astrologyapi.com/v1/" + api,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": auth,
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    const newHoroChart = new HoroChart({
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      hour: req.body.hour,
      min: req.body.min,
      lat: req.body.lat,
      lon: req.body.lon,
      tzone: 5.5,
      apiName: "VimshottariDasha",
      userid: req.body.userid,
      astroid: req.body.astroid
    });

    newHoroChart.save()
      .then(savedDetail => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: resp,
          userid: req.body.userid,
          astroid: req.body.astroid
        });
      })
      .catch(error => {
        res.status(500).json({
          status: false,
          msg: "Failed to save data",
          error: error.message
        });
      });
  }, function (err) {
    res.status(405).json({
      err
    });
  });

};


exports.chardasha = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);
  var chart_id = req.params.chart_id; // Assuming planet_name is passed as a parameter

  var api = 'current_chardasha';
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,

    apiName: "chardasha"
  };

  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');

  var request = $.ajax({
    url: "https://json.astrologyapi.com/v1/" + api,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": auth,
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    const newHoroChart = new HoroChart({
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      hour: req.body.hour,
      min: req.body.min,
      lat: req.body.lat,
      lon: req.body.lon,
      tzone: 5.5,
      apiName: "chardasha",
      userid: req.body.userid,
      astroid: req.body.astroid
    });

    newHoroChart.save()
      .then(savedDetail => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: resp,
          userid: req.body.userid,
          astroid: req.body.astroid
        });
      })
      .catch(error => {
        res.status(500).json({
          status: false,
          msg: "Failed to save data",
          error: error.message
        });
      });
  }, function (err) {
    res.status(405).json({
      err
    });
  });

};


exports.ashtakvarga = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);
  var planetName = req.params.planetName; // Assuming planet_name is passed as a parameter

  var api = 'planet_ashtak/' + planetName;
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,
    apiName: "ashtakvarga"
  };

  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');

  var request = $.ajax({
    url: "https://json.astrologyapi.com/v1/" + api,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": auth,
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    const newHoroChart = new HoroChart({
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      hour: req.body.hour,
      min: req.body.min,
      lat: req.body.lat,
      lon: req.body.lon,
      tzone: 5.5,
      apiName: "ashtakvarga",

    });

    newHoroChart.save()
      .then(savedDetail => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: resp,
          userid: req.body.userid,
          astroid: req.body.astroid
        });
      })
      .catch(error => {
        res.status(500).json({
          status: false,
          msg: "Failed to save data",
          error: error.message
        });
      });
  }, function (err) {
    res.status(405).json({
      err
    });
  });

};


exports.varshaphal_details = async (req, res) => {
  ;
  var api = 'varshaphal_planets';

  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,

  };


  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');


  try {
    const response = await fetch("https://json.astrologyapi.com/v1/" + api, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.status(200).json({
      status: true,
      msg: "success",
      data: result
    });
  } catch (error) {
    res.status(405).json({
      error
    });
  }

};


exports.horo_chart = async (req, res) => {
  var jsdom = require('jsdom');
  const { JSDOM } = jsdom;
  const { window } = new JSDOM();
  const { document } = (new JSDOM('')).window;
  global.document = document;

  var $ = jQuery = require('jquery')(window);
  var chart_id = req.params.chart_id; // Assuming planet_name is passed as a parameter

  var api = 'horo_chart/' + chart_id;
  var userId = process.env.USERID;
  var apiKey = process.env.APIKEY;
  var data = {
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    hour: req.body.hour,
    min: req.body.min,
    lat: req.body.lat,
    lon: req.body.lon,
    tzone: 5.5,

    apiName: "horo_chart"
  };

  var auth = "Basic " + Buffer.from(process.env.USERID + ":" + process.env.APIKEY).toString('base64');

  var request = $.ajax({
    url: "https://json.astrologyapi.com/v1/" + api,
    method: "POST",
    dataType: 'json',
    headers: {
      "authorization": auth,
      "Content-Type": 'application/json'
    },
    data: JSON.stringify(data)
  });

  request.then(function (resp) {
    const newHoroChart = new HoroChart({
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      hour: req.body.hour,
      min: req.body.min,
      lat: req.body.lat,
      lon: req.body.lon,
      tzone: 5.5,
      apiName: "horo_chart",

    });

    newHoroChart.save()
      .then(savedDetail => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: resp,
          userid: req.body.userid,
          astroid: req.body.astroid
        });
      })
      .catch(error => {
        res.status(500).json({
          status: false,
          msg: "Failed to save data",
          error: error.message
        });
      });
  }, function (err) {
    res.status(405).json({
      err
    });
  });
  // try {
  //   const response = await fetch("https://json.astrologyapi.com/v1/" + api, {
  //     method: "POST",
  //     headers: {
  //       "Authorization": auth,
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   const result = await response.json();
  //   res.status(200).json({
  //     status: true,
  //     msg: "success",
  //     data: result
  //   });
  // } catch (error) {
  //   res.status(405).json({
  //     error
  //   });
  // }

};

exports.horo_chart_list = async (req, res) => {
  await HoroChart.find({ "apiName": "horo_chart" })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.ashtakvarga_list = async (req, res) => {
  await HoroChart.find({ "apiName": "ashtakvarga" })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.planets_list = async (req, res) => {
  await HoroChart.find({ "apiName": "planets" })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.yogini_dasha_list = async (req, res) => {
  await HoroChart.find({ "apiName": "yogini_dasha" })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.VimshottariDasha_list = async (req, res) => {
  await HoroChart.find({ "apiName": "VimshottariDasha" })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
