$(document).ready(function() {
    $("#nav-menu li").hover(function() {
        var e = this;
        $(e).find("a").stop().animate({marginTop: "-30px"}, 150, function() {
            $(e).find("a").animate({marginTop: "-20px"}, 250);
        });
    }, function() {
        var e = this;
        $(e).find("a").stop().animate({marginTop: "0px"}, 150, function() {
            $(e).find("a").animate({marginTop: "0px"}, 150);
        });
    });
});