{
    let forgotPassword = function(){
        let forgotPasswordForm = $('#forgot-password-form');
        $(forgotPasswordForm).submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/forgot-password",
                data: forgotPasswordForm.serialize(),
                success: function (response) {
                    console.log(response);
                    $('#forgot-password-error-alert').addClass('d-none');
                    $('#forgot-password-success-alert').removeClass('d-none');
                }, error: function(err){
                    console.log(err.responseText);
                    let msg = eval("(" + err.responseText + ")");
                    console.log('error',msg.message);
                    $('#forgot-password-error-alert').html(msg.message);
                    $('#forgot-password-error-alert').removeClass('d-none');
                    $('#forgot-password-success-alert').addClass('d-none');
                }
            });
        })
    }

    forgotPassword();
}