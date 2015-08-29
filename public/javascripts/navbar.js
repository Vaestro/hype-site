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
  var hamburger = $('#hamburger-icon');

  document.querySelector('.toggle-button').addEventListener('click', function() {
    hamburger.toggleClass('active');
    slideout.toggle();
    return false;
  });
})
