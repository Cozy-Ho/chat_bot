import dotenv from "dotenv";
import Minio from "minio";

dotenv.config();

let config = process.env;
// let bucketName = "uploads";

const minioClient = new Minio.Client({
  endPoint: config.MINIO_URI,
  port: parseInt(config.PORT, 10),
  useSSL: false,
  accessKey: config.MINIO_KEY,
  secretKey: config.MINIO_SEC
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
      return "success";
    }
  );
}

export default {
  minioClient,
  upload
};
