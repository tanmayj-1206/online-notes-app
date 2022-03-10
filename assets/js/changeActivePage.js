{
    let changeActiveNav = function(){
        $('.nav-link').each(function(){
            let link = window.location.href;
            if($(this).attr('href') != '#'){

                // console.log($(this).prop('href'));
                if($(this).prop('href') == link){
                    $(this).addClass('active');
                    $(this).attr('aria-current', 'page');
                    console.log($(this));
                }
                else{
                    $(this).removeClass('active');
                    $(this).removeAttr('aria-current');
                    
                }
            }
        })
    }

    changeActiveNav();
}