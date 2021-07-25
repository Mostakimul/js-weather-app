// getting reference
const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

// Update UI function
const updateUI = (data) => {
  // console.log(data);
  const locationDetails = data.locationDetails;
  const weather = data.weather;

  // details
  details.innerHTML = `
  <h5 class="my-3">${locationDetails.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `;

  // removing d-none clas
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

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
      // console.log(data);
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
