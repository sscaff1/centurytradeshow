$(window).scroll(function() {
if ($(this).scrollTop() > 1){
    $('#main-logo').addClass("sticky");
  } else {
    $('#main-logo').removeClass("sticky");
  }
});
