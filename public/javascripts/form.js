$(function() {
  $('#submitbetarequest').find('input, textarea').on('keyup blur focus', function(e) {
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
      var newBetaRequest = {
        'firstname': $('#submitbetarequest input#inputFirstName').val(),
        'lastname': $('#submitbetarequest input#inputLastName').val(),
        'email': $('#submitbetarequest input#inputEmail').val(),
        'city': $('#submitbetarequest input#inputCity').val(),
        'instagram': $('#submitbetarequest input#inputInstagram').val(),
        'snapchat': $('#submitbetarequest input#inputSnapchat').val()
      };

      // Use AJAX to post the object to our submitrequest service
      $.ajax({
        type: 'POST',
        data: newBetaRequest,
        url: '/users/submitbetarequest',
        dataType: 'JSON'
      }).done(function(response) {

        debugger;
        // Check for successful (blank) response
        if (response.msg === '') {
          $('.modal-wrapper').toggleClass('open');
          $('#beta-request-form').toggleClass('blur');
          // Clear the form inputs
          $('#submitbetarequest input').val('');
        } else {
          // If something goes wrong, alert the error message that our service returned
          alert('Error' + response.msg);
        }
      });
    }
    $('.beta-request-form').removeClass('blur');

  });
  $('.trigger').click(function() {
    $('.modal-wrapper').toggleClass('open');
    window.location.replace("/");
    return false;
  });
});
