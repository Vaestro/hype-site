$(function() {
  $('#banner-wrapper').slick({
      speed: 2500,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2500,
      infinite: false,
      adaptiveHeight: true
    });
  // FadeIn Slogan and Download Button
  $('h3.banner-message').hide();
  $('h3.banner-message').fadeIn(1500, function() {
      $(".beta-access-button").animate({
        opacity: 1
      }, 1000);
  });
  // // Scrolling Magic
  // var controller = new ScrollMagic.Controller();
  //
  // var fadeInFirstEvent = new TweenMax.to('#first-event-box', 1, {
  //   opacity: 1
  // });
  //
  // var fadeInSecondEvent = new TweenMax.to('#second-event-box', 1, {
  //   opacity: 1
  // });
  //
  // var fadeInThirdEvent = new TweenMax.to('#third-event-box', 1, {
  //   opacity: 1
  // });
  //
  // // Scene Handler
  // var fade_first_event_scene = new ScrollMagic.Scene({
  //     offset: 50,
  //     reverse: false // allows the effect to trigger when scrolled in the reverse direction
  //   })
  //   .setTween(fadeInFirstEvent)
  //   // .addIndicators()
  //   .addTo(controller);
  //
  // var fade_second_event_scene = new ScrollMagic.Scene({
  //     offset: 200,
  //     reverse: false // allows the effect to trigger when scrolled in the reverse direction
  //   })
  //   .setTween(fadeInThirdEvent)
  //   // .addIndicators()
  //   .addTo(controller);
  //
  // var fade_third_event_scene = new ScrollMagic.Scene({
  //     offset: 400,
  //     reverse: false // allows the effect to trigger when scrolled in the reverse direction
  //   })
  //   .setTween(fadeInSecondEvent)
  //   // .addIndicators()
  //   .addTo(controller);
});
