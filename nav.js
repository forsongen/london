// On page load
document.addEventListener('DOMContentLoaded', function() {

    // Get navbar from nav.html
    fetch('nav.html')
    .then(navDownload => navDownload.text())
    .then(navImport => document.querySelector("#nav-import").innerHTML = navImport);

});
