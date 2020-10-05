let darkMode = -1;

$(function(){

    darkMode = localStorage.getItem("dark-mode");
    if (darkMode==null) {
        darkMode = -1;
    }
    switchDarkMode(darkMode);

   $('#darkmode-switch').click(function () {
       darkMode = darkMode * -1;
       switchDarkMode(darkMode);
   })
});

function switchDarkMode (mode) {
    if (darkMode == 1) {
        $('html').addClass('dark-mode');
    } else {
        $('html').removeClass('dark-mode');
    }
    localStorage.setItem("dark-mode", mode);
}