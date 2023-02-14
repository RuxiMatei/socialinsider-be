const axios = require("axios");
require('dotenv').config({
  path: `./.env`
});
let utils = require('./utils');


const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

exports.getPostsForAllProfiles = async (req, res) => {
  let profiles = req.body.profiles;
  console.log(profiles)
  let profileNames = [];
  var profileNamesShort = [];
  let profileIds = [];
  let profileConfigs = [];
  let start = req.body.start;
  let end = req.body.end;

  let rawPosts = [];
  let posts = [];

  let promises = [];

  profiles.forEach(profile => {
    profileNames.push(profile.profile_type);
    profileNamesShort.push(profile.profile_type.substring(0, profile.profile_type.indexOf("_")));
    profile.short_name = profile.profile_type.substring(0, profile.profile_type.indexOf("_"));
    profileIds.push(profile.id);

    profileConfigs.push(this.getConfig(profile.id, profile.profile_type,
      start, end, "Europe/London"));
  });

  for (i = 0; i < profiles.length; i++) {
    promises.push(
      axios(profileConfigs[i]).then((response) => {
        rawPosts.push(response.data.resp.posts);
      })
    )
  }
  Promise.all(promises)
    .then(async () => {

      rawPosts.forEach(rawPost => {
        let j = 0;
        for (let i = 0; i < rawPost.length; i++) {
          rawPost[i].profile_short_name = profileNamesShort[j];
        }
        j++;
      })
      posts = rawPosts.flat();

      posts.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      }).splice(10, posts.length);

      for (let i = 0; i < posts.length; i++) {
        posts[i].pictureBlob = await utils.getImgGrayscale(posts[i].picture)
      }
      // let x = await utils.getImgGrayscale("https://media.wired.com/photos/5b899992404e112d2df1e94e/master/pass/trash2-01.jpg")
      res.status(200).send(posts);
    }).catch(err => {
      res.status(500).send({status: "error", message: err})
    })

}

exports.getConfig = (id, profile_type, start, end, timezone) => {
  var data = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 0,
    "method": "socialinsider_api.get_posts",
    "params": {
      "id": id,
      "profile_type": profile_type,
      "date": {
        "start": start,
        "end": end,
        "timezone": timezone
      },
      "from": 0,
      "size": 5
    }
  });

  var config = {
    method: 'post',
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    data: data
  };

  return config;
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
    data: data
  };

  axios(config)
    .then((response) => {
      console.log("HERE", response.data)
      return res.status(200).send({
        status: "data fetched",
        message: response.data
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: err.message
      });
    });
}