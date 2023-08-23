const { Telegraf, Markup } = require("telegraf")
// add message
const { message } = require('telegraf/filters');
// BOT_TOKEN is env var in netlify
const bot = new Telegraf(process.env.BOT_TOKEN)

process.env.PROVIDER_TOKEN = "284685063:TEST:ZDM5ODYyODhiMzM1"

if (process.env.PROVIDER_TOKEN === undefined) {
	throw new TypeError("PROVIDER_TOKEN must be provided!");
}
// if (process.env.PROVIDER_TOKEN === undefined) {
// 	throw new TypeError("PROVIDER_TOKEN must be provided!");
// }

const invoice = {
	provider_token: process.env.PROVIDER_TOKEN,
	start_parameter: "time-machine-sku",
	title: "Working Time Machine",
	description:
		"Want to visit your great-great-great-grandparents? Make a fortune at the races? Shake hands with Hammurabi and take a stroll in the Hanging Gardens? Order our Working Time Machine today!",
	currency: "usd",
	photo_url:
		"https://erkelzaar.tsudao.com/models/perrotta/TIME_MACHINE.jpg",
	is_flexible: true,
	prices: [
		{ label: "Working Time Machine", amount: 4200 },
		{ label: "Gift wrapping", amount: 1000 },
	],
	payload: JSON.stringify({
		coupon: "BLACK FRIDAY",
	}),
};

const shippingOptions = [
	{
		id: "unicorn",
		title: "Unicorn express",
		prices: [{ label: "Unicorn", amount: 2000 }],
	},
	{
		id: "slowpoke",
		title: "Slowpoke mail",
		prices: [{ label: "Slowpoke", amount: 100 }],
	},
];

const replyOptions = Markup.inlineKeyboard([
	Markup.button.pay("💸 Buy"),
	Markup.button.url("❤️", "http://telegraf.js.org"),
]);

bot.start(ctx => ctx.replyWithInvoice(invoice));
bot.command("buy", ctx => ctx.replyWithInvoice(invoice, replyOptions));
bot.on("shipping_query", ctx =>
	ctx.answerShippingQuery(true, shippingOptions, undefined),
);
bot.on("pre_checkout_query", ctx => ctx.answerPreCheckoutQuery(true));
bot.on("successful_payment", () => console.log("Woohoo"));




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