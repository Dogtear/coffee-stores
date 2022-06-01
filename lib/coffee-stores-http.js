export const fetchCoffeeStores = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: process.env.FOURSQUARE_API_KEY,
      },
    });

    // console.log("this is responses : ",response)

    const data = await response.json();

    // console.log(data)
    return data;
  } catch (error) {
    return error.message;
  }
};
