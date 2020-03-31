console.log("Welcome!");

// const lightButton = document.querySelector('#crazy-btn');
// lightButton.addEventListener('click', classToggle);

// function classToggle() {
//     var bodyElement = document.querySelector('body');
//     bodyElement.classList.toggle('crazy-mode');
//     bodyElement.classList.toggle('normal-mode');
    
// }

$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});

