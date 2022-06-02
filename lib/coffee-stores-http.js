import { createApi } from "unsplash-js";

const unsplashImgApi = createApi({
  accessKey: process.env.UNSPLASH_API_ACCESS_KEY,
});

const getUrlCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?${latLong}${query}${limit}`;
};

const getUnsplashFotoResults = async () => {
  const imgResponse = await unsplashImgApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 10,
    color: "green",
    orientation: "portrait",
  });

  const usplashImgResult = imgResponse.response.results;
  const urlsImageResults = usplashImgResult.map((img) => img.urls.small);

  return urlsImageResults;
};

export const fetchCoffeeStores = async () => {
  try {
    const imageResults = await getUnsplashFotoResults();
    const response = await fetch(
      getUrlCoffeeStores(
        "ll=-8.818170671067918,115.21708816032742",
        "&query=coffee%20shop",
        "&limit=10"
      ),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: process.env.FOURSQUARE_API_KEY,
        },
      }
    );

    const data = await response.json();
    const dataWithImage  = data.results.map((data, idx) => ({
      ...data,
      imgUrl:imageResults[idx]
    }))

    return dataWithImage;
  } catch (error) {
    return error.message;
  }
};
