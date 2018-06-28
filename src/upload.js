const firebaseSDK = require('../config/firebase-adminsdk/setscope-private-fund-firebase-adminsdk.json');
const keyFilename = "config/firebase-adminsdk/setscope-private-fund-firebase-adminsdk.json";
const projectId = firebaseSDK.project_id
const bucketName = `${projectId}.appspot.com`;

const mime = require('mime');
const gcs = require('@google-cloud/storage')({
  projectId,
  keyFilename
});

const bucket = gcs.bucket(bucketName);

const filePath = `resources/testUpload/npm.jpg`;
const uploadTo = `img/npm.jpg`;
const fileMime = mime.getType(filePath);

bucket.upload(filePath, {
  destination: uploadTo,
  public: true,
  metadata: { contentType: fileMime, cacheControl: "public, max-age=300" }
}, function (err, file) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`http://storage.googleapis.com/${bucketName}/${encodeURIComponent(uploadTo)}`);
});


