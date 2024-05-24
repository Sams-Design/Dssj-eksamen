// Scroll Event Listener
window.addEventListener("scroll", function() {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.classList.add("header--scrolled");
        header.classList.remove("header--transparent");
    } else {
        header.classList.add("header--transparent");
        header.classList.remove("header--scrolled");
    }
});

// Menu Button Click Event Listener
document.querySelector(".menu-button").addEventListener("click", function() {
    document.querySelector(".nav-menu").classList.add("nav-menu--open");
});

// Close Button Click Event Listener
document.querySelector(".close-button").addEventListener("click", function() {
    document.querySelector(".nav-menu").classList.remove("nav-menu--open");
});