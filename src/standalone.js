import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import dotenv from "dotenv";
import { parseCommand } from "./commands/index.js";
import { connect } from "./databases/mongo.js";
// import minioClient from "./databases/minio.js";

await connect();
dotenv.config();
let config = process.env;
let fileDownloadDir = "";

const bot_token = config.BOT_TOKEN;
let chatId = config.CHAT_ID || "";

const bot = new TelegramBot(bot_token, { polling: true });

bot.on("message", msg => {
  chatId = msg.chat.id;
  console.log(msg);
  if (msg.text) {
    parseMsg(msg.text);
  }
  if (msg.photo.length > 0) {
    bot
      .downloadFile(msg.photo[msg.photo.length - 1].file_id, "./")
      .then(res => {
        console.log(res);
        sendMsg("downloaded!!");
      })
      .catch(err => {
        console.log(err);
        sendMsg("download failed!!");
      });
  }
});

cron.schedule("1/* * * * *", function () {
  // getCandle();
});

function parseMsg(msg) {
  if (msg.startsWith("!")) {
    let args = msg.split(" ");

    parseCommand(args)
      .then(res => {
        sendMsg(res);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    // sendMsg("received : " + msg + "\n 아직 개발중이얌 >_< ");
  }
}

function sendMsg(msg) {
  bot.sendMessage(chatId, msg);
}
