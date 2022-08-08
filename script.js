"use strict";

window.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector(".preloader"),
    preloaderItems = preloader.querySelectorAll(".pre-items"),
    intro = document.querySelector(".intro");
  let arr = [...preloaderItems];
  arr.forEach((item) => {
    let sum = 300 + 300 * +arr.indexOf(item);
    console.log(sum);
    setTimeout(() => {
      item.animate([{ opacity: "100%" }, { opacity: "0%" }], {
        duration: 1800,
        iterations: Infinity,
      });
    }, sum);
  });
  const nav = document.querySelector("nav");
  window.addEventListener("load", () => {
    nav.animate([{ opacity: "100%" }], {
      delay: 300,
      duration: 1800,
      fill: "forwards",
    });
    intro.animate([{ opacity: "100%" }], {
      delay: 300,
      duration: 1800,
      fill: "forwards",
    });
    preloader.animate([{ opacity: "100%" }, { delay: 300, opacity: "0%" }], {
      duration: 1500,
      fill: "forwards",
    });
    setTimeout(() => {
      preloader.style.display = "none";
    }, 1800);
    // Slider
    $(".slider").slick({
      centerMode: true,
      touchMove: true,
      prevArrow: $("#prev"),
      nextArrow: $("#next"),
      speed: 800,
      variableWidth: true,
      slidesToShow: 3,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 1,
          },
        },
      ],
    });
    let a = -1000;
    $(".slider").on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        const line = document.querySelector(".line");
        let b;
        currentSlide > nextSlide ? (b = a + 200) : (b = a - 200);
        a = b;
        line.animate([{ right: `${b}px` }], {
          duration: 600,
          fill: "forwards",
        });
      }
    );
    const headlines = document.querySelector(".headlines"),
      headlinesItems = document.querySelectorAll(".headline-item");
    headlinesItems.forEach((item) => {
      item.addEventListener("click", () => {
        headlines.style.top = "-10vh";
        console.log("wtf");
      });
    });
    // Equip Mode Switch
    const switcher = document.querySelector(".equip-mode-switcher"),
      switcherBulb = document.querySelector(".fa-regular, .far "),
      equipHeadline = document.querySelector("#equip-headline"),
      equipBgLight = document.querySelector(".equip-bg"),
      equipBgDark = document.querySelector("#equip-bg-alt");
    let night = false;

    function changeTheme() {
      if (night == false) {
        equipBgDark.animate([{ opacity: 0 }], {
          duration: 500,
          fill: "forwards",
        });
        equipBgLight.animate([{ opacity: 1 }], {
          duration: 500,
          fill: "forwards",
        });
        switcherBulb.style.filter = "invert(0)";
        switcher.style.backgroundColor = "white";
        equipHeadline.style.textShadow = " 0 0 5px #fff";
      } else {
        equipBgDark.animate([{ opacity: 1 }], {
          duration: 500,
          fill: "forwards",
        });
        equipBgLight.animate([{ opacity: 0 }], {
          duration: 500,
          fill: "forwards",
        });
        switcherBulb.style.filter = "invert(1)";
        switcher.style.backgroundColor = "black";
        equipHeadline.style.cssText =
          "text-shadow: 0 0 5px #fff, 0 0 20px rgb(121, 86, 238),0 0 40px rgb(121, 86, 238), 0 0 80px rgb(121, 86, 238), 0 0 90px rgb(121, 86, 238), 0 0 100px rgb(121, 86, 238), 0 0 150px rgb(121, 86, 238);";
      }
    }
    switcher.addEventListener("click", () => {
      night = !night;
      console.log(night);
      changeTheme();
    });
    //Fullpage
    new fullpage("#fullpage", {
      autoScrolling: true,
      navigation: true,
      scrollHorizontally: true,
      fitToSection: false,
      navigationPosition: "left",
      scrollOverflow: true,
      dragAndMove: "fingersonly",
      normalScrollElements: ".price-card-wrapper",
      onLeave: function (index, direction) {
        let sections = document.querySelectorAll(".section");
        fullpage.CurrentIndex = index.index;
        sections[index.index].animate([{ opacity: "50%" }], {
          duration: 200,
          fill: "forwards",
        });
        sections[direction.index].animate([{ opacity: 1 }], {
          duration: 700,
          fill: "forwards",
        });
        headlines.animate([{ top: `-${10 * direction.index}vh` }], {
          duration: 500,
          fill: "forwards",
        });
        headlines.animate(
          [{ opacity: "70%", textColor: "rgba(121, 86, 238,1)" }],
          { duration: 500, fill: "forwards" }
        );
        direction.index === 0
          ? (document.querySelector("#fp-nav").style.display = "none")
          : direction.index === 1
          ? (document.querySelector("#fp-nav").style.display = "block")
          : (document.querySelector("#fp-nav").style.display = "block");
        direction.index < 2
          ? headlinesItems.forEach((item) =>
              item.animate([{ opacity: 0 }], {
                duration: 100,
                fill: "forwards",
              })
            )
          : headlinesItems.forEach((item) =>
              item.animate([{ opacity: 1 }], {
                delay: 400,
                duration: 200,
                fill: "forwards",
              })
            );
        direction.index < 2
          ? nav.animate([{ backgroundColor: "rgba(0,0,0,0)" }], {
              duration: 300,
              fill: "forwards",
            })
          : direction.index === 3
          ? nav.animate([{ backgroundColor: "rgba(0,0,0,0)" }], {
              duration: 1500,
              fill: "forwards",
            })
          : nav.animate([{ backgroundColor: "rgba(0,0,0,0.87)" }], {
              duration: 300,
              fill: "forwards",
            });
      },
      afterLoad: function (anchorLink, index) {
        headlines.animate([{ opacity: "100%" }], {
          duration: 100,
          fill: "forwards",
        });
        headlinesItems.forEach((item) => {
          item.animate([{ color: "rgba(255, 255, 255,1)" }], {
            duration: 100,
            fill: "forwards",
          });
        });
        if (index.index === 2) {
          equipBgDark.animate([{ opacity: 0 }], {
            duration: 500,
            fill: "forwards",
          });
          equipBgLight.animate([{ opacity: 1 }], {
            duration: 500,
            fill: "forwards",
          });
          switcher.style.backgroundColor = "black";
          switcherBulb.style.filter = "invert(1)";
          equipHeadline.style.textShadow = " 0 0 5px #fff";
        }
      },
    });
    //Map
    function initMap() {
      var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 50.41300079242271, lng: 30.628423753783107 },
        zoom: 13.5,
        mapId: "6d88fa397b98e7b6",
      });
      let geo = { lat: 50.41299, lng: 30.62857 };
      var marker = new google.maps.Marker({ position: geo });
      marker.setMap(map);
    }
    initMap();
    //Telegram Post (Send Message) Request
    const telegramToken = "5047013850:AAExDJksx6jmAqdZwnX6bBYI_mBG-avC0rg",
      chatId = "-1001616261182",
      submitButton = document.getElementById("submit"),
      nameInput = document.querySelector("#name"),
      telInput = document.querySelector("#tel"),
      spinner = document.querySelector("#spinner"),
      success = document.querySelector("#success"),
      formTitle = document.querySelector(".contacts-form-title");
    submitButton.addEventListener("click", (e) => {
      let name = nameInput.value,
        tel = telInput.value;
      nameInput.style.display = "none";
      telInput.style.display = "none";
      spinner.style.display = "flex";
      spinner.style.marginBottom = "90px";
      success.style.marginBottom = "90px";
      submitButton.style.display = "none";
      if (name != "" && tel != "") {
        //make more!!
        axios
          .post(
            `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${name} ${tel}`
          )
          .then(function (response) {
            spinner.style.display = "none";
            success.style.display = "block";
            formTitle.innerHTML = "Спасибо! <span>Ваша заявка принята</span>";
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log(3);
      }
    });
  });
  // 1708 Line
  // const   line =document.querySelector(".line");
  // window.onscroll = () =>{
  //     let pos = window.scrollY;
  //     console.log(line.style.right);
  //     line.style.right =`${pos-1000}px`;
  // };
  // Equip Items
  const equip = document.querySelector(".filter"),
    equipDot = document.querySelectorAll(".equip-dot"),
    equipPopup = document.querySelector(".equip-dot-popup"),
    rode = document.querySelector("#rode");
  let equipArr = [...equipDot];
  let dotActive = false;
  rode.firstElementChild.style.display = "flex";
  rode.firstElementChild.style.opacity = "1";
  equipArr.forEach((item) => {
    let dotAnimation = item.animate(
      [
        { transform: "scaleX(1) scaleY(1)" },
        { transform: "translateY(0px)" },
        { transform: "translateY(-5px)" },
        { transform: "translateY(0px)" },
      ],
      { duration: 2000, fill: "forwards", iterations: Infinity }
    );
    if (item === rode) {
      dotAnimation.pause();
    }
    function deskToggler(a) {
      if (dotActive) {
        console.log(equipArr.indexOf(a));
        equipArr.forEach((item) => {
          dotActive = false;
          item.firstElementChild.style.opacity = "0";
          // item.firstElementChild.style.display ='none';
          equipArr[equipArr.indexOf(a)].firstElementChild.style.display =
            "flex";
        });

        setTimeout(() => {
          // a.firstElementChild.style.opacity ='0';
          equipArr[equipArr.indexOf(a)].firstElementChild.style.opacity = "1";
        }, 1);
      } else {
        a.firstElementChild.style.opacity = "0";
        setTimeout(() => {
          a.firstElementChild.style.display = "none";
        }, 500);
      }
    }
    item.addEventListener("click", (e) => {
      if (e.target === item) {
        dotActive = !dotActive;
        console.log(dotActive);
        if (dotActive) {
          dotAnimation.pause();
          deskToggler(item);
        } else {
          dotAnimation.play();
          deskToggler(item);
        }
      }
    });
    equip.addEventListener("click", (e) => {
      if (e.target === equip) {
        dotActive == false;
        dotAnimation.play();
        item.firstElementChild.style.opacity = "0";
        setTimeout(() => {
          item.firstElementChild.style.display = "none";
        }, 500);
      }
    });
  });

  // Equip Mode Switch

  const scrollSwitch = () => {
    if (intro.getBoundingClientRect().top < -1450) {
      setTimeout(() => {
        // equipHeadlineLight.finish();
        // equipFilterLight.finish();
      }, 701);
      // equipHeadline.style.color ='white';
      // equipHeadline.style.opacity ='1';
      window.removeEventListener("scroll", scrollSwitch);
    }
  };
  window.addEventListener("scroll", scrollSwitch);

  // Equip Hide Tooltip
  const switcherToolTip = document.querySelector(".switcher-tooltip");
  function hideTooltip(a) {
    a.animate([{ opacity: "0" }], { duration: 300, fill: "forwards" });
    setTimeout(() => {
      a.style.display = "none";
    }, 500);
  }
  switcherToolTip.addEventListener("mouseenter", () => {
    hideTooltip(switcherToolTip);
  });

  // Price

  const priceCard = document.querySelectorAll(".price-card");

  priceCard.forEach((item) => {
    const priceImgAnimation = item.firstElementChild.firstElementChild.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(-5px)" },
        { transform: "translateY(0)" },
      ],
      { duration: 700, fill: "forwards", iterations: Infinity }
    );
    priceImgAnimation.pause();
    item.addEventListener("mouseenter", () => {
      priceImgAnimation.play();
    });
    item.addEventListener("mouseleave", () => {
      priceImgAnimation.cancel();
    });
  });

  // Navigation

  const navItems = document.querySelectorAll("nav ul li"),
    navArr = [...navItems],
    toContactsButton = document.querySelector(
      ".intro-content-buttons button:nth-child(2)"
    ),
    logo = document.querySelector(".logo"),
    toTopButton = document.querySelector(".to-top");
  // section =document.querySelectorAll('.section');
  toContactsButton.addEventListener("click", () => {
    fullpage_api.moveTo(6);
  });
  logo.addEventListener("click", () => {
    document.getElementById("intro").scrollIntoView({ behavior: "smooth" });
  });
  // const   navItems = document.querySelectorAll('nav ul li'),
  //         navArr = [...navItems];
  navArr.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(fullpage_api.getActiveSection());
      e.target === navArr[0]
        ? fullpage_api.moveTo(3)
        : e.target === navArr[1]
        ? fullpage_api.moveTo(6)
        : e.target === navArr[2]
        ? fullpage_api.moveTo(4)
        : console.log("1");
    });
  });
  const orderButton = document.querySelector(".intro-content-buttons button"),
    contactsIntro = document.querySelector("#contacts-intro"),
    introContent = document.querySelector(".intro-content"),
    closePopup = document.querySelector("#close-popup");
  let orderOpen = false;
  orderButton.addEventListener("click", () => {
    console.log(contactsIntro.children);
    orderOpen = !orderOpen;
    if (orderOpen) {
      if (window.innerWidth > 500) {
        contactsIntro.animate([{ right: "0px" }], {
          duration: 200,
          fill: "forwards",
        });
        navItems.forEach((item) => {
          item.animate([{ opacity: "0%" }], {
            duration: 200,
            fill: "forwards",
          });
        });
      } else {
        console.log("small");
        contactsIntro.style.width = "100%";
        contactsIntro.animate([{ right: "0px" }], {
          duration: 200,
          fill: "forwards",
        });
        nav.style.display = "none";
      }
    } else {
      contactsIntro.animate([{ right: "-500px" }], {
        duration: 200,
        fill: "forwards",
      });
      navItems.forEach((item) => {
        item.animate([{ opacity: "100%" }], {
          duration: 200,
          fill: "forwards",
        });
      });
    }
  });
  intro.addEventListener("click", (e) => {
    console.log(e.target);
    if (
      (orderOpen && e.target != orderButton && e.target === intro) ||
      e.target === introContent
    ) {
      orderOpen = false;
      contactsIntro.animate([{ right: "-500px" }], {
        duration: 200,
        fill: "forwards",
      });
      navItems.forEach((item) => {
        item.animate([{ opacity: "100%" }], {
          duration: 200,
          fill: "forwards",
        });
      });
    }
    closePopup.addEventListener("click", () => {
      orderOpen = false;
      contactsIntro.animate([{ right: "-500px" }], {
        duration: 200,
        fill: "forwards",
      });
      nav.style.display = "flex";
    });
  });
  // To Top Button
  window.addEventListener("scroll", () => {
    if (intro.getBoundingClientRect().top < -500) {
      toTopButton.style.display = "flex";
    } else {
      toTopButton.style.display = "none";
    }
  });
  toTopButton.addEventListener("click", () => {
    intro.scrollIntoView({ behavior: "smooth" });
  });
  // Nav Burger
  const navBurger = document.querySelector("#nav-icon1"),
    navUl = nav.querySelector("ul"),
    navLi = navUl.querySelectorAll("li");
  let burgerActive = false;
  navBurger.addEventListener("click", () => {
    burgerActive = !burgerActive;
    if (burgerActive == true) {
      navBurger.setAttribute("class", "open");
      nav.animate([{ height: "250px" }], { duration: 200, fill: "forwards" });
      navUl.style.display = "flex ";
    } else {
      navBurger.removeAttribute("class", "open");
      nav.animate([{ height: "55px" }], { duration: 200, fill: "forwards" });
      navUl.style.display = "none";
    }
  });
  navLi.forEach((item) => {
    item.addEventListener("click", () => {
      if (window.innerWidth < 600) {
        console.log(window.innerWidth);
        burgerActive = false;
        navBurger.removeAttribute("class", "open");
        nav.animate([{ height: "55px" }], { duration: 200, fill: "forwards" });
        navUl.style.display = "none";
      }
    });
  });
});