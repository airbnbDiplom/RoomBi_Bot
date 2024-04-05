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
  console.log("Filter - і", filter);

  if (!response.ok) {
    console.log("Error getFilter");
    return [];
  }

  const res = await response.json();
  return res;
};

export const getLocation = async (ing, lat) => {
  const url = process.env.URL_LOCATION;
  if (!url) {
    throw new Error("URL_LOCATION is undefined.");
  }

  const response = await fetch(`${url}?ingMap=${ing}&latMap=${lat}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    console.log("Error getLocation");
    return [];
  }
  const res = await response.json();
  return res;
};
