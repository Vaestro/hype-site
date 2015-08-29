$(function() {
  var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70,
    'side': 'left',
    'touch': false
  });
  // Toggle button
  document.querySelector('.toggle-button').addEventListener('click', function() {
    slideout.toggle();
    var hamburger = $('#hamburger-icon');
    hamburger.toggleClass('active');
    return false;
  });
})
