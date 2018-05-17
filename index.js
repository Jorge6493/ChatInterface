const Botmaster = require('botmaster');
const express = require('express'); 
const bodyParser = require('body-parser'); // parser for post requests
require('dotenv').config({silent: true});
var vcapServices = require('vcap_services');
const config = require('./config/config');

var app = express();
// set up our express application
app.use(bodyParser.json()); // support json encoded bodies
const expServer = app.listen(config.port, function() {
    console.log("Server starting on " +config.port);
  });
  expServer.on('listening', () => {
    console.log('My express app is listening and its server is used in Botmaster');
  });
//botmaster settings
  const botmasterSettings = {
    server: expServer
  };
//creating botmaster
const botmaster = new Botmaster(botmasterSettings);

const MessengerBot = require('botmaster-messenger');
const TelegramBot = require('botmaster-telegram');

//settings
//facebook messenger settings
const messengerSettings = {
    credentials: {
      verifyToken: process.env.VERIFY_TOKEN,
      pageToken: process.env.PAGE_ACCESS_TOKEN,
      fbAppSecret: process.env.APP_SECRET
    },
    
    webhookEndpoint: 'webhook', // botmaster will mount this webhook on https://Your_Domain_Name/messenger/webhook
  };
//telegram settings
const telegramSettings = {
  credentials: {
    authToken: process.env.TELEGRAM_AUTH_TOKEN,
  },
  webhookEndpoint: '/webhookTelegram/',
};

//creating bots  
const messengerBot = new MessengerBot(messengerSettings);
const telegramBot = new TelegramBot(telegramSettings);

//add bots to botmaster
botmaster.addBot(messengerBot);
botmaster.addBot(telegramBot);

//middleware
botmaster.use({
    type: 'incoming',
    name: 'my-incoming-middleware',
    controller: (bot, update) => {
      console.log("Update" + update);
      return bot.reply(update, 'hello');
    }
  });