import path from "path";
import dotenv from "dotenv";

var config = {};

dotenv.config({ path: path.join(__dirname, ".env") });
const env = process.env;

config.token = env.TOKEN;

module.exports = config;
