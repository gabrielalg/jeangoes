function toggleMenuMobile(){

  $('.mobile-menu .mobile-menu-wrap .seta-menu').toggleClass('rotate-seta')

  if (!$('#menu').hasClass('responsive')) {
    $('#menu').addClass('responsive')
    $('.mobile-menu').addClass('mobile-menu-active')
    $('.mobile-menu .mobile-menu-wrap').removeClass('shadow')
    $('.mobile-menu .mobile-menu-wrap').addClass('mobile-menu-line')
  } else {
    $('#menu').removeClass('responsive')
    $('#menu').addClass('menu')
    $('.mobile-menu').removeClass('mobile-menu-active')
    setTimeout(() => {
      $('.mobile-menu .mobile-menu-wrap').addClass('shadow')
      $('.mobile-menu .mobile-menu-wrap').removeClass('mobile-menu-line')
    }, 200)
  }
}

$(document).ready(function(){

  $(window).resize(function(){
    if ($(this).width() >= 820 && $('#menu').hasClass('responsive')){
      toggleMenuMobile()
      $('.menu').removeAttr('style');
    }

  })

  $('.mobile-menu .menu-button').on('click', () => {
    toggleMenuMobile()
  });


    var timeInterval

    // ABRIR E FECHAR CONTATO
    $(".openmenu").on('click', function(event) {

      $('.contato-actions').addClass('transform contato-actions-open');
      $('.container-contato.contato-await').addClass('transform contato-await-active');

      timeInterval = setTimeout(() => {
        clearTimeout(timeInterval)
        $('.container-contato.contato-await').css({'overflow-y' : 'auto'});
      }, 700)
      
    });

    $(".close-btn").on('click', function(event) {

      $('.contato-actions.contato-actions-open').removeClass('contato-actions-open');
      $('.container-contato.contato-await.contato-await-active').removeClass('contato-await-active');
      $('.container-contato.contato-await').removeAttr('style');
     
      setTimeout(() => {
        $('.contato-actions').removeClass('transform');
        $('.container-contato.contato-await').removeClass('transform');
      }, 700)
      
    });
  //  ------

  var coll = document.getElementsByClassName("menu-button");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      var content = document.getElementById("menu");;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }


});