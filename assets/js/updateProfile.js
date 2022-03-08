{
    let updateUsername = function(req, res){
        $('#change-username-form').submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/update-username",
                data: $('#change-username-form').serialize(),
                success: function (response) {
                    console.log(response);
                    window.location.href = '/profile';
                }, error: function(err){
                    console.log(err.responseText);
                    let msg = eval("(" + err.responseText + ")");
                    console.log(msg.message);
                    $('#change-username-error-alert').removeClass('d-none');
                    $('#change-username-error-alert').html(msg.message);
                }

            });
        })
    }

    let updatePassword = function(){
        $('#change-password-form').submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/update-password",
                data: $('#change-password-form').serialize(),
                success: function (response) {
                    console.log(response);
                    $('#change-password-error-alert').addClass('d-none');
                    $('#change-password-success-alert').removeClass('d-none')
                }, error: function(err){
                    console.log(err.responseText);
                    let msg = eval("(" + err.responseText + ")");
                    console.log(msg.message);
                    $('#change-password-success-alert').addClass('d-none')
                    $('#change-password-error-alert').removeClass('d-none');
                    $('#change-password-error-alert').html(msg.message);
                }
            });
        })
    }

    let updateEmail = function(){
        $('#change-email-form').submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/update-email",
                data: $('#change-email-form').serialize(),
                success: function (response) {
                    console.log(response);
                    $('#change-email-error-alert').addClass('d-none');
                    $('#change-email-success-alert').removeClass('d-none')
                }, error: function(err){
                    console.log(err.responseText);
                    let msg = eval("(" + err.responseText + ")");
                    console.log(msg.message);
                    $('#change-email-success-alert').addClass('d-none')
                    $('#change-email-error-alert').removeClass('d-none');
                    $('#change-email-error-alert').html(msg.message);
                }
            });
        })
    }
    updateEmail();
    updatePassword();
    updateUsername();
}