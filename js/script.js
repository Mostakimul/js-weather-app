// getting reference
const cityForm = document.querySelector('.change-location');

// API calling here
const updateCity = async (location) => {
  const locationDetails = await getCity(location);
  const weather = await getWeather(locationDetails.Key);

  return {
    // object shorthand
    locationDetails,
    weather,
  };
};

// getting form data
cityForm.addEventListener('submit', (e) => {
  // prevent default
  e.preventDefault();

  const location = cityForm.location.value.trim();
  cityForm.reset();

  // console.log(location);
  // updating UI
  updateCity(location)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
