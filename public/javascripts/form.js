$(function() {

  $('form').find('input, textarea').on('keyup blur focus', function(e) {
    var $this = $(this),
      label = $this.prev('label');

    if (e.type === 'keyup') {
      if ($this.val() === '') {
        label.removeClass('active highlight');
      } else {
        label.addClass('active highlight');
      }
    } else if (e.type === 'blur') {
      if ($this.val() === '') {
        label.removeClass('active highlight');
      } else {
        label.removeClass('highlight');
      }
    } else if (e.type === 'focus') {
      if ($this.val() === '') {
        label.removeClass('highlight');
      } else if ($this.val() !== '') {
        label.addClass('highlight');
      }
    }
  });

  // Add Autocomplete to Cities using Google Maps API
  var input = document.getElementById('inputCity');
  var autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['(cities)'],
    componentRestrictions: {
      country: "us"
    }
  });

  // Add Submit button click Event
  $('#submitbetarequest').on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    form.parsley().validate();

    if (form.parsley().isValid()) {
      Parse.initialize("ZFX6js0KDbrUJNMKgxIVYMp82oECqIh7PbT4keL0", "G5jbALCek2f6ZNH2CSG70ITV9q19gXvXTuGPq6NQ");
      var BetaObject = Parse.Object.extend("BetaRequest");
      var betaObject = new BetaObject();

      betaObject.set("firstName", $('#submitbetarequest input#inputFirstName').val());
      betaObject.set("lastName", $('#submitbetarequest input#inputLastName').val());
      betaObject.set("email", $('#submitbetarequest input#inputEmail').val());
      betaObject.set("city", $('#submitbetarequest input#inputCity').val());
      betaObject.set("instagram", $('#submitbetarequest input#inputInstagram').val());
      betaObject.set("snapchat", $('#submitbetarequest input#inputSnapchat').val());
      betaObject.set("hearAboutUs", $('#submitbetarequest select#selectAboutUs').val());
      betaObject.save(null, {
        success: function(betaObject) {
          // Execute any logic that should take place after the object is saved.
          $('.modal-wrapper').toggleClass('open');
          $('#beta-request-form').toggleClass('blur');
          // Clear the form inputs
          $('#submitbetarequest input').val('');
        },
        error: function(betaObject, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
        }
      // $('.beta-request-form').removeClass('blur');
      });
    }
  });

  $('.trigger').click(function() {
    $('.modal-wrapper').toggleClass('open');
    window.location.replace("/");
    return false;
  });
});
