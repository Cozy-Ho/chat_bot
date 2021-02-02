import config from "./config/config";
import request from "request";
import uuidv4 from "uuid/v4";
import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

const bot_token = config.token;
const chatId = config.chat_id;

const bot = new TelegramBot(bot_token, {polling: true});

const sign = require('jsonwebtoken').sign

const access_key = config.UPBIT_OPEN_API_ACCESS_KEY
const secret_key = config.UPBIT_OPEN_API_SECRET_KEY
const server_url = config.UPBIT_OPEN_API_SERVER_URL

const payload = {
    access_key: access_key,
    nonce: uuidv4(),
}

const token = sign(payload, secret_key)

// const options = {
//     method: "GET",
//     url: server_url + "/v1/accounts",
//     headers: {Authorization: `Bearer ${token}`},
// }

// request(options, (error, response, body) => {
//     if (error) throw new Error(error)
//     console.log(body)
//     sendMsg(body);
// })

cron.schedule('0 * * * *', function(){
    getCandle();
})

function getCandle(){
    let options = {
        method: "GET",
        url: server_url + '/v1/candles/minutes/30',
        qs: {market: 'KRW-BTC', count: '2'},
        headers: {Authorization: `Bearer ${token}`},
    }
    request(options, (error, response, body) => {
        if (error) throw new Error(error)
        console.log(JSON.parse(body));
        let data = JSON.parse(body);
        let text= "";
        for(let i=0; i<data.length;i++){
            text += `\n일자: ${data[i].candle_date_time_kst}\n시가: ${data[i].opening_price}\n고가: ${data[i].high_price}\n저가: ${data[i].low_price}\n종가: ${data[i].trade_price}`
        }

        console.log(text);
        sendMsg(text);

    })
}


function sendMsg(msg){
    bot.sendMessage(chatId,msg);
}