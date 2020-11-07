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
})
