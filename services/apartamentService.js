import dotenv from "dotenv";
dotenv.config();
export const getFilter = async (filter) => {
  const url = process.env.URL_FILTER;
  if (!url) {
    throw new Error("URL is undefined.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      typeAccommodation: filter.typeAccommodation,
      minimumPrice: filter.minimumPrice,
      maximumPrice: filter.maximumPrice,
      bedrooms: filter.bedrooms,
      beds: filter.beds,
      bathrooms: filter.bathrooms,
      rating: filter.rating,
      typeOfHousing: filter.typeOfHousing,
      offeredAmenitiesDTO: filter.offeredAmenitiesDTO,
      hostsLanguage: filter.hostsLanguage,
    }),
  });
  if (!response.ok) {
    console.error("getFilter", response);
    throw new Error("Unable to fetch getFilter.");
  }

  return response.json();
};

// typeOfHousing: ["Rooms", "Houses", "Countryhouses", "Floatinghouses"];
// offeredAmenitiesDTO: [
//   "wiFi",
//   "kitchen",
//   "airConditioner",
//   "firstAidKit",
//   "fireExtinguisher",
//   "workspace",
//   "washingMachine",
//   "tV",
//   "innerYard",
//   "pool",
//   "freeParking",
//   "paidParking",
//   "jacuzzi",
//   "bBQArea",
//   "firePit",
//   "fireplace",
//   "gymEquipment",
//   "outdoorShower",
//   "piano",
//   "poolTable",
//   "outdoorDiningArea",
//   "lakeAccess",
//   "skiInOut",
//   "beachAccess",
//   "smokeDetector",
//   "carbonMonoxideDetector",
// ];
