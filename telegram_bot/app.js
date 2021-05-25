import config from "./config/config.js";
import request from "request";
import uuidv4 from "uuid/v4.js";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import fs from "fs";
import fetch from "node-fetch";

const bot_token = config.token;
const chatId = config.chat_id;

const bot = new TelegramBot(bot_token, {polling: true});

import jwt from "jsonwebtoken";

const access_key = config.UPBIT_OPEN_API_ACCESS_KEY
const secret_key = config.UPBIT_OPEN_API_SECRET_KEY
const server_url = config.UPBIT_OPEN_API_SERVER_URL

const payload = {
    access_key: access_key,
    nonce: uuidv4(),
}
const token = jwt.sign(payload, secret_key)

bot.on("message",(msg)=>{
    console.log(msg);
    // 코인 선택 가능하도록 개선.
    if(msg == "/chart" || msg == "/차트"){
        console.log("get chart...");
        makeChart().then((res)=>{
            console.log(res);
            bot.sendPhoto(chatId, res);
            
        });
    }else{
        sendMsg("received : "+msg.text +" >_< ");
    }
})

cron.schedule('1/* * * * *', function(){
    getCandle(); 
});

function getCandle(){
    let options = {
        method: "GET",
        url: server_url + '/v1/accounts',
        headers: {Authorization: `Bearer ${token}`},
    }
    request(options, (error, response, body) => {
        if (error) throw new Error(error)
        // console.log(JSON.parse(body));
        let data = JSON.parse(body);
        let text= "";
        console.log(data);
        for(let i=0; i<data.length;i++){
            text += `
            자산: ${data[i].currency}
            금액: ${data[i].balance}
            lock?: ${data[i].locked}
            매수평균: ${data[i].avg_buy_price}
            `
        }

        // console.log(text);
        sendMsg(text);

    })
}


function sendMsg(msg){
    bot.sendMessage(chatId,msg);
}