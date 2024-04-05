import { inlineKeyboardMenu } from "../button.js";
import {
  downloadImage,
  filterGetTopRating,
  filterStart,
  getLocationButton,
  searchByCriteria,
} from "../function/callbackQueryFunction.js";
import { fetchStart } from "./dbServuce.js";

export async function myMessage(msg, bot) {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/start") {
    await fetchStart(msg.chat);
    const dayTime = getGreeting();
    const image = await downloadImage(
      "https://roombi.space/Avatar/roombi1.PNG"
    );
    await bot.sendPhoto(chatId, image, {
      caption: `${dayTime} ${msg.from.first_name}.\nЯк я можу допомогти?\nПерегляньте меню команд.`,
      reply_markup: {
        inline_keyboard: inlineKeyboardMenu,
      },
    });
  } else if (
    text === "/hello" ||
    text === "Привіт" ||
    text === "привіт" ||
    text === "Hello" ||
    text === "hello" ||
    text === "Hi" ||
    text === "hi"
  ) {
    const dayTime = getGreeting();
    await bot.sendMessage(
      chatId,
      `${dayTime} ${msg.from.first_name}.\nЯк я можу допомогти?\nПерегляньте меню команд.`,
      {
        reply_markup: {
          inline_keyboard: inlineKeyboardMenu,
        },
      }
    );
  } else if (text === "/what_is_your_name") {
    await bot.sendMessage(
      chatId,
      `Мене звуть RoomBi_Bot радий знайомству! Як я можу Вам допомогти?`,
      {
        reply_markup: {
          inline_keyboard: inlineKeyboardMenu,
        },
      }
    );
  } else if (text === "/nearest_apartments") {
    await getLocationButton(msg.chat, bot);
  } else if (text === "/highest_rated") {
    await filterGetTopRating(msg.chat, bot);
  } else if (text === "/filter") {
    await filterStart(msg.chat, bot);
  } else if (text === "/search_by_criteria") {
    await searchByCriteria(msg.chat, bot);
  }
}

function getGreeting() {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour >= 6 && currentHour < 12) {
    greeting = "Доброго ранку";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Добрий день";
  } else if (currentHour >= 18 && currentHour < 24) {
    greeting = "Добрий вечір";
  } else {
    greeting = "Доброї ночі";
  }

  return greeting;
}
