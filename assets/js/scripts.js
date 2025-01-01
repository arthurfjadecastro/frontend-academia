(function ($) {
  "use strict";

  $(window).on("load", function () {
    /*------------------- PRELOADER ------------------*/
    $("body").addClass("page-loaded");
  });

  /* ---------------------- MENU --------------------- */
  $("body").on("click", ".nav-btn", function (event) {
    $(event.currentTarget).toggleClass("active");
    $(".nav-menu").toggleClass("active");
    $("body").toggleClass("no-scroll");
    return false;
  });

  $(window)
    .on("resize.myTemplate", function () {
      $("body")[$(this).width() <= 767 ? "addClass" : "removeClass"](
        "isMobile"
      );
    })
    .trigger("resize.myTemplate");

  $("body").on("click", ".dropdown>a", function (event) {
    if (!$("body.isMobile")[0]) {
      return;
    }

    var $thisLi = $(event.currentTarget).parents("li"),
      $thisLiActive = $thisLi.hasClass("dropdown-active");

    $(".dropdown-active")
      .removeClass("dropdown-active")
      .children("ul")
      .slideUp("slow");

    if (!$thisLiActive) {
      $thisLi.addClass("dropdown-active");
      $thisLi.children("ul").slideDown("slow");
    }

    return false;
  });

  $("body")
    .on("mouseenter", ".dropdown", function (event) {
      if ($("body.isMobile")[0]) {
        return;
      }

      var menuItem = $(event.currentTarget);

      if (menuItem[0].timeOutMenu) {
        clearTimeout(menuItem[0].timeOutMenu);
      }

      menuItem.addClass("active");
    })
    .on("mouseleave", ".dropdown", function (event) {
      if ($("body.isMobile")[0]) {
        return;
      }

      var menuItem = $(event.currentTarget);

      menuItem[0].timeOutMenu = setTimeout(function () {
        menuItem.removeClass("active");
      }, 500);
    });

  /* --------------------- PARALLAX -------------------- */
  if ($(".scene")[0]) {
    $(".scene").each(function (index, element) {
      new Parallax(element);
    });
  }

  /* --------------------- TO TOP -------------------- */
  $(window).on("scroll.myTemplat", scrollWindow).trigger("scroll.myTemplat");

  function scrollWindow() {
    if ($(window).scrollTop() > 500) {
      $(".to-top").addClass("active");
    } else {
      $(".to-top").removeClass("active");
    }
  }

  $("body").on("click", ".to-top", function (event) {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });

  /*---------------------- LAZY ---------------------*/
  if ($(".rx-lazy")[0]) {
    $(".rx-lazy").rxLazy();
  }

  /* -------------------- COUNT-UP TIMER ------------------- */
  if ($("#clockdiv")[0]) {
    function getTimeElapsed(startDate) {
      const now = new Date();
      const elapsed = now - startDate;

      const seconds = Math.floor((elapsed / 1000) % 60);
      const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
      const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
      const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    }

    function initializeClock(id, startDate) {
      const clock = document.getElementById(id);
      const daysSpan = clock.querySelector(".days");
      const hoursSpan = clock.querySelector(".hours");
      const minutesSpan = clock.querySelector(".minutes");
      const secondsSpan = clock.querySelector(".seconds");

      function updateClock() {
        const t = getTimeElapsed(startDate);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
      }

      updateClock();
      setInterval(updateClock, 1000);
    }

    const startDate = new Date("2024-01-01T00:00:00");
    initializeClock("clockdiv", startDate);
  }
})(jQuery);
