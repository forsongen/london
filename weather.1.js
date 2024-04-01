document.addEventListener('DOMContentLoaded', function () {
    // Function for converting 24h to 12h
    function displayTime(n) {
        return n === 0 ? '12am'
            : n === 12 ? '12pm'
                : n === 24 ? '12am'
                    : n === 27 ? '3am'
                        : n < 12 ? n + 'am'
                            : n - 12 + 'pm';
    }

    // Function for styling icon
    function getIcon(day, forecast) {

        let weather = forecast.weatherDesc[0].value.toLowerCase();
        let rise = Math.floor(Number(JSON.stringify(day.astronomy[0].sunrise).substring(0, 2)) / 3) * 3;
        let set = Math.floor((Number(JSON.stringify(day.astronomy[0].sunset).substring(0, 2)) + 12) / 3) * 3;

        let daytime = forecast.time >= rise && forecast.time <= set;

        return (weather.includes("clear") || weather.includes("sunny")) && daytime ? ["bi bi-sun-fill", "color: #FFD31D"]
            : (weather.includes("clear") || weather.includes("sunny")) && !daytime ? ["bi bi-moon-fill", "color: #626783"]
                : weather.includes("partly") && daytime ? ["bi bi-cloud-sun", "color: #FFD31D"]
                    : weather.includes("partly") && !daytime ? ["bi bi-cloud-moon", "color: #727272"]
                        : weather.includes("cloudy") ? ["bi bi-cloudy-fill", "color: #ABABAB"]
                            : weather.includes("overcast") ? ["bi bi-clouds-fill", "color: #6F6F6F"]
                                : weather.includes("mist") || weather.includes("fog") ? ["bi bi-cloud-fog2", "color: #ABABAB"]
                                    : weather.includes("thunder") ? ["bi bi-lightning-fill", "color: #FFF300"]
                                        : weather.includes("freezing") || weather.includes("sleet") || weather.includes("ice") ? ["bi bi-cloud-sleet", "color: #6F6F6F"]
                                            : weather.includes("snow") ? ["bi bi-cloud-snow", "color: #6F6F6F"]
                                                : weather.includes("moderate") && weather.includes("rain") ? ["bi bi-cloud-rain-fill", "color: #868EBB"]
                                                    : weather.includes("heavy") && weather.includes("rain") ? ["bi bi-cloud-rain-heavy-fill", "color: #626783"]
                                                        : ["bi bi-cloud-drizzle-fill", "color: #868EBB"];
    }


    // Get weather forecast in JSON
    fetch('https://wttr.in/london?format=j1')
        .then(weatherImport => weatherImport.json())
        .then(forecast => {
            // Get current time in London
            let hour = Math.floor((new Date().toLocaleString('en-GB', {
                timeZone: 'Europe/London',
                hour: 'numeric'
            })) / 3) * 3;

            // Set values for current time
            let i = hour / 3;
            let day1 = forecast.weather[0];
            let forecast1 = forecast.weather[0].hourly[i];
            let icon1 = getIcon(day1, forecast1);

            document.querySelector("#time-1").innerHTML = 'Now (' + displayTime(hour) + ')';
            document.querySelector("#icon-1").setAttribute("class", icon1[0]);
            document.querySelector("#icon-1").setAttribute("style", icon1[1]);
            document.querySelector("#cond-1").innerHTML = forecast1.weatherDesc[0].value;
            document.querySelector("#temp-1").innerHTML = forecast1.tempF + '°F';
            document.querySelector("#rain-1").innerHTML = '<i class="bi bi-umbrella"></i> ' + forecast1.chanceofrain + '%';

            // Set values for +3 hours
            let x = hour === 21 ? 1 : 0;
            let j = i === 7 ? 0 : i + 1;
            let day2 = forecast.weather[x];
            let forecast2 = forecast.weather[x].hourly[j];
            let icon2 = getIcon(day2, forecast2);

            document.querySelector("#time-2").innerHTML = displayTime(hour + 3);
            document.querySelector("#icon-2").setAttribute("class", icon2[0]);
            document.querySelector("#icon-2").setAttribute("style", icon2[1]);
            document.querySelector("#cond-2").innerHTML = forecast2.weatherDesc[0].value;
            document.querySelector("#temp-2").innerHTML = forecast2.tempF + '°F';
            document.querySelector("#rain-2").innerHTML = '<i class="bi bi-umbrella"></i> ' + forecast2.chanceofrain + '%';

            // Set values for +6 hours
            let y = hour === 18 ? 1 : hour === 21 ? 1 : 0;
            let k = i === 6 ? 0 : i === 7 ? 1 : i + 2;
            let day3 = forecast.weather[y];
            let forecast3 = forecast.weather[y].hourly[k];
            let icon3 = getIcon(day3, forecast3);

            document.querySelector("#time-3").innerHTML = displayTime(hour + 6);
            document.querySelector("#icon-3").setAttribute("class", icon3[0]);
            document.querySelector("#icon-3").setAttribute("style", icon3[1]);
            document.querySelector("#cond-3").innerHTML = forecast3.weatherDesc[0].value;
            document.querySelector("#temp-3").innerHTML = forecast3.tempF + '°F';
            document.querySelector("#rain-3").innerHTML = '<i class="bi bi-umbrella"></i> ' + forecast3.chanceofrain + '%';

            // Remove placeholders
            document.querySelectorAll(".placeholder").forEach(function (element) {
                element.removeAttribute("class");
            })
        })
})