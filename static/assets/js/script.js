function toggleMenuMobile() {

  $('.mobile-menu .mobile-menu-wrap .seta-menu').toggleClass('rotate-seta')

  if (!$('#menu').hasClass('responsive')) {
    $('#menu').addClass('responsive')
    $('.mobile-menu').addClass('mobile-menu-active')
    $('.mobile-menu .mobile-menu-wrap').removeClass('shadow')
    $('.mobile-menu .mobile-menu-wrap').addClass('mobile-menu-line')
  } else {
    $('#menu').addClass('menu')
    $('.mobile-menu').removeClass('mobile-menu-active')
    setTimeout(() => {
      $('.mobile-menu .mobile-menu-wrap').addClass('shadow')
      $('.mobile-menu .mobile-menu-wrap').removeClass('mobile-menu-line')
      $('#menu').removeClass('responsive')
    }, 150)
  }
}

(function ($) {
  $.fn.hasScrollBar = function () {
    return this.get(0).scrollHeight > this.height();
  }
})(jQuery);

$(document).ready(function () {

  $(window).resize(function () {
    if ($(this).width() >= 820 && $('#menu').hasClass('responsive')) {
      toggleMenuMobile()
      $('.menu').removeAttr('style');
      $('.mobile-menu .mobile-menu-wrap .seta-menu').removeClass('rotate-seta')
    }

  })

  $('.mobile-menu .menu-button').on('click', () => {
    toggleMenuMobile()
  });


  var timeInterval

  // ABRIR E FECHAR CONTATO

  // if ($('#pages').hasScrollBar()) {
  //   $('#contato').addClass('absolute')
  // }

  $(".openmenu").on('click', function (event) {

    $('.contato-actions').addClass('transform contato-actions-open');
    $('.container-contato.contato-await').addClass('transform contato-await-active');

    timeInterval = setTimeout(() => {
      clearTimeout(timeInterval)
      $('.container-contato.contato-await').css({ 'overflow-y': 'auto' });
    }, 450)

  });

  $(".close-btn").on('click', function (event) {

    $('.contato-actions.contato-actions-open').removeClass('contato-actions-open');
    $('.container-contato.contato-await.contato-await-active').removeClass('contato-await-active');
    $('.container-contato.contato-await').removeAttr('style');

    setTimeout(() => {
      $('.contato-actions').removeClass('transform');
      $('.container-contato.contato-await').removeClass('transform');
    }, 450)

  });
  //  ------

  var coll = document.getElementsByClassName("menu-button");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = document.getElementById("menu");
      var contentHeight = content.scrollHeight + 15;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = contentHeight + "px";
      }
    });
  }

  $('#contato-form').on('submit', function (e) {
    e.preventDefault()
    let url = window.location.origin + "/" + $(this).attr('action')
    $('.lds-ellipsis').css({ 'display': 'table' })
    $('.form-label-send').css({ 'display': 'none' })
    $('.form-message').css({ 'display': 'none' })

    $.ajax({
      url: url,
      method: "POST",
      data: $(this).serialize(),
      success: function (data) {
        setTimeout(() => {
          $('.lds-ellipsis').css({ 'display': 'none' })
          $('.form-btn-send').css({ 'display': 'none' })
          $('.form-btn-sucess').css({ 'display': 'block' })
          $('.new-message').css({ 'display': 'block' })
        }, 2000)

      },
      error: function (error, textMessage) {
        setTimeout(() => {
          $('.form-message').css({ 'display': 'block' })
          $('.form-message').html('Falha ao enviar mensagem. Por favor, tente novamente.')
          $('.lds-ellipsis').css({ 'display': 'none' })
          $('.form-label-send').css({ 'display': 'block' })
        }, 2000)
      }
    })
  });


  $('.new-message').on('click', function (event) {
    $('#contato-form')[0].reset();
    $('.form-btn-send').css({ 'display': 'block' })
    $('.form-label-send').css({ 'display': 'block' })
    $('.form-btn-sucess').css({ 'display': 'none' })
    $('.new-message').css({ 'display': 'none' })
  });

  if ($('.empty-state').length) {
    $('#flex-page').css({ 'flex': '1' })
  }

  $('.open-modal').on('click', function () {
    $('#modal').css('display', 'flex')
    let modalTitle = $(this).find('#videoTitle').val()
    let modalLink = $(this).find('#videoLink').val()
    let modalImage = $(this).find('#videoImage').val()
    let modalRoles = $(this).find('#videoRoles').val().split(', ')
    $('#modal').find('#videoTitle').text(modalTitle)
    $('#modal').find('#videoLink').attr('src', `https://player.vimeo.com/video/${modalLink}?autoplay=1&loop=1&color=ffffff&muted=1?silenciado=1`)
    $('#modal').find('#videoImage').css({ 'background-image': `url('${modalImage}')` })

    var htmlContent = ""
    for (var i = 0; i < modalRoles.length; i++) {
      htmlContent += `<li> <a href="javascript:;" > ${modalRoles[i]} </a> </li>`
    }
    $('#modal').find('#videoRoles').html(htmlContent)

    setTimeout(() => {
      $('#modal').css('opacity', '1')
    }, 100)
  });

  $('.close-modal-btn').on('click', function () {
    $('#modal').css('opacity', '0')
    setTimeout(() => {
      $('#modal').css('display', 'none')
      $('#modal').find('#videoTitle').text('')
      $('#modal').find('#videoLink').removeAttr('src')
      $('#modal').find('#videoImage').removeAttr('style')
      $('#modal').find('#videoRoles').html('')
    }, 300)
  });



});