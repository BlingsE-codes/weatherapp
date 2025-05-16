//WEATHER APP


const waetherForm = document.querySelector(`.weatherform`);
const weatherInput = document.querySelector(`.cityInput`);
const card = document.querySelector(`.card`);
const apiKey = `e3502c50ace75a07be35f0e51d7fb371`;



waetherForm.addEventListener(`submit`, async event => {
    event.preventDefault();
    const city = weatherInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData)

        }
        catch (error) {
            console.error(error);
            displayerror(error);
        }
      
    }
    else {
        displayerror(`Please enter a city name`);
        return;
    }

});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`${city} is NOT a city/Country.`);
    }
    return await response.json();
}

function displayWeatherInfo(data) {

    console.log(data);

    const { main:{temp, humidity}, 
         weather:description,id, 
            wind:{speed}, 
            name:city,
            sys:{country}} = data;

    card.textContent = "";
    card.style.display = `block`;

    const cityDislay = document.createElement(`h1`);
    const tempDislay = document.createElement(`p`);
    const humidityDislay = document.createElement(`p`);
    const descDislay = document.createElement(`p`);
    const emojiDislay = document.createElement(`p`);

    cityDislay.textContent = `${city}(${country})`;
    tempDislay.textContent = `Temperature: ${(temp).toFixed(1)}°C`;
    humidityDislay.textContent = `Humidity: ${humidity}%`;
    descDislay.textContent = `Windspeed: ${speed} m/s`;
    emojiDislay.textContent = getweatherEmojis(id);

    card.appendChild(cityDislay);
    card.appendChild(tempDislay);
    card.appendChild(humidityDislay);
    card.appendChild(descDislay);
    card.appendChild(emojiDislay);


    cityDislay.classList.add(`cityDisplay`);
    tempDislay.classList.add(`tempDisplay`);
    humidityDislay.classList.add(`humidityDisplay`);
    descDislay.classList.add(`descDisplay`);
    emojiDislay.classList.add(`emojiDisplay`);

   
}

function getweatherEmojis(weatherid){
      switch(true){
        case weatherid >= 200 && weatherid < 300:
            return `⛈️`;
        case weatherid >= 300 && weatherid < 400:
            return `🌧️`;
        case weatherid >= 500 && weatherid < 600:
            return `🌧️`;
        case weatherid >= 600 && weatherid < 700:
            return `❄️`;
        case weatherid >= 700 && weatherid < 800:
            return `🌫️`;
        case weatherid === 800:
            return `☀️`;
        case weatherid > 800:
            return `⛅`;
        default:
            return `🌈`;
      }

}

function displayerror(message) {
 const errorDisplay = document.createElement("p")
 errorDisplay.textContent = message;
 errorDisplay.classList.add(`errorDisplay`);


 card.textContent = ``;
 card.appendChild(errorDisplay);
 card.style.display = `flex`;

}
