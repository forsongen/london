// Version 1.0

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(`.filters .badge`).forEach(element => {
        if (element.innerHTML === "central") {
            element.addEventListener("click", () => {
                toggleFilter(".central");
            })
        } else if (element.innerHTML === "north") {
            element.addEventListener("click", () => {
                toggleFilter(".north");
            })
        } else if (element.innerHTML === "south") {
            element.addEventListener("click", () => {
                toggleFilter(".south");
            })
        } else if (element.innerHTML === "east") {
            element.addEventListener("click", () => {
                toggleFilter(".east");
            })
        } else if (element.innerHTML === "west") {
            element.addEventListener("click", () => {
                toggleFilter(".west");
            })
        }
    })
})

function toggleFilter(area) {
    if (!document.querySelector(`.filters ${area}`).classList.contains("filtered-off")) {
        document.querySelector(`.filters ${area}`).classList.add("filtered-off");
        if (document.querySelector(".accordion-item") != null) {
            document.querySelectorAll(`.accordion-item:has(${area})`).forEach(element => {
                element.classList.add("d-none");
            })
        } else {
            document.querySelectorAll(`.col:not(.filters):has(${area})`).forEach(element => {
                element.classList.add("d-none");
            })
        }
    } else {
        document.querySelector(`.filters ${area}`).classList.remove("filtered-off");
        if (document.querySelector(".accordion-item") != null) {
            document.querySelectorAll(`.accordion-item:not(.filters):has(${area})`).forEach(element => {
                element.classList.remove("d-none");
            })
        } else {
            document.querySelectorAll(`.col:not(.filters):has(${area})`).forEach(element => {
                element.classList.remove("d-none");
            })
        }
    }
}