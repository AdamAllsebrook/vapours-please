$(document).ready(function () {
    $('.debug-form').on('submit', function(event){
        $.ajax({
            url: $(this).attr('data-submit-url'),
            data: $(this).serialize(),
            dataType: 'json',
            method: 'POST',
            success: function(data) {
                $('#results-dump').text(data['data'])
            }
        });
        event.preventDefault();
        $(this)[0].reset();
    });
})
