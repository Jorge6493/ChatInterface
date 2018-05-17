# ChatInterface
Example of usage of botmaster package to connect to different chat interfaces in Bluemix

Currently
Facebook Messenger
Telegram

Planned
Twitter

# Requirements
.env file with variables
Facebook
PAGE_ACCESS_TOKEN 
VERIFY_TOKEN
APP_SECRET

Telegram
TELEGRAM_AUTH_TOKEN

# Deploy to bluemix
Install bluemix CLI
run commands
bluemix api SERVER
bluemix login -u USER -p PASSWORD -o "ORGANIZATION" -s "SPACE"
bluemix app push APPNAME


