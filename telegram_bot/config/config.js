import path from "path";
import dotenv from "dotenv";

var config = {};
const __dirname = path.resolve();

dotenv.config({ path: path.join(__dirname, "config/.env") });
const env = process.env;

config.token = env.TOKEN;
config.chat_id = env.CHAT_ID;
config.UPBIT_OPEN_API_ACCESS_KEY = env.UPBIT_OPEN_API_ACCESS_KEY
config.UPBIT_OPEN_API_SECRET_KEY = env.UPBIT_OPEN_API_SECRET_KEY
config.UPBIT_OPEN_API_SERVER_URL = env.UPBIT_OPEN_API_SERVER_URL


export default config;
