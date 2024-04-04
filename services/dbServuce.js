import mongo from "../mongodb/mongodb.js";
import { getFilter } from "./apartamentService.js";
const users = mongo.db("Telegram").collection("Users");

export async function fetchUserTypeOfAccommodation(data, typeOfAccommodation) {
  const filter = { id: data.id };
  const oldUser = await users.findOne(filter);
  const userFilter = {
    ...oldUser.filter,
    typeOfAccommodation,
  };
  const user = {
    ...data,
    filter: userFilter,
  };

  console.log("data у - ", user.filter);
  // const result = await users.deleteOne(filter);
  // console.log("deletedCount - ", result.deletedCount);
  await users.updateOne(filter, { $set: user }, { upsert: true });
  return await users.findOne(filter);
}
export async function fetchUserNumberOfBedrooms(
  data,
  minimumPrice,
  maximumPrice
) {
  const filter = { id: data.id };
  const oldUser = await users.findOne(filter);
  const userFilter = {
    ...oldUser.filter,
    minimumPrice,
    maximumPrice,
  };
  const user = {
    ...data,
    filter: userFilter,
  };
  await users.updateOne(filter, { $set: user }, { upsert: true });
  return await users.findOne(filter);
}
export async function fetchUserNumberOfBeds(data, bedrooms) {
  const filter = { id: data.id };
  const oldUser = await users.findOne(filter);
  const userFilter = {
    ...oldUser.filter,
    bedrooms,
  };
  const user = {
    ...data,
    filter: userFilter,
  };
  await users.updateOne(filter, { $set: user }, { upsert: true });
  return await users.findOne(filter);
}
export async function fetchUserNumberOfBathrooms(data, beds) {
  const filter = { id: data.id };
  const oldUser = await users.findOne(filter);
  const userFilter = {
    ...oldUser.filter,
    beds,
  };
  const user = {
    ...data,
    filter: userFilter,
  };
  await users.updateOne(filter, { $set: user }, { upsert: true });
  return await users.findOne(filter);
}
export async function fetchUserFilterFind(data, bathrooms) {
  const filter = { id: data.id };
  const oldUser = await users.findOne(filter);
  const userFilter = {
    ...oldUser.filter,
    bathrooms,
  };
  const user = {
    ...data,
    filter: userFilter,
  };
  await users.updateOne(filter, { $set: user }, { upsert: true });
  return await users.findOne(filter);
}
export async function fetchFilterFinishDb(data) {
  const filter = { id: data.id };
  const oldUser = await users.findOne(filter);
  const typeOfHousing = [];
  const offeredAmenitiesDTO = [];
  const hostsLanguage = [];
  const userFilter = {
    ...oldUser.filter,
    typeOfHousing,
    offeredAmenitiesDTO,
    hostsLanguage,
  };

  return await getFilter(userFilter);
}

export async function fetchStart(data) {
  const filter = { id: data.id };
  const user = {
    ...data,
    filter: {
      typeOfAccommodation: "Будь-який", //Any,FullHouses,Room
      minimumPrice: 0, //мінімальна ціна
      maximumPrice: 100, //максимальна ціна
      bedrooms: 0, //Спальні
      beds: 0, //Ліжка
      bathrooms: 0, //Ванні кімнати
      rating: false, //рейтинг
      typeOfHousing: [], //Тип житла (houses,Rooms,Countryhouses,Floatinghouses)
      offeredAmenitiesDTO: [], //Найнеобхідніше
      hostsLanguage: [], //Англійська
    },
  };
  await users.updateOne(filter, { $set: user }, { upsert: true });
}
