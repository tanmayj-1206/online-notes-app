{
    let signUp = function(){
        $('#sign-up-form').submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/sign-up",
                data: $('#sign-up-form').serialize(),
                success: function (response) {
                    console.log(response);
                    $('#sign-up-error-alert').addClass('d-none');
                    $('#sign-up-success-alert').removeClass('d-none')
                }, error: function(err){
                    let msg = eval("(" + err.responseText + ")");
                    console.log('error',msg.message);
                    $('#sign-up-error-alert').html(msg.message);
                    $('#sign-up-success-alert').addClass('d-none');
                    $('#sign-up-error-alert').removeClass('d-none');
                }
            });
        })
    }

    signUp();
}