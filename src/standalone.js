import uuidv4 from "uuid/v4.js";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import dotenv from "dotenv";
import command from "./commands/index.js";
import minioClient from "./databases/minio.js";

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
    let comm = msg.substring(1);
    sendMsg(command.execute(comm));
  } else {
    sendMsg("received : " + msg + "\n 아직 개발중이얌 >_< ");
  }
}

function sendMsg(msg) {
  bot.sendMessage(chatId, msg);
}
