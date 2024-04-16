//jQuery
$(function() {
    $(window).scroll(function (event) {
        let scroll = $(window).scrollTop();
        Alpine.store('app').scroll_y = scroll
    });
});
