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

cron.schedule('0 * * * *', function(){
    getCandle(); 
})


function makeChart(){
    return new Promise((resolve, reject)=>{
        let chart_data = {
            type: 'bar',
            data: {
              labels: [],
              datasets: [
                {
                  label: '',
                  backgroundColor: '',
                  borderColor: '',
                  borderWidth: 1,
                  data: [],
                },
                {
                    label: '',
                    backgroundColor: '',
                    borderColor: '',
                    borderWidth: 1,
                    data: [],
                },
              ],
            },
            options: {
              responsive: true,
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'BTC 60 min Chart',
              },
              scales: {
                yAxes: [{
                  ticks: {
                    min: 35000000,
                  }
                }]
            }
            },
        }
        let options = {
            method: "GET",
            url: server_url + '/v1/candles/minutes/60',
            qs: {market: 'KRW-BTC', count: '24'},
            headers: {Authorization: `Bearer ${token}`},
        }
        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            // console.log(JSON.parse(body));
            let data = JSON.parse(body);
            chart_data.data.datasets[0].label="BTC 최고 최저";
            chart_data.data.datasets[0].backgroundColor="rgba(255, 99, 132, 0.5)";
            chart_data.data.datasets[0].borderColor="rgb(255, 99, 132)";
    
            chart_data.data.datasets[1].label="BTC 시가 종가";
            chart_data.data.datasets[1].backgroundColor="rgba(54, 162, 235, 0.5)";
            chart_data.data.datasets[1].borderColor="rgb(54, 162, 235)";
            for(let i=0; i<data.length;i++){
                chart_data.data.labels.push(data[i].candle_date_time_kst);
                chart_data.data.datasets[0].data.push([data[i].high_price, data[i].low_price]);
                chart_data.data.datasets[1].data.push([data[i].opening_price, data[i].trade_price]);
            }
            resolve(chart_data);
            
        })
    })
}


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