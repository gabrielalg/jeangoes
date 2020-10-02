function toggleMenuMobile() {
  $('.mobile-menu .mobile-menu-wrap .seta-menu').toggleClass('rotate-seta');

  if (!$('#menu').hasClass('responsive')) {
    $('#menu').addClass('responsive');
    $('.mobile-menu').addClass('mobile-menu-active');
    $('.mobile-menu .mobile-menu-wrap').removeClass('shadow');
    $('.mobile-menu .mobile-menu-wrap').addClass('mobile-menu-line');
  } else {
    $('#menu').addClass('menu');
    $('.mobile-menu').removeClass('mobile-menu-active');
    setTimeout(() => {
      $('.mobile-menu .mobile-menu-wrap').addClass('shadow');
      $('.mobile-menu .mobile-menu-wrap').removeClass('mobile-menu-line');
      $('#menu').removeClass('responsive');
    }, 150);
  }
}

function resizeGridItem(item) {
  grid = document.getElementsByClassName('grid')[0];
  rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
  );
  rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
  );
  rowSpan = Math.ceil(
    (item.querySelector('.grid-item').getBoundingClientRect().height +
      rowGap) /
      (rowHeight + rowGap)
  );
  item.style.gridRowEnd = 'span ' + rowSpan;
}

function resizeAllGridItems() {
  allItems = document.getElementsByClassName('container-grid');
  for (x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}


$(document).ready(function () {

  window.addEventListener('resize', resizeAllGridItems);

  $(window).resize(function () {
    if ($(this).width() >= 820 && $('#menu').hasClass('responsive')) {
      toggleMenuMobile();
      $('.menu').removeAttr('style');
      $('.mobile-menu .mobile-menu-wrap .seta-menu').removeClass('rotate-seta');
    }
  });

  $('.mobile-menu .menu-button').on('click', () => {
    toggleMenuMobile();
  });

  var timeInterval;

  // ABRIR E FECHAR CONTATO

  // if ($('#pages').hasScrollBar()) {
  //   $('#contato').addClass('absolute')
  // }

  $('.openmenu').on('click', function (event) {
    $('.contato-actions').addClass('transform contato-actions-open');
    $('.container-contato.contato-await').addClass(
      'transform contato-await-active'
    );

    timeInterval = setTimeout(() => {
      clearTimeout(timeInterval);
      $('.container-contato.contato-await').css({ 'overflow-y': 'auto' });
    }, 450);
  });

  $('.close-btn').on('click', function (event) {
    $('.contato-actions.contato-actions-open').removeClass(
      'contato-actions-open'
    );
    $('.container-contato.contato-await.contato-await-active').removeClass(
      'contato-await-active'
    );
    $('.container-contato.contato-await').removeAttr('style');

    setTimeout(() => {
      $('.contato-actions').removeClass('transform');
      $('.container-contato.contato-await').removeClass('transform');
    }, 450);
  });
  //  ------

  var coll = document.getElementsByClassName('menu-button');
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function () {
      var content = document.getElementById('menu');
      var contentHeight = content.scrollHeight + 15;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = contentHeight + 'px';
      }
    });
  }

  $('#contato-form').on('submit', function (e) {
    e.preventDefault();
    let url = window.location.origin + '/' + $(this).attr('action');
    $('.lds-ellipsis').css({ display: 'table' });
    $('.form-label-send').css({ display: 'none' });
    $('.form-message').css({ display: 'none' });

    $.ajax({
      url: url,
      method: 'POST',
      data: $(this).serialize(),
      success: function (data) {
        setTimeout(() => {
          $('.lds-ellipsis').css({ display: 'none' });
          $('.form-btn-send').css({ display: 'none' });
          $('.form-btn-sucess').css({ display: 'block' });
          $('.new-message').css({ display: 'block' });
        }, 2000);
      },
      error: function (error, textMessage) {
        setTimeout(() => {
          $('.form-message').css({ display: 'block' });
          $('.form-message').html(
            'Falha ao enviar mensagem. Por favor, tente novamente.'
          );
          $('.lds-ellipsis').css({ display: 'none' });
          $('.form-label-send').css({ display: 'block' });
        }, 2000);
      },
    });
  });

  $('.new-message').on('click', function (event) {
    $('#contato-form')[0].reset();
    $('.form-btn-send').css({ display: 'block' });
    $('.form-label-send').css({ display: 'block' });
    $('.form-btn-sucess').css({ display: 'none' });
    $('.new-message').css({ display: 'none' });
  });

  if ($('#grid').children().hasClass('empty-state')) {
    $('#flex-page').css({ flex: '1' });
    setTimeout(() => {
      $('.empty-state').addClass('show');
    }, 50);
  }

  $('.open-modal').on('click', function () {
    $('#modal').css('display', 'flex');
    let modalTitle = $(this).find('#videoTitle').val();
    let modalLink = $(this).find('#videoLink').val();
    let modalImage = $(this).find('#videoImage').val();
    let modalRoles = $(this).find('#videoRoles').val().split(', ');
    $('#modal').find('#videoTitle').text(modalTitle);
    $('#modal')
      .find('#videoLink')
      .attr(
        'src',
        `https://player.vimeo.com/video/${modalLink}?autoplay=1&loop=1&color=ffffff&muted=1?silenciado=1`
      );
    $('#modal')
      .find('#videoImage')
      .css({ 'background-image': `url('${modalImage}')` });

    var htmlContent = '';
    for (var i = 0; i < modalRoles.length; i++) {
      htmlContent += `<li> <a href="javascript:;" class="grid-item-tag tag-active-disabled" > ${modalRoles[i]} </a> </li>`;
    }
    $('#modal').find('#videoRoles').html(htmlContent);

    setTimeout(() => {
      $('#modal').css('opacity', '1');
    }, 100);
  });

  $('.close-modal-btn').on('click', function () {
    $('#modal').css('opacity', '0');
    setTimeout(() => {
      $('#modal').css('display', 'none');
      $('#modal').find('#videoTitle').text('');
      $('#modal').find('#videoLink').removeAttr('src');
      $('#modal').find('#videoImage').removeAttr('style');
      $('#modal').find('#videoRoles').html('');
    }, 300);
  });

  // ----- FILTRO

  filterSelection('');

  $('.tag-btn').on('click', function () {
    if ($(this).hasClass('tag-active')) {
      $(this).removeClass('tag-active');
      $(this).find('span').text('');
      filterSelection('');
    } else {
      filterSelection($(this).text());
      $('.tag-btn').removeClass('tag-active');
      $('.tag-btn').find('span').text('');
      $(this).addClass('tag-active');
      $(this).find('span').text('✕');
    }
  });

  function filterSelection(category) {
    category = category.trim();

   
    $('.container-grid.show').removeClass('animate-video');
    setTimeout(() => {
      $('.container-grid').removeClass('show');
      if (
        category === '' ||
        $('.container-grid[category=' + category + ']')[0]
      ) {
        var currentVideo = $('.container-grid:not(.show)');
        if (category.length > 0) {
          currentVideo = $('.container-grid[category=' + category + ']');
        }
        currentVideo.addClass('show');
        setTimeout(() => {
          currentVideo.addClass('animate-video');
        }, 10);
      }
    }, 400);
    setTimeout(() => {
      resizeAllGridItems();
    }, 400); 
  }
});
