import { inlineKeyboardMenu } from "../button.js";
import { fetchStart } from "./dbServuce.js";
// import mongo from "../mongodb/mongodb.js";

export async function myMessage(msg, bot) {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/start") {
    await fetchStart(msg.chat);
    await bot.sendSticker(chatId, "./img/roombi.PNG");
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
    console.log("mongo - ", mongo.db().databaseName);
    console.log("msg - ", msg);
    let user = await fetchUser(msg.chat);
    // const data = { id: user.id, count: user.count ? ++user.count : 1 };
    // user = await fetchUser(data);
    // await bot.sendMessage(chatId, mongo.db().databaseName);
  }
}

const dataProducts = [
  {
    id: 1,
    title: "ПШЕНИЦЯ",
    price: 150,
  },
  {
    id: 2,
    title: "ЯЧМІНЬ",
    price: 50,
  },
  {
    id: 3,
    title: "ОВЕС",
    price: 30,
  },
  {
    id: 4,
    title: "КУКУРУДЗА",
    price: 220,
  },
  {
    id: 5,
    title: "ПРОСО ЧЕРВОНЕ",
    price: 50,
  },
  {
    id: 6,
    title: "ПРОСО ЖОВТЕ",
    price: 40,
  },
  {
    id: 7,
    title: "ПРОСО ЧОРНЕ",
    price: 150,
  },
  {
    id: 8,
    title: "СОРГО ЧЕРВОНЕ",
    price: 120,
  },
  {
    id: 9,
    title: "КОРІАНДР",
    price: 550,
  },
  {
    id: 10,
    title: "КАНАРКОВА ТРАВА",
    price: 750,
  },
  {
    id: 11,
    title: "ГРЕЧИХА",
    price: 150,
  },
  {
    id: 12,
    title: "СПЕЛЬТА",
    price: 350,
  },
  {
    id: 13,
    title: "ЛЬОН КОРИЧНЕВИЙ",
    price: 450,
  },
  {
    id: 14,
    title: "ЛЬОН ЗОЛОТИСТИ",
    price: 380,
  },
  {
    id: 15,
    title: "СОНЯШНИК ОЛІЙНИЙ",
    price: 80,
  },
  {
    id: 16,
    title: "СОНЯШНИК КОНДИТЕРСЬКИЙ",
    price: 40,
  },
  {
    id: 17,
    title: "ГІРЧИЦЯ БІЛА",
    price: 98,
  },
  {
    id: 18,
    title: "ГІРЧИЦЯ ЖОВТА",
    price: 88,
  },
  {
    id: 19,
    title: "ГІРЧИЦЯ ЧОРНА",
    price: 188,
  },
  {
    id: 20,
    title: "РІПАК",
    price: 228,
  },
  {
    id: 21,
    title: "СОЯ",
    price: 28,
  },
  {
    id: 22,
    title: "СОЧЕВИЦЯ ЗЕЛЕНА",
    price: 128,
  },
  {
    id: 23,
    title: "СОЧЕВИЦЯ ЧЕРВОНА",
    price: 208,
  },
  {
    id: 24,
    title: "ГОРОХ ЗЕЛЕНИЙ",
    price: 30,
  },
  {
    id: 25,
    title: "ГОРОХ ЖОВТИЙ",
    price: 40,
  },
  {
    id: 26,
    title: "КВАСОЛЯ ЧЕРВОНА",
    price: 46,
  },
  {
    id: 27,
    title: "КВАСОЛЯ БІЛА",
    price: 50,
  },
  {
    id: 28,
    title: "НУТ",
    price: 60,
  },
  {
    id: 29,
    title: "БОБИ",
    price: 70,
  },
  {
    id: 30,
    title: "ВІКА",
    price: 80,
  },
  {
    id: 31,
    title: "СОЄВЕ БОРОШНО",
    price: 180,
  },
  {
    id: 32,
    title: "СОНЯШНИКОВИЙ ШРОТ",
    price: 30,
  },
  {
    id: 33,
    title: "СОЄВИЙ ЖМИХ",
    price: 20,
  },
  {
    id: 34,
    title: "СОНЯШНИКОВИЙ ЖМИХ",
    price: 20,
  },
  {
    id: 35,
    title: "ОБВАЛЕНА СОЧЕВИЦЯ",
    price: 150,
  },
  {
    id: 36,
    title: "ПШОНО",
    price: 180,
  },
  {
    id: 37,
    title: "ВІВСЯНІ ПЛАСТІВЦІ",
    price: 280,
  },
  {
    id: 38,
    title: "КОЛОТИЙ ГОРОХ ЗЕЛЕНИЙ",
    price: 144,
  },
  {
    id: 39,
    title: "КОЛОТИЙ ГОРОХ ЖОВТИЙ",
    price: 144,
  },
];

function getAllProducts() {
  let str = "";
  for (let i = 0; i < dataProducts.length; i++) {
    let temp = `\n ${dataProducts[i].title} Цена: ${dataProducts[i].price} Подробно: https://grano.vercel.app/${dataProducts[i].id}\n`;
    str += temp;
  }
  return str;
}

function getSeeds(start, end) {
  let str = "";
  const seeds = dataProducts.slice(start, end);
  for (let i = 0; i < seeds.length; i++) {
    let temp = `\n ${seeds[i].title} Цена: ${seeds[i].price} Подробно: https://grano.vercel.app/${seeds[i].id}\n`;
    str += temp;
  }
  return str;
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

// const users = mongo.db("Telegram").collection("Users");
// async function fetchUser(data) {
//   const filter = { id: data.id };

//   data = {
//     ...data,
//     old: 22,
//   };
//   // Видаляємо поле count, якщо воно відсутнє у переданому об'єкті data
//   if (!data.hasOwnProperty("count")) {
//     delete data.count;
//   }

//   console.log("data у - ", data);
//   const result = await users.deleteOne(filter);
//   console.log("deletedCount - ", result.deletedCount);
//   await users.updateOne(filter, { $set: data }, { upsert: true });
//   return await users.findOne(filter);
// }

// export interface Filter {
//     typeAccommodation: string; //Any,FullHouses,Room
//     minimumPrice: number; //мінімальна ціна
//     maximumPrice: number; //максимальна ціна
//     bedrooms: number; //Спальні
//     beds: number; //Ліжка
//     bathrooms: number; //Ванні кімнати
//     rating: boolean; //рейтинг
//     typeOfHousing: string[]; //Тип житла (houses,Rooms,Countryhouses,Floatinghouses)
//     offeredAmenitiesDTO: string[]; //Найнеобхідніше
//     hostsLanguage: string[]; //Англійська
//   }
