// getting reference
const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// Update UI function
const updateUI = (data) => {
  // destruction
  const { locationDetails, weather } = data;

  // console.log(data);
  // const locationDetails = data.locationDetails;
  // const weather = data.weather;

  // details
  details.innerHTML = `
  <h5 class="my-3">${locationDetails.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `;

  // image update
  // let timesrc = null;
  // if (weather.isDayTime) {
  //   timesrc = 'image/day.svg';
  // } else {
  //   timesrc = 'image/night.svg';
  // }

  // ternary operator
  let timesrc = weather.isDayTime ? 'image/day.svg' : 'image/night.svg';

  time.setAttribute('src', timesrc);

  // icon update
  const iconssrc = `image/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconssrc);

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
