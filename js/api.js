const key = '4qED7942VPDdNCbAeBik53zjy2TcGPoo';

// weather infromation
const getWeather = async (locationId) => {
  const baseUrl = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${locationId}?apikey=${key}`;

  // fetching weather
  const response = await fetch(`${baseUrl}${query}`);
  const data = await response.json();

  // console.log(data);
  return data[0];
};

// City information
const getCity = async (city) => {
  const baseUrl =
    'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;

  // fetching the data
  const response = await fetch(`${baseUrl}${query}`);
  const data = await response.json();

  // returning most perfect match
  return data[0];
};

getCity('Milan')
  .then((data) => {
    // console.log(data);
    const locationId = data.Key;
    return getWeather(locationId);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
