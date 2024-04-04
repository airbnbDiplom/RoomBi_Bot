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
  console.log("bathrooms - ", bathrooms);
  await fetchUserFilterFind(chat, bathrooms);
  await bot.sendMessage(chat.id, "Розпочати пошук?", {
    reply_markup: {
      inline_keyboard: inlineKeyboardFilterFind,
    },
  });
}
export async function filterFinish(chat, bot) {
  const result = await fetchFilterFinishDb(chat);
  console.log("result", result);
  let str = "";

  for (let i = 0; i < result.length; i++) {
    let temp = `\n ${result[i].title} Цена: ${result[i].pricePerNight} Подробно:\n https://room-bi.vercel.app/en/${result[i].id}\n`;
    str += temp;
  }
  await bot.sendMessage(chat.id, str);
}

export async function searchByCriteria(chat, bot) {
  await bot.sendMessage(chat.id, `Виберіть кількість ванних кімнат`, {
    reply_markup: {
      inline_keyboard: inlineKeyboardTheMostNecessary,
    },
  });
}

let selectedValues = new Set();
export async function theMostNecessary(chat, bot, message_id, dataNecessary) {
  const result = dataNecessary.split(" ").slice(1).join(" ");

  console.log("dataNecessary", result);
  if (selectedValues.has(dataNecessary)) {
    selectedValues.delete(dataNecessary);
  } else {
    selectedValues.add(dataNecessary);
  }

  const buttons = inlineKeyboardTheMostNecessary.map((row) =>
    row.map((btn) => ({
      text: btn.text + (selectedValues.has(btn.callback_data) ? " ✅" : ""),
      callback_data: btn.callback_data,
    }))
  );

  bot.editMessageText("Оберіть кнопки:", {
    chat_id: chat.id,
    message_id: message_id,
    reply_markup: {
      inline_keyboard: buttons,
    },
  });
}

// async function fetchUser2(data, typeOfAccommodation) {
//   const filter = { id: data.id };

//   const user = {
//     ...data,
//     filter: {
//       typeAccommodation: typeOfAccommodation, //Any,FullHouses,Room
//       minimumPrice: 0, //мінімальна ціна
//       maximumPrice: 100, //максимальна ціна
//       bedrooms: 0, //Спальні
//       beds: 0, //Ліжка
//       bathrooms: 0, //Ванні кімнати
//       rating: false, //рейтинг
//       typeOfHousing: [], //Тип житла (houses,Rooms,Countryhouses,Floatinghouses)
//       offeredAmenitiesDTO: [], //Найнеобхідніше
//       hostsLanguage: [], //Англійська
//     },
//   };

//   console.log("data у - ", data);
//   // const result = await users.deleteOne(filter);
//   // console.log("deletedCount - ", result.deletedCount);
//   await users.updateOne(filter, { $set: user }, { upsert: true });
//   return await users.findOne(filter);
// }
