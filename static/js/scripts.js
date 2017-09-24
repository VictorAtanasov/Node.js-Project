var dropDown = $('.user-drop-down');
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
})