// Version 1.0

document.addEventListener('DOMContentLoaded', function () {

    // Get navbar from nav.1.html
    fetch('nav.1.html')
        .then(navDownload => navDownload.text())
        .then(navImport => document.querySelector("#nav-import").innerHTML = navImport);

});
