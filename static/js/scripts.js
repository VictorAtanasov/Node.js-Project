var dropDown = $('.user-drop-down'),
    openBtn = $('.fa-bars'),
    closeBtn = $('.fa-times'),
    mobileMenu = $('.sidenav');

$('.user-name').on('click', function(){
    if (dropDown.hasClass('hide')){
        dropDown.removeClass('hide');
        dropDown.show()
    } else {
        dropDown.addClass('hide');
        dropDown.hide()
    }
});
$('.body-wraper').on('click', function(){
    if (!(dropDown.hasClass('hide'))){
        dropDown.addClass('hide');
        dropDown.hide()
    }
});

openBtn.on('click', function(){
    mobileMenu.css('width', '200px');
    openBtn.hide();
});

closeBtn.on('click', function(){
    mobileMenu.css('width', '0');
    openBtn.show('slow')
});