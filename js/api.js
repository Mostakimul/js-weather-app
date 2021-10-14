class Forcast {
  constructor() {
    this.key = '4qED7942VPDdNCbAeBik53zjy2TcGPoo';
    this.baseUrl = 'https://dataservice.accuweather.com/currentconditions/v1/';
    this.locationUrl =
      'https://dataservice.accuweather.com/locations/v1/cities/search';
  }

  // Methods / prototypes
  async updateCity(location) {
    const locationDetails = await this.getCity(location);
    const weather = await this.getWeather(locationDetails.Key);

    return {
      // object shorthand
      locationDetails,
      weather,
    };
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;

    // fetching the data
    const response = await fetch(`${this.locationUrl}${query}`);
    const data = await response.json();

    // returning most perfect match
    return data[0];
  }

  async getWeather(locationId) {
    const query = `${locationId}?apikey=${this.key}`;

    // fetching weather
    const response = await fetch(`${this.baseUrl}${query}`);
    const data = await response.json();

    // console.log(data);
    return data[0];
  }
}

/*
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
*/

// Testing
/*
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
*/
