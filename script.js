function toggleMenu() {
    var menu = document.getElementById('menu');
    if (window.innerWidth > 750) {
        menu.style.display = "flex";
    } else {
        menu.style.display = (menu.style.display === "none") ? "flex" : "none";
        menu.style.transform = (menu.style.display === "none") ? "" : "translateY(0%)";
    }
}

document.addEventListener('click', function(event) {
    var menu = document.getElementById('menu');
    var menuIcon = document.querySelector('.menu-icon');
    if (window.innerWidth <= 750) {
        if (event.target !== menu && event.target.parentNode !== menu && event.target !== menuIcon && event.target.parentNode !== menuIcon) {
            menu.style.display = 'none';
            menu.style.transform = "";
        }
    }
});

window.addEventListener('resize', function() {
    var menu = document.getElementById('menu');
    if (window.innerWidth > 750) {
        menu.style.display = "flex";
    } else {
        menu.style.display = "none";
    }
});
