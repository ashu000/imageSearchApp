const { google } = require("googleapis");
const drive = google.drive("v3");
const path = require("path");
const fs = require("fs");

const key = require("../../credentials.json");

const jwtToken = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/drive"],
  null
);

jwtToken.authorize((authErr) => {
  if (authErr) {
    console.log("Err", authErr);
    return;
  } else {
    console.log("Auth done");
  }
});

// upload file in specific folder
var folderId = "1zcfTKK5aGb1N92AXzdsPYdpPrQ8g6qwg";
var fileMetadata = {
  name: "image.jpg",
  parents: [folderId],
};
var media = {
  mimeType: "img/jpg",
  body: fs.createReadStream(path.join(__dirname, "../image.jpg")),
};

drive.files.create(
  {
    auth: jwtToken,
    resource: fileMetadata,
    media: media,
    fields: "id",
  },
  function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log("File Id: ", file.data.id);
    }
  }
);
