function toggleMenuMobile(){
  $('.menu-btn').toggleClass('active');
  $('.menu-btn').toggleClass('not-active');
  if (!$('#menu').hasClass('responsive')) {
    $('#menu').addClass('responsive')
    $('.mobile-menu').addClass('mobile-menu-active')
  } else {
    $('#menu').removeClass('responsive')
    $('#menu').addClass('menu')
    $('.mobile-menu').removeClass('mobile-menu-active')
  }
}

$(document).ready(function(){

  $(window).resize(function(){
    if ($(this).width() >= 800 && $('#menu').hasClass('responsive')){
      toggleMenuMobile()
    }
  })

    var timeInterval

    $(".openmenu").on('click', function(event) {

      $('.contato-actions.transform').addClass('contato-actions-open');
      $('.container-contato.contato-await.transform').addClass('contato-await-active');
      
      timeInterval = setTimeout(() => {
        clearTimeout(timeInterval)
        $('.container-contato.contato-await.transform').css({'overflow-y' : 'auto'});
      }, 650)
      
      
    
      
      // $(this).parent().toggleClass('triangle-shape-cut-active');

      // var year_id = $(this).attr('href')
      // var year = $(year_id)

      // if (year.css('display') === 'none') {
      //   year.css({'display' : 'block'})
      // } else {
      //   setTimeout(function() {
      //     year.css({'display' : 'none'})
      //   }, 1000)
      // }
      
    });

    $(".close-btn").on('click', function(event) {

      $('.contato-actions.transform.contato-actions-open').removeClass('contato-actions-open');
      $('.container-contato.contato-await.transform.contato-await-active').removeClass('contato-await-active');
      $('.container-contato.contato-await.transform').removeAttr('style');
      
    });
   
    $('.mobile-menu').on('click', () => {
        toggleMenuMobile()
    });


    // var btn = $('.menu-btn');

    // btn.on('click', function() {
    //   $(this).toggleClass('active');
    //   $(this).toggleClass('not-active');
    // })

});

// function openMenu() {
//   var x = document.getElementById("menu");
//   if (x.className === "menu") {
//     x.className += " responsive";
//   } else {
//     x.className = "menu";
//   }
// } 