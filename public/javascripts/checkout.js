// Stripe.setPublishableKey('pk_live_H8u89AfEDonln00iEUB0kKtZ');
Stripe.setPublishableKey('pk_test_cGZ7E1Im6VPKQHYUXIkR6sEe');

$('#checkout-form').on('submit', function(event){

  event.preventDefault();

  $('form-errors').hide();

  Stripe.card.createToken({
    number: $('#card-number').val(),
    cvc: $('#cvv').val(),
    exp_month: $('#expiry-month').val(),
    exp_year: $('#expiry-year').val()
  }, stripeResponseHandler);

  $('#submit-btn').prop("disabled", true);
});

function stripeResponseHandler(status, response) {
  var $form = $('#checkout-form');
  if (response.error) {
    // Show the errors on the form
    $('#form-errors').show();
    $('#form-errors').html(response.error.message);
    $('#submit-btn').prop("disabled", false);
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    console.log($form.get(0));
    $form.get(0).submit();
  }
}
