# 

## ref

https://blog.devgenius.io/deploying-a-telegram-bot-developed-with-telegraf-js-aef341ec0d4f

start with a repo on github
run in dir $ npm init -y
$ npm install telegraf
telegraf is a fraemework for node.js
$ npm install netlify-lambda
tool to build & serve lambda fn

netlify.toml is a config file used by Netlify

create a dir functions/bot
create a basic bot inside of the dir functions/bot
The aws event handler is critical to success.
create .gitignore with 'node_modules'
push to github
deploy in netlify
add bot_token to env variables of netlify
tell telegram to forward all messages sent by users to the bot to the correct url

https://api.telegram.org/bot6566125569:AAGeMiYhJD47XwV6onwWqZl3sQqjhgCa0OM/setWebhook?url=https://stellular-jalebi-f3bb87.netlify.app/api/bot

result should be 
{"ok":true,"result":true,"description":"Webhook is already set"}

Success!