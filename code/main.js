const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', function (evt) {
    if (evt.key === "Enter") {
        getResults(searchbox.value);
    }
});

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(weather => {
            if (weather.cod !== 200) {
                alert("City not found!");
                return;
            }
            displayResults(weather);
        })
        .catch(err => alert("Error fetching data"));
}

function displayResults(weather) {
    // City and country
    document.querySelector('.location .city').innerText = `${weather.name}, ${weather.sys.country}`;

    // Date
    const now = new Date();
    document.querySelector('.location .date').innerText = dateBuilder(now);

    // Current temperature
    document.querySelector('.current .temp').innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    // Weather condition
    document.querySelector('.current .weather').innerText = weather.weather[0].main;

    // High and Low (approximate)
    document.querySelector('.hi-low .high').innerText = `High: ${weather.main.temp_max.toFixed(1)}°C`;
    document.querySelector('.hi-low .low').innerText = `Low: ${weather.main.temp_min.toFixed(1)}°C`;
}

function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
