function toggleMenuMobile() {
  $(".mobile-menu-wrap .seta-menu").toggleClass("rotate-seta");

  if (!$("#menu").hasClass("responsive")) {
    $("#menu").addClass("responsive");
    $(".mobile-menu .mobile-menu-wrap").removeClass("shadow");
    setTimeout(() => {
      $(".mobile-menu .mobile-menu-wrap").addClass("mobile-menu-line");
    }, 20);
  } else {
    $("#menu").addClass("menu");
    setTimeout(() => {
      $(".mobile-menu .mobile-menu-wrap").addClass("shadow");
      $(".mobile-menu .mobile-menu-wrap").removeClass("mobile-menu-line");
      $("#menu").removeClass("responsive");
    }, 300);
  }
}

function resizeGridItem(item) {
  grid = document.getElementsByClassName("grid")[0];
  rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  );
  rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  );
  rowSpan = Math.ceil(
    (item.querySelector(".grid-item").getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
  );
  item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
  allItems = document.getElementsByClassName("container-grid");
  for (x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}

// -------- API YOUTUBE
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady(idYoutube) {
  if (idYoutube == null) return;
  player = new YT.Player("videoLinkYT", {
    videoId: idYoutube,
    host: "http://www.youtube-nocookie.com",
    playerVars: {
      autoplay: 1,
      playsinline: 1,
      color: "white",
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
  document
    .getElementById("videoLinkYT")
    .setAttribute(
      "style",
      "position:absolute;top:0;left:0;width:100%;height:100%;"
    );
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// --------- FIM

$(document).ready(function () {
  window.addEventListener("resize", resizeAllGridItems);

  $(window).resize(function () {
    if ($(this).width() >= 820 && $("#menu").hasClass("responsive")) {
      toggleMenuMobile();
      $(".menu").removeAttr("style");
      $(".mobile-menu .mobile-menu-wrap .seta-menu").removeClass("rotate-seta");
    }
  });

  $(".mobile-menu .menu-button").on("click", () => {
    toggleMenuMobile();
  });

  var openInterval, closeInterval;

  // ABRIR E FECHAR CONTATO

  $(".openmenu").on("click", function (event) {
    $(".contato-actions").addClass(
      "transform contato-actions-open disable-btn"
    );
    $(".container-contato.contato-await").addClass(
      "transform contato-await-active"
    );

    clearTimeout(openInterval);
    openInterval = setTimeout(() => {
      $(".container-contato.contato-await").addClass("toggle-overflow");
      $(".contato-actions").removeClass("disable-btn");
    }, 450);
  });

  $(".close-btn").on("click", function (event) {
    $(".contato-actions.contato-actions-open").addClass("disable-btn");
    $(".container-contato.contato-await").removeClass("toggle-overflow");
    $(".contato-actions.contato-actions-open").removeClass(
      "contato-actions-open"
    );
    $(".container-contato.contato-await.contato-await-active").removeClass(
      "contato-await-active"
    );

    clearTimeout(closeInterval);
    closeInterval = setTimeout(() => {
      $(".contato-actions").removeClass("transform");
      $(".container-contato.contato-await").removeClass("transform");
      $(".contato-actions").removeClass("disable-btn");
    }, 450);
  });
  //  ------

  var coll = document.getElementsByClassName("menu-button");
  var i;
  let maxHeight = 0;
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = document.getElementById("menu");
      var contentHeight = content.scrollHeight + 10;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = contentHeight + "px";
      }
    });
  }

  $("#contato-form").on("submit", function (e) {
    e.preventDefault();
    let url = window.location.origin + "/" + $(this).attr("action");
    $(".lds-ellipsis").css({ display: "table" });
    $(".form-label-send").css({ display: "none" });
    $(".form-message").css({ display: "none" });
    $(".form-btn-send").addClass("disable-btn");

    $.ajax({
      url: url,
      method: "POST",
      data: $(this).serialize(),
      success: function (data) {
        setTimeout(() => {
          $(".lds-ellipsis").css({ display: "none" });
          $(".form-btn-send").css({ display: "none" });
          $(".form-btn-sucess").css({ display: "block" });
          $(".new-message").css({ display: "block" });
          $(".form-btn-send").removeClass("disable-btn");
        }, 2000);
      },
      error: function (error, textMessage) {
        setTimeout(() => {
          $(".form-message").css({ display: "block" });
          $(".form-message").html(
            "Falha ao enviar mensagem. Por favor, tente novamente."
          );
          $(".lds-ellipsis").css({ display: "none" });
          $(".form-label-send").css({ display: "block" });
          $(".form-btn-send").removeClass("disable-btn");
        }, 2000);
      },
    });
  });

  $(".new-message").on("click", function (event) {
    $("#contato-form")[0].reset();
    $(".form-btn-send").css({ display: "block" });
    $(".form-label-send").css({ display: "block" });
    $(".form-btn-sucess").css({ display: "none" });
    $(".new-message").css({ display: "none" });
    $(".form-btn-send").removeClass("disable-btn");
  });

  // -------- ABRIR E FECHAR MODAL

  $(".open-modal").on("click", function () {
    let modalTitle = $(this).find("#videoTitle").val();
    let modalImage = $(this).find("#videoImage").val();
    let modalRoles = $(this).find("#videoRoles").val().split(", ");
    let modalDescription = $(this).find("#videoDescription").val();
    let modalLink = "";

    let youtubeLink = $(this).find("#videoYoutubeLink").val();
    let vimeoLink = $(this).find("#videoVimeoLink").val();

    if (youtubeLink.trim() !== "" && vimeoLink.trim() !== "") {
      modalLink = youtubeLink;
      onYouTubeIframeAPIReady(modalLink);
      $("#modal").find("#videoLinkYT").removeClass("hide");
    } else if (youtubeLink.trim() !== "") {
      modalLink = youtubeLink;
      onYouTubeIframeAPIReady(modalLink);
      $("#modal").find("#videoLinkYT").removeClass("hide");
    } else if (vimeoLink.trim() !== "") {
      modalLink = vimeoLink;
      $("#modal")
        .find("#videoLinkVM")
        .attr(
          "src",
          `https://player.vimeo.com/video/${modalLink}?autoplay=1&loop=1&color=ffffff`
        );
      $("#modal").find("#videoLinkVM").removeClass("hide");
    }

    $("#modal").find("#videoTitle").text(modalTitle);
    $("#modal")
      .find("#videoImage")
      .css({ "background-image": `url('${modalImage}')` });
    $("#modal").find("#videoDescription").text(modalDescription);

    var htmlContent = "";
    for (var i = 0; i < modalRoles.length; i++) {
      htmlContent += `<li> <a href="javascript:;" class="grid-item-tag tag-active-disabled" > ${modalRoles[i]} </a> </li>`;
    }
    $("#modal").find("#videoRoles").html(htmlContent);

    $("#modal").css("display", "flex");

    setTimeout(() => {
      $("#modal").css("opacity", "1");
    }, 100);
  });

  $(".open-other-modal").on("click", function () {
    let modalTitle = $(this).find("#otherTitle").val();
    let modalDescription = $(this).find("#otherDescription").val();
    let modalCategory = $(this).find("#otherCategory").val();
    let modalImage = $(this).find("#otherImage").val();
    let paragraphs = $(this.parentElement).find("#otherContent p");
    paragraphs.each((i, parag) => {
      if ($(parag).html().trim().length === 0) {
        parag.remove();
      }
    });
    let modalContent = $(this.parentElement).find("#otherContent").html();
    let modalLink = "";

    let youtubeLink = $(this).find("#videoYoutubeLink").val();
    let vimeoLink = $(this).find("#videoVimeoLink").val();

    if (youtubeLink.trim() === "" && vimeoLink.trim() === "") {
      $(".container-video-modal").addClass("hide");
      $(".bottom-content").removeAttr("style");
    } else if (youtubeLink.trim() !== "" && vimeoLink.trim() !== "") {
      $(".bottom-content").css({ "padding-top": "10px" });
      $("#modal").find("#videoImageYT").addClass("yt-video-margin");
    } else {
      $(".bottom-content").css({ "padding-top": "10px" });
      $("#modal").find("#videoImageYT").removeClass("yt-video-margin");
    }

    if (youtubeLink.trim() !== "") {
      modalLink = youtubeLink;
      $("#modal")
        .find("#linkYT")
        .attr(
          "src",
          `https://www.youtube-nocookie.com/embed/${modalLink}?loop=1&modestbranding=1&color=white&rel=0`
        );
      $("#modal").find("#videoImageYT").css({
        "background-image": `url('/assets/uploads/pages/bg-cinza.jpg')`,
      });
      $("#modal").find("#videoImageYT").removeClass("hide");
      $(".container-video-modal").removeClass("hide");
    } else {
      $("#modal").find("#videoImageYT").addClass("hide");
    }
    if (vimeoLink.trim() !== "") {
      modalLink = vimeoLink;
      $("#modal")
        .find("#linkVM")
        .attr(
          "src",
          `https://player.vimeo.com/video/${modalLink}?loop=1&color=ffffff`
        );
      $("#modal").find("#videoImageVM").css({
        "background-image": `url('/assets/uploads/pages/bg-cinza.jpg')`,
      });
      $("#modal").find("#videoImageVM").removeClass("hide");
      $(".container-video-modal").removeClass("hide");
    } else {
      $("#modal").find("#videoImageVM").addClass("hide");
    }

    $("#modal").find("#otherTitle").text(modalTitle);
    $("#modal").find("#otherDescription").text(modalDescription);
    $("#modal").find("#otherCategory").text(modalCategory);
    $("#modal").find("#otherImage").attr("src", modalImage);
    $("#modal").find("#otherContent").html(modalContent);

    $("#modal").css("display", "flex");
    $(".bottom-other-modal").scrollTop(0);

    setTimeout(() => {
      $("#modal").css("opacity", "1");
    }, 100);
  });

  $(".open-cinema-modal").on("click", function () {
    $("#modal").css("display", "flex");
    let modalTitle = $(this).find("#videoTitle").val();
    let modalDescription = $(this).find("#videoDescription").val();
    let modalRoles = $(this).find("#videoRoles").val().split(", ");
    let modalCategory = $(this).find("#videoCategory").val();
    let modalImage = $(this).find("#videoImage").val();
    let paragraphs = $(this.parentElement).find("#videoContent p");
    paragraphs.each((i, parag) => {
      if ($(parag).html().trim().length === 0) {
        parag.remove();
      }
    });
    let modalContent = $(this.parentElement).find("#videoContent").html();
    let modalLink = "";

    let youtubeLink = $(this).find("#videoYoutubeLink").val();
    let vimeoLink = $(this).find("#videoVimeoLink").val();

    if (youtubeLink.trim() === "" && vimeoLink.trim() === "") {
      $(".container-video-modal").addClass("hide");
      $(".bottom-content").removeAttr("style");
    } else {
      $(".bottom-content").css({ "padding-top": "10px" });
      $(".container-video-modal").removeClass("hide");
    }

    if (youtubeLink.trim() !== "" && vimeoLink.trim() !== "") {
      modalLink = youtubeLink;
      $("#modal")
        .find("#videoLinkYT")
        .attr(
          "src",
          `https://www.youtube-nocookie.com/embed/${modalLink}?modestbranding=1&color=white&rel=0`
        );
      $("#modal").find("#videoImage").css({
        "background-image": `url('/assets/uploads/pages/bg-cinza.jpg')`,
      });
      $("#modal").find("#videoLinkYT").removeClass("hide");
    } else if (youtubeLink.trim() !== "") {
      modalLink = youtubeLink;
      $("#modal")
        .find("#videoLinkYT")
        .attr(
          "src",
          `https://www.youtube-nocookie.com/embed/${modalLink}?modestbranding=1&color=white&rel=0`
        );
      $("#modal").find("#videoImage").css({
        "background-image": `url('/assets/uploads/pages/bg-cinza.jpg')`,
      });
      $("#modal").find("#videoLinkYT").removeClass("hide");
    } else if (vimeoLink.trim() !== "") {
      modalLink = vimeoLink;
      $("#modal")
        .find("#videoLinkVM")
        .attr(
          "src",
          `https://player.vimeo.com/video/${modalLink}?color=ffffff`
        );
      $("#modal").find("#videoImage").css({
        "background-image": `url('/assets/uploads/pages/bg-cinza.jpg')`,
      });
      $("#modal").find("#videoLinkVM").removeClass("hide");
    }

    if (modalContent.trim() === "") {
      $(".bottom-content").addClass("hide");
    } else {
      $("#modal").find("#videoContent").html(modalContent);
      $(".bottom-content").removeClass("hide");
    }

    $("#modal").find("#videoTitle").text(modalTitle);
    $("#modal").find("#videoDescription").text(modalDescription);
    $("#modal").find("#videoCategory").text(modalCategory);
    $("#modal").find("#videoImageDesc").attr("src", modalImage);

    var htmlContent = "";
    for (var i = 0; i < modalRoles.length; i++) {
      htmlContent += `<li> <a href="javascript:;" class="grid-item-tag tag-active-disabled" > ${modalRoles[i]} </a> </li>`;
    }
    $("#modal").find("#videoRoles").html(htmlContent);

    $("#modal").css("display", "flex");
    $(".bottom-other-modal").scrollTop(0);

    setTimeout(() => {
      $("#modal").css("opacity", "1");
    }, 100);
  });

  $(".close-modal-btn").on("click", function () {
    $("#modal").css("opacity", "0");
    setTimeout(() => {
      $("#modal").css("display", "none");
      $("#modal").find("#videoTitle").text("");
      $("#modal").find("#videoLinkYT").remove();
      $("#modal")
        .find(".appendYT")
        .append('<div id="videoLinkYT" class="hide"></div>');
      $("#modal").find("#videoLinkVM").removeAttr("src").addClass("hide");
      $("#modal").find("#linkYT").removeAttr("src");
      $("#modal").find("#linkVM").removeAttr("src");
      $("#modal").find("#videoImage").removeAttr("style");
      $("#modal").find("#videoRoles").html("");
      $("#modal").find("#videoContent").html("");
      $("#modal").find("#otherContent").html("");
    }, 300);
  });

  // ----- FILTRO

  filterSelection("");

  $(".tag-btn").on("click", function () {
    if ($(this).hasClass("tag-active")) {
      $(this).removeClass("tag-active");
      $(this).find("span").text("");
      filterSelection("");
    } else {
      filterSelection($(this).text());
      $(".tag-btn").removeClass("tag-active");
      $(".tag-btn").find("span").text("");
      $(this).addClass("tag-active");
      $(this).find("span").text("✕");
    }
  });

  function filterSelection(category) {
    category = category.trim();

    $(".container-grid.show").removeClass("animate-video");

    setTimeout(() => {
      $(".container-grid").removeClass("show");
      var filteredVideo = $(".container-grid").filter(function () {
        return $(this).attr("tag-filter").split(",").indexOf(category) > -1;
      });
      if (category === "" || filteredVideo[0]) {
        var currentVideo = $(".container-grid:not(.show)");
        if (category.length > 0) {
          currentVideo = filteredVideo;
        }
        currentVideo.addClass("show");
        setTimeout(() => {
          currentVideo.addClass("animate-video");
        }, 10);
      }
    }, 400);

    setTimeout(() => {
      toggleNotFoundVideo($(".container-grid.show").length > 0);
      resizeAllGridItems();
    }, 400);
  }

  function toggleNotFoundVideo(hasVideo) {
    if (hasVideo === false) {
      $(".grid.scroll").addClass("hide");
      $("#flex-page").css({ flex: "1" });
      $(".grid-template").removeClass("hide");
      $(".empty-state").addClass("show");
    } else {
      $(".grid.scroll").removeClass("hide");
      $("#flex-page").removeAttr("style");
      $(".grid-template").addClass("hide");
      $(".empty-state").removeClass("show");
    }
  }

  if ($(".grid.scroll").length === 0) {
    $("#flex-page").css({ flex: "1" });
    setTimeout(() => {
      $(".empty-state").addClass("show");
    }, 20);
  }
});
