const request = require("request");

const searchImage = (keyword, callback) => {
  const url =
    "https://api.unsplash.com/search/photos?query=" +
    keyword +
    "&client_id=" +
    process.env.CLIENT_ID;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect with the api", undefined);
    } else if (body.error) {
      callback("Unable to find images", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = searchImage;
