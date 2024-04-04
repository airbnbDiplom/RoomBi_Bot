import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { COMMANDS } from "./command.js";
import { myMessage } from "./services/servicesMessage.js";
import { myCallbackQuery } from "./services/callbackService.js";
dotenv.config();
const bot = new TelegramBot(process.env.TG_TOKEN, {
  webHook: {
    port: 80,
    // port: process.env.PORT,
  },
});
bot.setWebHook(
  `https://88a0-195-230-115-58.ngrok-free.app/bot${process.env.TG_TOKEN}`
);
bot.setMyCommands(COMMANDS);

bot.on("callback_query", async (query) => {
  await myCallbackQuery(query, bot);
});

bot.on("message", async (msg) => {
  await myMessage(msg, bot);
});
