$(document).ready(function () {
    $('#debug-make-form').on('submit', function(event){
        $.ajax({
            url: $(this).attr('data-submit-url'),
            data: $(this).serialize(),
            dataType: 'json',
            method: 'POST',
            success: function(data) {
                console.log(data)
            }
        });
        event.preventDefault();
        $(this)[0].reset();
    });

    $('#debug-get-all-form').on('submit', function(event){
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

    $('#debug-get-id-form').on('submit', function(event){
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
