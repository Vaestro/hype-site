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

  $('#inputDate').pickadate();

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
        'firstName': $('#submitbetarequest input#inputFirstName').val(),
        'lastName': $('#submitbetarequest input#inputLastName').val(),
        'email': $('#submitbetarequest input#inputEmail').val(),
        'city': $('#submitbetarequest input#inputCity').val(),
        'instagram': $('#submitbetarequest input#inputInstagram').val(),
        'snapchat': $('#submitbetarequest input#inputSnapchat').val(),
        'reference': $('#submitbetarequest select#selectReference').val()
      };

      // Use AJAX to post the object to our submitrequest service
      $.ajax({
        type: 'POST',
        data: newBetaRequest,
        url: '/parsebetarequest',
        dataType: 'JSON',
        success: function (data, textStatus, jqXHR){
          console.log(data);
           $('.modal-wrapper').toggleClass('open');
           $('#beta-request-form').toggleClass('blur');
           $('#submitbetarequest input').val('');
        },
        error: function (jqXHR, textStatus, Thrown) {
          alert('Error' + textStatus + " " + Thrown);
        }
      });
    }
      $('#beta-request-form').removeClass('blur');
  });

  // Add Submit button click Event
  $('#bookings').on('submit', function(e) {
    e.preventDefault();
    var form = $(this);
    form.parsley().validate();

    if (form.parsley().isValid()) {
      var newBooking = {
        'fullName': $('#bookings input#inputFullName').val(),
        'email': $('#bookings input#inputEmail').val(),
        'city': $('#bookings input#inputCity').val(),
        'venues': $('#bookings input#inputVenues').val(),
        'date': $('#bookings input#inputDate').val(),
        'budget': parseInt($('#bookings input#inputBudget').val()),
        'occasion': $('#bookings input#inputOccasion').val(),
        'maleCount': parseInt($('#bookings input#inputMaleCount').val()),
        'femaleCount': parseInt($('#bookings input#inputFemaleCount').val()),
        'specialRequest': $('#bookings input#inputSpecialRequest').val()
      };
      // Use AJAX to post the object to our submitrequest service
      $.ajax({
        type: 'POST',
        data: newBooking,
        url: '/parsebooking',
        dataType: 'JSON',
        success: function (data, textStatus, jqXHR){
          console.log(data);
           $('.modal-wrapper').toggleClass('open');
           $('#bookings-form').toggleClass('blur');
           $('#bookings-form input').val('');
        },
        error: function (jqXHR, textStatus, Thrown) {
          alert('Error' + textStatus + " " + Thrown);
        }
      });
    }
      $('#bookings-form').removeClass('blur');
  });

  $('.trigger').click(function() {
    $('.modal-wrapper').toggleClass('open');
    window.location.replace("/");
    return false;
  });
});
