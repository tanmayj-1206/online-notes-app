{
    let resetPassword = function(){
        let resetPasswordForm = $('#reset-password-form');
        $(resetPasswordForm).submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/change-password",
                data: resetPasswordForm.serialize(),
                success: function (response) {
                    $('#error-alert').addClass('d-none');
                    $('#success-alert').removeClass('d-none');
                }, error: function(err){
                    console.log(err.responseText);
                    $('#success-alert').addClass('d-none');
                    $('#error-alert').removeClass('d-none');
                }
            });
        })
    }

    resetPassword();
}