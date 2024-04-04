import {
  inlineKeyboardMenu,
  inlineKeyboardTypeOfAccommodation,
  inlineKeyboardPricesPerNight,
  inlineKeyboardNumberOfBedrooms,
  inlineKeyboardNumberOfBeds,
  inlineKeyboardNumberOfBathrooms,
  inlineKeyboardTheMostNecessary,
  inlineKeyboardFilterFind,
} from "../button.js";

import {
  fetchUserTypeOfAccommodation,
  fetchUserNumberOfBedrooms,
  fetchUserNumberOfBeds,
  fetchUserNumberOfBathrooms,
  fetchUserFilterFind,
  fetchFilterFinishDb,
  fetchFilterFinishRatingDb,
  fetchSetOfferedAmenitiesDTODb,
  fetchGetOfferedAmenitiesDTODb,
  fetchFilterNecessary,
} from "../services/dbServuce.js";

export async function filterStart(chat, bot) {
  await bot.sendMessage(chat.id, `Оберіть тип розміщення`, {
    reply_markup: {
      inline_keyboard: inlineKeyboardTypeOfAccommodation,
    },
  });
}
export async function whatYourName(chat, bot) {
  await bot.sendMessage(
    chat.id,
    `Мене звуть RoomBi_Bot радий знайомству! Як я можу Вам допомогти?`,
    {
      reply_markup: {
        inline_keyboard: inlineKeyboardMenu,
      },
    }
  );
}

export async function filterTypeOfAccommodation(
  chat,
  bot,
  typeOfAccommodation
) {
  await fetchUserTypeOfAccommodation(chat, typeOfAccommodation);
  await bot.sendMessage(chat.id, `Виберіть діапазон цін за день 💵`, {
    reply_markup: {
      inline_keyboard: inlineKeyboardPricesPerNight,
    },
  });
}
export async function filterNumberOfBedrooms(chat, bot, pricesPerNight) {
  const prices = pricesPerNight.split("-").map(Number);
  await fetchUserNumberOfBedrooms(chat, prices[0], prices[1]);
  await bot.sendMessage(chat.id, `Виберіть кількість спалень`, {
    reply_markup: {
      inline_keyboard: inlineKeyboardNumberOfBedrooms,
    },
  });
}
export async function filterNumberOfBeds(chat, bot, numberOfBedrooms) {
  await fetchUserNumberOfBeds(chat, numberOfBedrooms);
  await bot.sendMessage(chat.id, `Виберіть кількість ліжка`, {
    reply_markup: {
      inline_keyboard: inlineKeyboardNumberOfBeds,
    },
  });
}
export async function filterNumberOfBathrooms(chat, bot, numberOfBeds) {
  await fetchUserNumberOfBathrooms(chat, numberOfBeds);
  await bot.sendMessage(chat.id, `Виберіть кількість ванних кімнат`, {
    reply_markup: {
      inline_keyboard: inlineKeyboardNumberOfBathrooms,
    },
  });
}

export async function filterFilterFind(chat, bot, bathrooms) {
  await fetchUserFilterFind(chat, bathrooms);
  await bot.sendMessage(chat.id, "Розпочати пошук?", {
    reply_markup: {
      inline_keyboard: inlineKeyboardFilterFind,
    },
  });
}
export async function filterFinish(chat, bot) {
  const result = await fetchFilterFinishDb(chat);
  await imageWithText(result, chat, bot);
}

export async function filterGetTopRating(chat, bot) {
  const result = await fetchFilterFinishRatingDb(chat);
  await imageWithText(result, chat, bot);
}
async function imageWithText(result, chat, bot) {
  try {
    for (let i = 0; i < result.length; i++) {
      let temp = `\nНазва:  ${result[i].title}\nЦіна за ніч:  ${result[i].pricePerNight} $\nРейтинг:  ${result[i].objectRating}⭐ \nКраїна:  ${result[i].country}`;

      if (
        result[i].pictures &&
        result[i].pictures.length > 0 &&
        result[i].pictures[0].pictureUrl
      ) {
        const urlId = `https://room-bi.vercel.app/en/${result[i].id}`;
        await sendImageWithText(
          chat.id,
          `https://roombi.space/Car/${result[i].pictures[0].pictureUrl}`,
          temp,
          bot,
          result[i].ingMap,
          result[i].latMap,
          urlId
        );
      } else {
        console.error("No picture URL found for item:", result[i]);
      }
    }
  } catch (ex) {
    console.log("ex - ", ex.message);
    await bot.sendMessage(
      chat.id,
      "За вашими критеріями пошук не дав результату. 😥\nЗмініть критерії та спробуйте ще раз."
    );
  }
}
export async function searchByCriteria(chat, bot) {
  await fetchSetOfferedAmenitiesDTODb(chat, []);
  await bot.sendMessage(chat.id, `Оберіть критерії:`, {
    reply_markup: {
      inline_keyboard: inlineKeyboardTheMostNecessary,
    },
  });
}

async function downloadImage(url) {
  const response = await fetch(url, {
    method: "GET",
    responseType: "arraybuffer",
  });

  return Buffer.from(await response.arrayBuffer());
}
async function sendImageWithText(
  chatId,
  imageUrl,
  text,
  bot,
  ingMap,
  latMap,
  urlId
) {
  // Завантажуємо картинку за URL
  const image = await downloadImage(imageUrl);

  // Відправляємо повідомлення з картинкою та текстом

  await bot.sendPhoto(chatId, image, {
    caption: text,
    reply_markup: {
      inline_keyboard: [
        [{ text: "Детально", url: urlId }],
        [
          {
            text: "Місцезнаходження",
            url: `https://www.google.com/maps/place/${ingMap}+${latMap}`,
          },
        ],
      ],
    },
  });
}

export async function theMostNecessary(chat, bot, message_id, dataNecessary) {
  let selectedValues = await fetchGetOfferedAmenitiesDTODb(chat);
  // Перевіряємо, чи selectedValues не є null або undefined, і якщо так, ініціалізуємо його порожнім масивом
  if (!selectedValues) {
    selectedValues = [];
  }
  if (selectedValues.includes(dataNecessary)) {
    const index = selectedValues.indexOf(dataNecessary);
    selectedValues.splice(index, 1); // Видаляємо значення, якщо воно вже присутнє
  } else {
    selectedValues.push(dataNecessary); // Додаємо значення, якщо його немає
  }

  const buttons = inlineKeyboardTheMostNecessary.map((row) =>
    row.map((btn) => ({
      text:
        btn.text + (selectedValues.includes(btn.callback_data) ? " ✅" : ""),
      callback_data: btn.callback_data,
    }))
  );

  await fetchSetOfferedAmenitiesDTODb(chat, selectedValues);

  bot.editMessageText("Оберіть критерії:", {
    chat_id: chat.id,
    message_id: message_id,
    reply_markup: {
      inline_keyboard: buttons,
    },
  });
}

export async function filterNecessary(chat, bot) {
  let selectedValues = await fetchGetOfferedAmenitiesDTODb(chat);
  const modifiedAmenities = selectedValues.map((item) =>
    item.replace("Necessary ", "")
  );
  const result = await fetchFilterNecessary(chat, modifiedAmenities);
  console.log("result 3 - ", result);
  await imageWithText(result, chat, bot);
}
