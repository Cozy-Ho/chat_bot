import dotenv from "dotenv";
import Minio from "minio";

dotenv.config();

let config = process.env;
let bucketName = "uploads";

const minioClient = new Minio.Client({
  endPoint: config.END_POINT,
  port: parseInt(config.PORT, 10),
  useSSL: false,
  accessKey: config.ACC_KEY,
  secretKey: config.ACC_SEC_KEY
});

function upload() {
  minioClient.putObject(
    "test",
    files.image.name,
    files.image.data,
    function (error, etag) {
      if (error) {
        return console.log(error);
      }
      res.send(`https://play.minio.io:9000/test/${files.image.name}`);
    }
  );
}

export default {
  minioClient,
  upload
};
