{
    let changeActiveNav = function(){
        $('.nav-link').each(function(){
            $(this).removeClass('active');
        });

        $('#nav-notes').addClass('active');
    }

    changeActiveNav();
}