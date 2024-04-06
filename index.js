import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { COMMANDS } from "./command.js";
import { myMessage } from "./services/servicesMessage.js";
import { myCallbackQuery } from "./services/callbackService.js";
import { filterLocationCard } from "./function/callbackQueryFunction.js";
dotenv.config();
const bot = new TelegramBot(process.env.TG_TOKEN, {
  webHook: {
    // port: 80,
    port: process.env.PORT,
  },
});
bot.setWebHook(`https://roombi-bot.onrender.com/bot${process.env.TG_TOKEN}`);
bot.setMyCommands(COMMANDS);

// Функція, яка виконується кожні 5 хвилин
const keepServerAlive = async () => {
  // Тут можна додати дії, які виконуються періодично
  console.log("Server is awake!");
};

// Запуск функції кожні 5 хвилин
setInterval(keepServerAlive, 300000); // 300000 мілісекунд = 5 хвилин

bot.on("callback_query", async (query) => {
  await myCallbackQuery(query, bot);
});

bot.on("message", async (msg) => {
  await myMessage(msg, bot);
});
bot.on("location", async (msg) => {
  const latitude = msg.location.latitude;
  const longitude = msg.location.longitude;
  await bot.sendMessage(msg.chat.id, `Результат пошуку.`, {
    reply_markup: {
      remove_keyboard: true,
    },
  });
  const length = await filterLocationCard(msg.chat, bot, latitude, longitude);
  await bot.sendMessage(msg.chat.id, `Найближчі ${length} об'єктів.`);
});
