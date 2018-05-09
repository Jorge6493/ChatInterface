const Botmaster = require('botmaster');
//const express = require('express'); 
//const bodyParser = require('body-parser'); // parser for post requests
require('dotenv').config({silent: true});
var vcapServices = require('vcap_services');
const config = require('./config/config');

//var app = express();
// set up our express application
//app.use(bodyParser.json()); // support json encoded bodies
/*app.listen(config.port, function() {
    console.log("Server starting on " +config.port);
  }); */

const botmaster = new Botmaster();

const MessengerBot = require('botmaster-messenger');

const messengerSettings = {
    credentials: {
      verifyToken: process.env.VERIFY_TOKEN,
      pageToken: process.env.PAGE_ACCESS_TOKEN,
      fbAppSecret: process.env.APP_SECRET
    },
    
    webhookEndpoint: 'webhook', // botmaster will mount this webhook on https://Your_Domain_Name/messenger/webhook
  };
  

const messengerBot = new MessengerBot(messengerSettings);
messengerBot.app.listen(config.port, function() {
    console.log("Server starting on " + config.port);
  }); 
console.log("verify token: " + messengerSettings.credentials.verifyToken);
console.log("pageaccess: "+ messengerSettings.credentials.pageToken);
console.log ("fbappSecret: "+ messengerSettings.credentials.fbAppSecret);


botmaster.addBot(messengerBot);
botmaster.use({
    type: 'incoming',
    name: 'my-incoming-middleware',
    controller: (bot, update) => {
      console.log("Update" + update);
      return bot.reply(update, 'hello');
    }
  });