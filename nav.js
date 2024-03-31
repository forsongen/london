// On page load
document.addEventListener('DOMContentLoaded', function() {

    // Get navbar from nav.html
    fetch('nav.html')
    .then(navDownload => navDownload.text())
    .then(navImport => document.querySelector("#nav-import").innerHTML = navImport);

    // Fetch weather and put in navbar
    fetch('https://wttr.in/London?u&format=1')
    .then(weatherImport => weatherImport.text())
    .then(currentWeather => document.querySelector("#current-weather").innerHTML = currentWeather);
});
