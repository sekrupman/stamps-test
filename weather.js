require("dotenv").config();

const API_KEY = process.env.WEATHER_API_KEY;

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=Jakarta,ID&units=metric&appid=${API_KEY}`;
    // console.log('api key:', API_KEY);
    // console.log('url:', url);

    const res = await fetch(url);
    const data = await res.json();
    // console.log('data:', data);

    let daily = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);

        const day = date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        if (!daily[day]) {
            daily[day] = item.main.temp;
        }
    });

    console.log("Weather Forecast :");

    Object.keys(daily).slice(0, 5).forEach(day => {
        console.log(`${day} ${daily[day].toFixed(2)} °C`);
    });
}

getWeather();