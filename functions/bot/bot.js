const { Telegraf, Markup } = require("telegraf")
// add message
const { message } = require('telegraf/filters');
// BOT_TOKEN is env var in netlify
const bot = new Telegraf(process.env.BOT_TOKEN)

const keyboard = Markup.keyboard([
	Markup.button.pollRequest("Create poll", "regular"),
	Markup.button.pollRequest("Create quiz", "quiz"),
]);


bot.on("poll", ctx => console.log("Poll update", ctx.poll));
bot.on("poll_answer", ctx => console.log("Poll answer", ctx.pollAnswer));

bot.start(ctx => ctx.reply("supported commands: /poll /quiz", keyboard));

bot.command("poll", ctx =>
	ctx.replyWithPoll("Your favorite math constant", ["x", "e", "π", "φ", "γ"], {
		is_anonymous: false,
	}),
);
bot.command("quiz", ctx =>
	ctx.replyWithQuiz("2b|!2b", ["True", "False"], { correct_option_id: 0 }),
);

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