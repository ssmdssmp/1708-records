"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");

  // Preloader

  const preloader = document.querySelector(".preloader"),
    preloaderItems = preloader.querySelectorAll(".pre-items"),
    introBg = document.querySelector(".intro-bg"),
    intro = document.querySelector(".intro");
  let arr = [...preloaderItems];
  arr.forEach((item) => {
    let sum = 100 + 100 * (+arr.indexOf(item) + 1);
    item.animate([{ opacity: "100%" }], {
      duration: 100,
      delay: sum,
      fill: "forwards",
    });
  });

  window.addEventListener("load", () => {
    // From loader to content

    nav.animate([{ opacity: "100%" }], {
      delay: 1600,
      duration: 1600,
      fill: "forwards",
    });
    intro.animate([{ opacity: "100%" }], {
      delay: 1600,
      duration: 1600,
      fill: "forwards",
    });
    preloader.animate([{ opacity: "100%" }, { opacity: "0%" }], {
      delay: 1000,
      duration: 1600,
      fill: "forwards",
    });
    setTimeout(() => {
      preloader.style.display = "none";
    }, 2300);

    // Slider

    let currentSlide = 0;

    $(".slider").slick({
      touchMove: true,
      prevArrow: $("#prev"),
      nextArrow: $("#next"),
      speed: 900,
      centerMode: true,
      variableWidth: true,
      slidesToShow: 1,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 1,
          },
        },
      ],
    });
    $(".slider").on("afterChange", (a, b) => {
      currentSlide = b.currentSlide;
    });

    // Change slide on hover first image

    const guber = document.querySelector("#guber"),
      firstSlide = document.querySelector(".first");
    if (window.innerWidth > 1000) {
      guber.addEventListener("mouseenter", function () {
        if (currentSlide === 0) {
          firstSlide.animate(
            { filter: ["blur(0)", "blur(" + 5 + "px)"] },
            { duration: 300, fill: "forwards" }
          );
          setTimeout(() => {
            firstSlide.src = "assets/s4.webp";
            firstSlide.animate(
              { filter: ["blur(" + 5 + "px)", "blur(0)"] },
              { duration: 100, fill: "forwards" }
            );
          }, 200);
        }
      });

      guber.addEventListener("mouseleave", function () {
        if (currentSlide === 0) {
          firstSlide.animate(
            { filter: ["blur(0)", "blur(" + 10 + "px)"] },
            { duration: 300, fill: "forwards" }
          );
          setTimeout(() => {
            firstSlide.src = "assets/s1.webp";
            firstSlide.animate(
              { filter: ["blur(" + 10 + "px)", "blur(0)"] },
              { duration: 100, fill: "forwards" }
            );
          }, 200);
        }
      });
    }
    if (window.innerWidth < 1000) {
      //add item to slider if mobile

      $(".slider").slick(
        "slickAdd",
        '<img src="assets/s4.webp" alt="Third Slide" />'
      );
    }

    // Headlines

    const headlines = document.querySelector(".headlines"),
      headlinesItems = document.querySelectorAll(".headline-item");
    headlinesItems.forEach((item) => {
      item.addEventListener("click", () => {
        headlines.style.top = "-10vh";
      });
    });

    // Toggle form appearance

    let orderOpen = false;
    const orderButton = document.querySelector(".intro-content-buttons button"),
      contactsIntro = document.querySelector("#contacts-intro"),
      introContent = document.querySelector(".intro-content"),
      closePopup = document.querySelector("#close-popup");
    closePopup.addEventListener("click", () => {
      contactsIntro.animate([{ right: "-120%" }], {
        duration: 400,
        fill: "forwards",
      });
    });
    introBg.addEventListener("click", () => {
      orderOpen = false;
      contactsIntro.animate([{ right: "-120%" }], {
        duration: 400,
        fill: "forwards",
      });
      navItems.forEach((item) => {
        item.animate([{ opacity: "100%" }], {
          duration: 300,
          fill: "forwards",
        });
      });
    });
    contactsIntro.style.visibility = "initial";
    orderButton.addEventListener("click", () => {
      console.log(1);
      orderOpen = !orderOpen;
      if (orderOpen) {
        if (window.innerWidth >= 500) {
          contactsIntro.animate([{ right: "0px" }], {
            duration: 400,
            fill: "forwards",
          });
          navItems.forEach((item) => {
            item.animate([{ opacity: "0%" }], {
              duration: 300,
              fill: "forwards",
            });
          });
        } else {
          contactsIntro.style.width = "100%";
          contactsIntro.animate([{ right: "0px" }], {
            duration: 300,
            fill: "forwards",
          });
          nav.style.display = "none";
        }
      } else {
        contactsIntro.animate([{ right: "-120%" }], {
          duration: 300,
          fill: "forwards",
        });
        navItems.forEach((item) => {
          item.animate([{ opacity: "100%" }], {
            duration: 300,
            fill: "forwards",
          });
        });
      }
    });
    const priceCard = document.querySelectorAll(".price-card");

    priceCard.forEach((item) => {
      const priceImgAnimation =
        item.firstElementChild.firstElementChild.animate(
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
      item.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") {
          orderOpen = false;
          contactsIntro.animate([{ right: "-120%" }], {
            duration: 400,
            fill: "forwards",
          });
        }
      });
    });
    const priceButtons = document.querySelectorAll(".price-card button"),
      priceNoClick = document.querySelector(".price-no-click");
    console.log(priceButtons, priceNoClick);
    priceNoClick.addEventListener("click", () => {
      contactsIntro.animate([{ right: "-120%" }], {
        duration: 300,
        fill: "forwards",
      });
      !orderOpen;
    });
    priceButtons.forEach((item) => {
      item.addEventListener("click", () => {
        console.log(1);
        if (!orderOpen) {
          orderOpen = true;
          contactsIntro.animate([{ right: "0px" }], {
            duration: 200,
            fill: "forwards",
          });
        } else {
          contactsIntro.animate([{ right: "-120%" }], {
            duration: 200,
            fill: "forwards",
          });
          orderOpen = false;
        }
      });
    });
    intro.addEventListener("click", (e) => {
      console.log(e.target);
      if (
        (orderOpen && e.target != orderButton && e.target === intro) ||
        e.target === introContent
      ) {
        orderOpen = false;
        contactsIntro.animate([{ right: "-120%" }], {
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
        console.log(orderOpen);
        orderOpen = false;
        contactsIntro.animate([{ right: "-120%" }], {
          duration: 200,
          fill: "forwards",
        });
        nav.style.display = "flex";
      });
    });

    let sections = [...document.querySelectorAll(".section")];

    //Fullpage

    new fullpage("#fullpage", {
      responsiveWidth: 1000,
      autoScrolling: true,
      navigation: true,
      scrollHorizontally: false,
      fitToSection: true,
      navigationPosition: "left",
      scrollOverflow: true,
      dragAndMove: false,
      touchSensitivity: 15,

      afterResponsive: function () {
        fullpage_api.setAllowScrolling(true);
      },
      onLeave: function (index, direction) {
        orderOpen = false;
        contactsIntro.animate([{ right: "-120%" }], {
          duration: 400,
          fill: "forwards",
        });
        navItems.forEach((item) => {
          item.animate([{ opacity: "100%" }], {
            duration: 200,
            fill: "forwards",
          });
        });

        sections[index.index].animate([{ opacity: "50%" }], {
          duration: 200,
          fill: "forwards",
        });
        sections[direction.index].animate([{ opacity: 1 }], {
          duration: 700,
          fill: "forwards",
        });
        if (window.innerWidth > 1000) {
          headlines.animate([{ top: `-${10 * direction.index}vh` }], {
            duration: 500,
            fill: "forwards",
          });
          headlines.animate(
            [{ opacity: "70%", textColor: "rgba(121, 86, 238,1)" }],
            { duration: 500, fill: "forwards" }
          );
        }
        direction.index === 0
          ? (document.querySelector("#fp-nav").style.display = "none")
          : direction.index === 1
          ? (document.querySelector("#fp-nav").style.display = "block")
          : (document.querySelector("#fp-nav").style.display = "block");
        direction.index < 1
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
      submitButtons = [...document.querySelectorAll(".submit")],
      nameInputs = document.querySelectorAll(".name"),
      telInputs = document.querySelectorAll(".tel"),
      spinner = document.querySelectorAll(".spinner"),
      formTitle = document.querySelectorAll(".contacts-form-title"),
      success = document.querySelectorAll(".success");
    submitButtons.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        let index = submitButtons.indexOf(item),
          tel = telInputs[index].value,
          name = nameInputs[index].value;
        if (
          name.length < 1 ||
          (tel.includes("+") && tel.length != 13) ||
          (!tel.includes("+") && tel.includes("38") && tel.length != 12) ||
          tel.length < 10
        ) {
          formTitle[index].innerHTML =
            "Помилка!<span> Перевірте коректність даних</span>";
          setTimeout(() => {
            formTitle[index].innerHTML =
              "Заповніть форму <span>Ми зв`яжемося з вами якнайшвидше</span>";
            nameInputs[index].value = "";
            telInputs[index].value = "+380";
          }, 2000);
          return;
        } else {
          nameInputs[index].style.display = "none";
          telInputs[index].style.display = "none";
          spinner[index].style.display = "flex";
          spinner[index].style.marginBottom = "90px";
          submitButtons[index].style.display = "none";
          // %2B = plus
          axios
            .post(
              `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=Имя: ${name}%0AНомер: ${tel}`
            )
            .then(() => {
              spinner[index].style.display = "none";
              success[index].style.display = "block";
              formTitle[index].innerHTML =
                "Спасибо! <span>Ваша заявка принята</span>";
              setTimeout(() => {
                success[index].style.display = "none";
                nameInputs[index].style.display = "flex";
                telInputs[index].style.display = "flex";
                formTitle[index].innerHTML =
                  "Заповніть форму <span>Ми зв`яжемося з вами якнайшвидше</span>";
                submitButtons[index].style.display = "block";
                nameInputs[index].value = "";
                telInputs[index].value = "+380";
              }, 2000);
            })
            .catch(function (error) {
              formTitle[index].innerHTML =
                "Помилка!<span> Спробуйте ще раз пізніше</span>";
              setTimeout(() => {
                formTitle[index].innerHTML =
                  "Заповніть форму <span>Ми зв`яжемося з вами якнайшвидше</span>";
                nameInputs[index].value = "";
                telInputs[index].value = "+380";
              }, 2000);
            });
        }
      });
    });
  });

  // Equip Items

  const equip = document.querySelector(".filter"),
    equipDot = document.querySelectorAll(".equip-dot"),
    rode = document.querySelector("#rode");
  let equipArr = [...equipDot],
    dotActive = false;
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
        equipArr.forEach((item) => {
          dotActive = false;
          item.firstElementChild.style.opacity = "0";
          // item.firstElementChild.style.display = "none";
          equipArr[equipArr.indexOf(a)].firstElementChild.style.display =
            "flex";
        });

        setTimeout(() => {
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

  // Navigation

  const navItems = document.querySelectorAll("nav ul li"),
    navArr = [...navItems],
    toContactsButton = document.querySelector(
      ".intro-content-buttons button:nth-child(2)"
    ),
    logo = document.querySelector(".logo");
  toContactsButton.addEventListener("click", () => {
    fullpage_api.moveTo(6);
  });
  logo.addEventListener("click", () => {
    fullpage_api.moveTo(1);
  });
  const adress = document.querySelector("#adress");
  navArr.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(fullpage_api.getActiveSection());

      if (e.target === navArr[0]) {
        fullpage_api.moveTo(3);
      }
      if (e.target === navArr[1]) {
        fullpage_api.moveTo(6);
      }
      if (e.target === navArr[2]) {
        fullpage_api.moveTo(4);
      }
    });
  });

  adress.addEventListener("click", () => {
    fullpage_api.moveTo(6);
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
      nav.animate([{ height: "30vh" }], { duration: 200, fill: "forwards" });
      navUl.style.display = "flex ";
    } else {
      navBurger.removeAttribute("class", "open");
      nav.animate([{ height: "10vh" }], { duration: 200, fill: "forwards" });
      navUl.style.display = "none";
    }
  });
  navLi.forEach((item) => {
    item.addEventListener("click", () => {
      if (window.innerWidth < 600) {
        burgerActive = false;
        navBurger.removeAttribute("class", "open");
        nav.animate([{ height: "10vh" }], { duration: 200, fill: "forwards" });
        navUl.style.display = "none";
      }
    });
  });
});

// Responsive fix iphone

window.addEventListener("resize", (e) => {
  if (window.innerWidth < 1000) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
