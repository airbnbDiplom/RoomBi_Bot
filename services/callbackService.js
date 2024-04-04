import {
  filterStart,
  whatYourName,
  filterTypeOfAccommodation,
  filterNumberOfBedrooms,
  filterNumberOfBeds,
  filterNumberOfBathrooms,
  searchByCriteria,
  theMostNecessary,
  filterFilterFind,
  filterFinish,
  filterGetTopRating,
  filterNecessary,
} from "../function/callbackQueryFunction.js";

function getChoice(data) {
  const result = data.split(" ").slice(1).join(" ");
  console.log("result - ", result);
  return result;
}
function getChoiceCase(data) {
  if (data.includes("Necessary")) return "Necessary";
  else if (data.includes("TypeOfAccommodation")) return "TypeOfAccommodation";
  else if (data.includes("PricesPerNight")) return "PricesPerNight";
  else if (data.includes("NumberOfBedrooms")) return "NumberOfBedrooms";
  else if (data.includes("NumberOfBeds")) return "NumberOfBeds";
  else if (data.includes("NumberOfBathrooms")) return "NumberOfBathrooms";
  else if (data.includes("what_is_your_name")) return "what_is_your_name";
  else if (data.includes("filter")) return "filter";
  else if (data.includes("nearest_apartments")) return "nearest_apartments";
  else if (data.includes("search_by_criteria")) return "search_by_criteria";
  else if (data.includes("NyNext")) return "NyNext";
  else if (data.includes("FilterFind")) return "FilterFind";
  else if (data.includes("apartment_rating")) return "apartment_rating";
  else if (data.includes("location")) return "location";
  else return "Not found";
}
export async function myCallbackQuery(query, bot) {
  const {
    message: { chat, message_id },
    data,
  } = query;
  let сhoiceCase = getChoiceCase(data);
  const dataNecessary = data;
  console.log("сhoiceCase - ", сhoiceCase);
  console.log("data - ", data);
  switch (сhoiceCase) {
    case "what_is_your_name":
      await whatYourName(chat, bot);
      break;
    case "filter":
      await filterStart(chat, bot);
      break;
    case "TypeOfAccommodation": //тип розміщення
      const typeOfAccommodation = getChoice(data);
      await filterTypeOfAccommodation(chat, bot, typeOfAccommodation);
      break;
    case "PricesPerNight": // діапазон цін за день
      const pricesPerNight = getChoice(data);
      await filterNumberOfBedrooms(chat, bot, pricesPerNight); //кількість спалень
      break;
    case "NumberOfBedrooms": //кількість спалень
      const numberOfBedrooms = getChoice(data);
      filterNumberOfBeds(chat, bot, numberOfBedrooms); //кількість ліжка
      break;
    case "NumberOfBeds": //кількість ліжка
      const numberOfBeds = getChoice(data);
      await filterNumberOfBathrooms(chat, bot, numberOfBeds); // ванних кімнат
      break;
    case "NumberOfBathrooms": // ванних кімнат
      const numberOfBathrooms = getChoice(data);
      await filterFilterFind(chat, bot, numberOfBathrooms);
      break;
    case "FilterFind":
      await filterFinish(chat, bot);
      break;
    case "location":
      const location = getChoice(data);
      //   await filterGetLocation(chat, bot, location);
      break;
    case "apartment_rating":
      await filterGetTopRating(chat, bot);
      break;
    case "search_by_criteria":
      await searchByCriteria(chat, bot);
      break;
    case "Necessary":
      await theMostNecessary(chat, bot, message_id, dataNecessary);

      break;
    case "NyNext":
      await filterNecessary(chat, bot);
      break;
    default:
      await bot.sendMessage(chat.id, `RoomBi_Bot`);
  }

  bot.answerCallbackQuery({ callback_query_id: query.id });
}
