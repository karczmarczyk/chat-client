var Preloader = null;

(function ($) {

    Preloader = {
        show: function () {
            $('#preloader').show("fade");
        },
        hide: function () {
            $('#preloader').hide();
            $('#preloader-text').text('Wczytywanie danych. Proszę czekać');
        }
    }
})(jQuery)

$(window).bind('beforeunload', function () {

    setTimeout(function () {
        Preloader.show()
    }, 100);
});

/* automatyczne zgaszenie preloadera dla buttonów pobierających pliki*/
$(document).ready(function () {
    $(document).on("click", ".btn-auto-hide-preloader", function () {

        if ($(this).hasClass('btn-preloader-pdf')) {
            Preloader.setText('pdf');

        } else if ($(this).hasClass('btn-preloader-xls')) {
            Preloader.setText('xls');

        } else {
            Preloader.setText(null);
        }

        setTimeout(function () {
            Preloader.hide()
        }, 7000);
    });

    $(document).on("click", ".btn-auto-hide-preloader-2000", function () {
        setTimeout(function () {
            Preloader.hide()
        }, 2000);
    });
});