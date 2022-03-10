{
    let login = function(){
        let loginForm = $('#login-form');
        $(loginForm).submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/login",
                data: loginForm.serialize(),
                success: function (response) {
                    $('#login-form-error-alert').addClass('d-none');
                    console.log(response);
                    window.location.href = '/notes';
                }, error: function(err){
                    let msg = eval("(" + err.responseText + ")");
                    $('#login-form-error-alert').html(msg);
                    $('#login-form-error-alert').removeClass('d-none');
                }
            });
        })
    }
    login();
}