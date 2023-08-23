const { Telegraf, Markup } = require("telegraf")
// add message
const { message } = require('telegraf/filters');
// BOT_TOKEN is env var in netlify
const bot = new Telegraf(process.env.BOT_TOKEN)

const keyboard = Markup.inlineKeyboard([
	Markup.button.login("Login", "https://www.google.com/", {
		bot_username: "my_bot",
		request_write_access: true,
	}),
	Markup.button.url("❤️", "http://telegraf.js.org"),
	Markup.button.callback("Delete", "delete"),
]);

bot.start(ctx => ctx.reply("Hello", keyboard));
bot.action("delete", ctx => ctx.deleteMessage());



// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
// essential syntax that is forgotten by all tutorials

exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body))
    return { statusCode: 200, body: "" }
  } catch (e) {
    console.error("error in handler:", e)
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
  }
}