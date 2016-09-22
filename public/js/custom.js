// Add active class to nav if not home page
$(function() {
    if(location.pathname != "/") {
        $('nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
    }
});

