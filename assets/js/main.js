/*
  Solid State by HTML5 UP
  html5up.net | @ajlkn
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $header = $("#header"),
    $banner = $("#banner");

  // 브라우저 언어 기반 자동 이동 (SEO 친화 버전)
  // - 한국어 홈(루트)에서만 동작: 깊은 페이지/크롤러까지 강제 이동시키지 않음
  //   → 영문 하위 페이지도 검색엔진에 정상 인덱싱되도록 hreflang 신호와 충돌 방지
  // - 사용자가 언어를 직접 선택하면 이후 자동 이동 비활성화(세션 기억)
  var userLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  var path = window.location.pathname;
  var isKoreanHome = path === "/" || path === "/index.html";
  var manualLang = false;
  try {
    manualLang = window.sessionStorage.getItem("spvLang");
  } catch (e) {}

  if (!manualLang && isKoreanHome && !userLang.startsWith("ko")) {
    window.location.replace("/html/en/index.html");
  }

  // 언어 전환 링크 클릭 시 '수동 선택'으로 기록 → 이후 자동 이동 안 함(튕김 방지)
  $(document).on("click", "a", function () {
    var $a = $(this);
    var text = $a.text().trim();
    if ($a.hasClass("language-link") || text === "English" || text === "한국어") {
      try {
        window.sessionStorage.setItem("spvLang", "1");
      } catch (e) {}
    }
  });

  // Breakpoints.
  breakpoints({
    xlarge: "(max-width: 1680px)",
    large: "(max-width: 1280px)",
    medium: "(max-width: 980px)",
    small: "(max-width: 736px)",
    xsmall: "(max-width: 480px)",
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Header.
  if ($banner.length > 0 && $header.hasClass("alt")) {
    $window.on("resize", function () {
      $window.trigger("scroll");
    });

    $banner.scrollex({
      bottom: $header.outerHeight(),
      terminate: function () {
        $header.removeClass("alt");
      },
      enter: function () {
        $header.addClass("alt");
      },
      leave: function () {
        $header.removeClass("alt");
      },
    });
  }

  // Menu.
  var $menu = $("#menu");

  $menu._locked = false;

  $menu._lock = function () {
    if ($menu._locked) return false;

    $menu._locked = true;

    window.setTimeout(function () {
      $menu._locked = false;
    }, 350);

    return true;
  };

  $menu._show = function () {
    if ($menu._lock()) $body.addClass("is-menu-visible");
  };

  $menu._hide = function () {
    if ($menu._lock()) $body.removeClass("is-menu-visible");
  };

  $menu._toggle = function () {
    if ($menu._lock()) $body.toggleClass("is-menu-visible");
  };

  $menu
    .appendTo($body)
    .on("click", function (event) {
      event.stopPropagation();

      // Hide.
      $menu._hide();
    })
    .find(".inner")
    .on("click", ".close", function (event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      // Hide.
      $menu._hide();
    })
    .on("click", function (event) {
      event.stopPropagation();
    })
    .on("click", "a", function (event) {
      var href = $(this).attr("href");

      event.preventDefault();
      event.stopPropagation();

      // Hide.
      $menu._hide();

      // Redirect.
      window.setTimeout(function () {
        window.location.href = href;
      }, 350);
    });

  $body
    .on("click", 'a[href="#menu"]', function (event) {
      event.stopPropagation();
      event.preventDefault();

      // Toggle.
      $menu._toggle();
    })
    .on("keydown", function (event) {
      // Hide on escape.
      if (event.keyCode == 27) $menu._hide();
    });

  // Floating button - Scroll to top
  $(".floating").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800,
      "swing"
    );
  });

  // myPB Slider
  document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".mypb-slider");
    if (!slider) return; // 슬라이더가 없으면 실행하지 않음

    const leftBtn = document.querySelector(".mypb-slider-left");
    const rightBtn = document.querySelector(".mypb-slider-right");

    // 이미지 배열 생성
    let images = Array.from(document.querySelectorAll(".mypb-slider img"));
    let isAnimating = false;

    function updateSlider(animate) {
      if (animate) {
        // 애니메이션 시작 전 페이드 아웃
        images.forEach(function (img) {
          img.style.transition = "all 0.4s ease";
          img.style.opacity = "0";
          img.style.transform = "scale(0.8)";
        });

        // 페이드 아웃 후 재배치
        setTimeout(function () {
          slider.innerHTML = "";

          images.forEach(function (img, index) {
            slider.appendChild(img);

            // 초기 상태 설정 (작고 투명하게)
            img.style.opacity = "0";
            img.style.transform = "scale(0.8)";

            // 약간의 딜레이 후 페이드 인
            setTimeout(function () {
              img.style.transition = "all 0.5s ease";

              if (index === 1) {
                // 가운데 이미지: 선명하고 크게
                img.style.filter = "none";
                img.style.opacity = "1";
                img.style.transform = "scale(1.1)";
                img.style.zIndex = "10";
              } else {
                // 양옆 이미지: 블러 처리
                img.style.filter = "blur(5px)";
                img.style.opacity = "0.5";
                img.style.transform = "scale(0.85)";
                img.style.zIndex = "1";
              }
            }, 50);
          });

          isAnimating = false;
        }, 400);
      } else {
        // 초기 로드 시 애니메이션 없이
        slider.innerHTML = "";

        images.forEach(function (img, index) {
          slider.appendChild(img);
          img.style.transition = "all 0.5s ease";

          if (index === 1) {
            img.style.filter = "none";
            img.style.opacity = "1";
            img.style.transform = "scale(1.1)";
            img.style.zIndex = "10";
          } else {
            img.style.filter = "blur(5px)";
            img.style.opacity = "0.5";
            img.style.transform = "scale(0.85)";
            img.style.zIndex = "1";
          }
        });
      }
    }

    // 왼쪽 버튼: 이미지를 오른쪽으로 회전
    if (leftBtn) {
      leftBtn.addEventListener("click", function () {
        if (isAnimating) return;
        isAnimating = true;

        const lastImage = images.pop();
        images.unshift(lastImage);
        updateSlider(true);
      });
    }

    // 오른쪽 버튼: 이미지를 왼쪽으로 회전
    if (rightBtn) {
      rightBtn.addEventListener("click", function () {
        if (isAnimating) return;
        isAnimating = true;

        const firstImage = images.shift();
        images.push(firstImage);
        updateSlider(true);
      });
    }

    // 초기 상태 설정 (애니메이션 없이)
    updateSlider(false);
  });
})(jQuery);
