const axios = require("axios");
require('dotenv').config({path: `./.env`});

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;


exports.getPosts = async (req, res) => {
  var data = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 0,
    "method": "socialinsider_api.get_posts",
    "params": {
      "id": req.body.id,
      "profile_type": req.body.profile_type,
      "date": {
        "start": req.body.start,
        "end": req.body.end,
        "timezone": req.body.timezone
      },
      "from": 0,
      "size": 10
    }
  });
  
  var config = {
    method: 'post',
    url: apiUrl,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${apiKey}`
    },
    data : data
  };
  console.log(config, "---HERE----")
  
  axios(config)
  .then((response) => {
    return res.status(200).send({ status: "data fetched", message: response.data });
  })
  .catch((error) => {
    console.log(error);
    return res.status(500).send({ status: "error", message: err.message });
  });

}


exports.getBrands = async (req, res) => {

  var data = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 0,
    "method": "socialinsider_api.get_brands",
    "params": {
      "projectname": "API_test"
    }
  });
  
  var config = {
    method: 'post',
    url: apiUrl,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${apiKey}`
    },
    data : data
  };
  
  axios(config)
  .then((response) => {
    console.log("HERE", response.data)
    return res.status(200).send({ status: "data fetched", message: response.data });
  })
  .catch((error) => {
    console.log(error);
    return res.status(500).send({ status: "error", message: err.message });
  });
}