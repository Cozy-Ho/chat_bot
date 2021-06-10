import uuidv4 from "uuid/v4.js";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();
let config = process.env;
const bot_token = config.BOT_TOKEN;
let chatId = config.CHAT_ID || "";

const bot = new TelegramBot(bot_token, { polling: true });

bot.on("message", msg => {
    console.log(msg);
    chatId = msg.chat.id;
    sendMsg("received : " + msg.text + "\n 아직 개발중이얌 >_< ");
});

cron.schedule("1/* * * * *", function () {
    // getCandle();
});

function sendMsg(msg) {
    bot.sendMessage(chatId, msg);
}
