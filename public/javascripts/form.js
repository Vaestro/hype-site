$(document).on('ready', function() {
    $('.form').parsley();

    $('form-errors').hide();

    $('.form-control').on('focus blur', function(e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
});
