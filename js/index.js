// Import the necessary function for preloading images
import { preloadImages, getGrid } from "./utils.js";

// Define a variable that will store the Lenis smooth scrolling object
let lenis;

// Sticky Nav
const firtSectionHTMLOffsetTop =
  document.querySelector("#circleAnimation1").offsetTop;
const mainHTML = document.querySelector("main");
const navHTML = document.querySelector(".nav-outer");

window.addEventListener("scroll", function () {
  if (this.scrollY > firtSectionHTMLOffsetTop) {
    navHTML.classList.add("sticky");
    mainHTML.classList.add("with-sticky");
  } else {
    navHTML.classList.remove("sticky");
    mainHTML.classList.remove("with-sticky");
  }
});

// Function to initialize Lenis for smooth scrolling
const initSmoothScrolling = () => {
  // Instantiate the Lenis object with specified properties
  lenis = new Lenis({
    lerp: 0.1, // Lower values create a smoother scroll effect
    smoothWheel: true, // Enables smooth scrolling for mouse wheel events
  });

  // Update ScrollTrigger each time the user scrolls
  lenis.on("scroll", () => ScrollTrigger.update());

  // Define a function to run at each animation frame
  const scrollFn = (time) => {
    lenis.raf(time); // Run Lenis' requestAnimationFrame method
    requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
  };
  // Start the animation frame loop
  requestAnimationFrame(scrollFn);
};

// All elements with class .grid
const grids = document.querySelectorAll(".grid");

// Function to apply scroll-triggered animations to a given gallery
const applyAnimation = (grid, animationType) => {
  // Child elements of grid
  const gridWrap = grid.querySelector(".grid-wrap");
  const gridItems = grid.querySelectorAll(".grid__item");
  const gridItemsInner = [...gridItems].map((item) =>
    item.querySelector(".grid__item-inner")
  );

  // Define GSAP timeline with ScrollTrigger
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: gridWrap,
      start: "top bottom+=5%",
      end: "bottom top-=5%",
      scrub: true,
    },
  });

  // Apply different animations based on type
  switch (animationType) {
    case "type1":
      // Set some CSS related style values
      grid.style.setProperty("--perspective", "1000px");
      grid.style.setProperty("--grid-inner-scale", "0.5");

      timeline
        .set(gridWrap, {
          rotationY: 25,
        })
        .set(gridItems, {
          z: () => gsap.utils.random(-1600, 200),
        })
        .fromTo(
          gridItems,
          {
            xPercent: () => gsap.utils.random(-1000, -500),
          },
          {
            xPercent: () => gsap.utils.random(500, 1000),
          },
          0
        )
        .fromTo(
          gridItemsInner,
          {
            scale: 2,
          },
          {
            scale: 0.5,
          },
          0
        );

      break;

    case "type2":
      // Set some CSS related style values
      grid.style.setProperty("--perspective", "2500px");
      grid.style.setProperty("--grid-width", "100%");
      grid.style.setProperty("--grid-gap", "6");
      grid.style.setProperty("--grid-columns", "3");
      grid.style.setProperty("--grid-item-ratio", "1");

      // grid.style.setProperty('--grid-width', '160%');
      // grid.style.setProperty('--perspective', '2000px');
      // grid.style.setProperty('--grid-inner-scale', '0.5');
      // grid.style.setProperty('--grid-item-ratio', '0.8');
      // grid.style.setProperty('--grid-columns', '6');
      // grid.style.setProperty('--grid-gap', '14vw');

      timeline
        .set(gridWrap, {
          rotationX: 20,
        })
        .set(gridItems, {
          z: () => gsap.utils.random(-3000, -1000),
        })
        .fromTo(
          gridItems,
          {
            yPercent: () => gsap.utils.random(100, 1000),
            rotationY: -45,
            filter: "brightness(200%)",
          },
          {
            ease: "power2",
            yPercent: () => gsap.utils.random(-1000, -100),
            rotationY: 45,
            filter: "brightness(0%)",
          },
          0
        )
        .fromTo(
          gridWrap,
          {
            rotationZ: -5,
          },
          {
            rotationX: -20,
            rotationZ: 10,
            scale: 1.2,
          },
          0
        )
        .fromTo(
          gridItemsInner,
          {
            scale: 2,
          },
          {
            scale: 0.5,
          },
          0
        );

      break;

    case "type3":
      // Set some CSS related style values
      grid.style.setProperty("--grid-width", "105%");
      grid.style.setProperty("--grid-columns", "8");
      grid.style.setProperty("--perspective", "1500px");
      grid.style.setProperty("--grid-inner-scale", "0.5");

      timeline
        .set(gridItems, {
          transformOrigin: "50% 0%",
          z: () => gsap.utils.random(-5000, -2000),
          rotationX: () => gsap.utils.random(-65, -25),
          filter: "brightness(0%)",
        })
        .to(
          gridItems,
          {
            xPercent: () => gsap.utils.random(-150, 150),
            yPercent: () => gsap.utils.random(-300, 300),
            rotationX: 0,
            filter: "brightness(200%)",
          },
          0
        )
        .to(
          gridWrap,
          {
            z: 6500,
          },
          0
        )
        .fromTo(
          gridItemsInner,
          {
            scale: 2,
          },
          {
            scale: 0.5,
          },
          0
        );

      break;

    case "type4":
      // Set some CSS related style values
      grid.style.setProperty("--grid-width", "50%");
      grid.style.setProperty("--perspective", "3000px");
      grid.style.setProperty("--grid-item-ratio", "0.8");
      grid.style.setProperty("--grid-columns", "3");
      grid.style.setProperty("--grid-gap", "1vw");

      timeline
        .set(gridWrap, {
          transformOrigin: "0% 50%",
          rotationY: 30,
          xPercent: -75,
        })
        .set(gridItems, {
          transformOrigin: "50% 0%",
        })
        .to(
          gridItems,
          {
            duration: 0.5,
            ease: "power2",
            z: 500,
            stagger: 0.04,
          },
          0
        )
        .to(
          gridItems,
          {
            duration: 0.5,
            ease: "power2.in",
            z: 0,
            stagger: 0.04,
          },
          0.5
        )
        .fromTo(
          gridItems,
          {
            rotationX: -70,
            filter: "brightness(120%)",
          },
          {
            duration: 1,
            rotationX: 70,
            filter: "brightness(0%)",
            stagger: 0.04,
          },
          0
        );

      break;

    case "type5":
      // Set some CSS related style values
      grid.style.setProperty("--grid-width", "120%");
      grid.style.setProperty("--grid-columns", "8");
      grid.style.setProperty("--grid-gap", "0");

      const gridObj = getGrid(gridItems);

      timeline
        .set(gridWrap, {
          rotationX: 50,
        })
        .to(gridWrap, {
          rotationX: 30,
        })
        .fromTo(
          gridItems,
          {
            filter: "brightness(0%)",
          },
          {
            filter: "brightness(100%)",
          },
          0
        )
        .to(
          gridObj.rows("even"),
          {
            xPercent: -100,
            ease: "power1",
          },
          0
        )
        .to(
          gridObj.rows("odd"),
          {
            xPercent: 100,
            ease: "power1",
          },
          0
        )
        .addLabel("rowsEnd", ">-=0.15")
        .to(
          gridItems,
          {
            ease: "power1",
            yPercent: () => gsap.utils.random(-100, 200),
          },
          "rowsEnd"
        );
      break;

    case "type6":
      // Set some CSS related style values
      grid.style.setProperty("--perspective", "2500px");
      grid.style.setProperty("--grid-width", "100%");
      grid.style.setProperty("--grid-gap", "6");
      grid.style.setProperty("--grid-columns", "3");
      grid.style.setProperty("--grid-item-ratio", "1");

      timeline.fromTo(
        gridItems,
        {
          transformOrigin: "50% 200%",
          rotationX: 0,
          yPercent: 400,
        },
        {
          yPercent: 0,
          rotationY: 360,
          opacity: 0.2,
          scale: 0.8,
          stagger: 0.03,
        }
      );

      break;

    case "type7":
      // Set some CSS related style values
      grid.style.setProperty("--grid-width", "50%");
      grid.style.setProperty("--perspective", "3000px");
      grid.style.setProperty("--grid-item-ratio", "0.8");
      grid.style.setProperty("--grid-columns", "3");
      grid.style.setProperty("--grid-gap", "1vw");

      timeline
        .set(gridWrap, {
          transformOrigin: "50% 0%",
          rotationY: -30,
          xPercent: 75,
        })
        .set(gridItems, {
          transformOrigin: "0% 50%",
        })
        .to(
          gridItems,
          {
            duration: 0.5,
            ease: "power2",
            z: 500,
            stagger: 0.04,
          },
          0
        )
        .to(
          gridItems,
          {
            duration: 0.5,
            ease: "power2.in",
            z: 0,
            stagger: 0.04,
          },
          0.5
        )
        .fromTo(
          gridItems,
          {
            rotationX: -70,
            filter: "brightness(120%)",
          },
          {
            duration: 1,
            rotationX: 70,
            filter: "brightness(0%)",
            stagger: 0.04,
          },
          0
        );

      break;
    default:
      console.error("Unknown animation type.");
      break;
  }
};

// var tl1 = gsap.timeline(
//   /*{repeat: 2, repeatDelay: 1}*/
//   {
//     // yes, we can add it to an entire timeline!
//     scrollTrigger: {
//       trigger: "#circleAnimation1",
//       //   pin: true, // pin the trigger element while active
//       // toggleActions: "play none none pause",
//       start: "top bottom", // when the top of the trigger hits the top of the viewport
//       end: "+=300", // end after scrolling 500px beyond the start
//       // scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
//     },
//   }
// );
// tl1.to("#circleAnimation1", { clipPath: "ellipse(50vw 50vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", { clipPath: "ellipse(50vw 50vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", { clipPath: "ellipse(50vw 50vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", { clipPath: "ellipse(50vw 50vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", { clipPath: "ellipse(50vw 50vw at 50% 50vw)" });

// tl1.to("#circleAnimation1", { clipPath: "ellipse(75vw 75vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", { clipPath: "ellipse(150vw 150vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", { clipPath: "ellipse(300vw 300vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", { clipPath: "ellipse(800vw 800vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", { clipPath: "ellipse(2000vw 2000vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", {
//   clipPath: "ellipse(10000vw 10000vw at 50% 50vw)",
// });

// tl1.to("#circleAnimation1", { clipPath: "circle(50vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", { clipPath: "circle(75vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", { clipPath: "circle(100vw at 50% 50vw)" });
// tl1.to("#circleAnimation1", { clipPath: "circle(10000px at 50% 50vw)" });

// tl1.to("#circleAnimation1", { clipPath: "circle(25vw at 50% 0%)" });
// tl1.to("#circleAnimation1", { clipPath: "circle(50vw at 50% 0%)" });
// tl1.to("#circleAnimation1", { clipPath: "circle(100vw at 50% 300px)" });
// tl1.to("#circleAnimation1", { clipPath: "circle(10000px at 50% 300px)" });

// var tl2 = gsap.timeline(
//   /*{repeat: 2, repeatDelay: 1}*/
//   {
//     // yes, we can add it to an entire timeline!
//     scrollTrigger: {
//       trigger: "#circleAnimation2",
//       // pin: true, // pin the trigger element while active
//       start: "top bottom", // when the top of the trigger hits the top of the viewport
//       end: "+=300", // end after scrolling 500px beyond the start
//       // scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
//     },
//   }
// );

// tl2.to("#circleAnimation2", { backgroundColor: "white" });

// tl2.to("#circleAnimation2", { clipPath: "ellipse(50vw 50vw at 50% 50vw)" });
// tl2.to("#circleAnimation2", { clipPath: "ellipse(75vw 75vw at 50% 50vw)" });
// tl2.to("#circleAnimation2", { clipPath: "ellipse(150vw 150vw at 50% 50vw)" });
// tl2.to("#circleAnimation2", { clipPath: "ellipse(300vw 300vw at 50% 50vw)" });
// tl2.to("#circleAnimation2", { clipPath: "ellipse(800vw 800vw at 50% 50vw)" });
// tl2.to("#circleAnimation2", { clipPath: "ellipse(2000vw 2000vw at 50% 50vw)" });
// tl2.to("#circleAnimation2", {
//   clipPath: "ellipse(10000vw 10000vw at 50% 50vw)",
// });

// var tl3 = gsap.timeline(
//   /*{repeat: 2, repeatDelay: 1}*/
//   {
//     // yes, we can add it to an entire timeline!
//     scrollTrigger: {
//       trigger: "#circleAnimation3",
//       // pin: true, // pin the trigger element while active
//       start: "top bottom", // when the top of the trigger hits the top of the viewport
//       end: "+=500", // end after scrolling 500px beyond the start
//       // scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
//     },
//   }
// );
// tl3.to("#circleAnimation3", { clipPath: "ellipse(50vw 50vw at 50% 50vw)" });
// tl3.to("#circleAnimation3", { clipPath: "ellipse(75vw 75vw at 50% 50vw)" });
// tl3.to("#circleAnimation3", { clipPath: "ellipse(150vw 150vw at 50% 50vw)" });
// tl3.to("#circleAnimation3", { clipPath: "ellipse(300vw 300vw at 50% 50vw)" });
// tl3.to("#circleAnimation3", { clipPath: "ellipse(800vw 800vw at 50% 50vw)" });
// tl3.to("#circleAnimation3", { clipPath: "ellipse(2000vw 2000vw at 50% 50vw)" });
// tl3.to("#circleAnimation3", {
//   clipPath: "ellipse(10000vw 10000vw at 50% 50vw)",
// });

// var tl4 = gsap.timeline(
//   /*{repeat: 2, repeatDelay: 1}*/
//   {
//     // yes, we can add it to an entire timeline!
//     scrollTrigger: {
//       trigger: "#circleAnimation4",
//       // pin: true, // pin the trigger element while active
//       start: "top +=200", // when the top of the trigger hits the top of the viewport
//       end: "+=800", // end after scrolling 500px beyond the start
//       // scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
//     },
//   }
// );
// tl4.to("#circleAnimation4", { clipPath: "circle(50vw at 50% 60vw)" });
// tl4.to("#circleAnimation4", { clipPath: "circle(75vw at 50% 50vw)" });
// tl4.to("#circleAnimation4", { clipPath: "circle(100vw at 50% 50vw)" });
// tl4.to("#circleAnimation4", { clipPath: "circle(10000px at 50% 300px)" });
// // then we can control the whole thing easily...
// tl.pause();
// tl.resume();
// tl.seek(1.5);
// tl.reverse();

// Apply animations to each grid
const scroll = () => {
  grids.forEach((grid, i) => {
    // Determine animation type
    let animationType;
    switch (i % 6) {
      case 0:
        animationType = "type4";
        break;
      case 1:
        animationType = "type7";
        break;
      case 2:
        animationType = "type7";
        break;
      default:
        animationType = "type4";
        break;
    }
    applyAnimation(grid, animationType);
  });
};

// Scroll to feature
// Add class "scrollTo-[id]"
const scrollToBtns = document.querySelectorAll("[class*='scrollTo-']");

function getTargetElement(classList) {
  const scrollToClass = classList.findIndex((element) =>
    element.includes("scrollTo-")
  );
  return classList[scrollToClass].slice(9);
}

scrollToBtns.forEach((btn) => {
  const targetElmClass = getTargetElement([...btn.classList]);
  const targetElmHtml = document.querySelector(`#${targetElmClass}`);
  btn.addEventListener(
    "click",
    function (e) {
      window.scroll({
        top: targetElmHtml.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    },
    false
  );
});

// Mobile Hamburger Menu
const hamburgerIconHTML = document.querySelector(".mobile-hamburger--icon");
const mobileNavHTML = document.querySelector(".mobile-nav");
const mobileScrollToBtns = document.querySelectorAll(
  ".mobile-nav [class*='scrollTo-']"
);
const mobileNavX = document.querySelector(".mobile-nav-x--icon");

mobileNavX.addEventListener("click", () => {
  mobileNavHTML.classList.remove("active");
});

mobileScrollToBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    mobileNavHTML.classList.remove("active");
  });
});

hamburgerIconHTML.addEventListener("click", () => {
  mobileNavHTML.classList.add("active");
});

// Resize galery text content to fit in mobile
const textContainerHtmls = document.querySelectorAll(".text-container");
const gallerySectionHtmls = document.querySelectorAll(".gallery-section");
const isMobileScreen = window.screen.width < "900px";

function resizegallerySections() {
  gallerySectionHtmls.forEach((section, i) => {
    const textContainerHeight =
      textContainerHtmls[i].getBoundingClientRect().height;
    section.style.minHeight = `${textContainerHeight * 1.25}px`;
    console.log(section.style.minHeight);
  });
}

if (isMobileScreen) window.onload = resizegallerySections();
window.addEventListener("resize", function () {
  if (isMobileScreen) resizegallerySections();
});

// Contact for submit
const form = document.querySelector(".contactForm--form-message form");
const formBtn = document.querySelector(
  ".contactForm--form-message .contact-btn"
);
const formSuccessMessage = document.querySelector(
  ".contactForm--form-message .form-success"
);

formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.classList.toggle("hide");
  formSuccessMessage.classList.toggle("hide");
});

// Venues text Animation
const venueText = gsap.utils.toArray(
  ".text-container-section-3 .text-section-content"
);
const venueTextTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#circleAnimation3 .text-container-section-3 .text-block",
    start: "-=300 +=200",
    end: "bottom center",
    scrub: 1,
    // markers: true,
  },
});

const loadVenueScrollAnimation = () => {
  venueText.forEach((textBox) => {
    venueTextTL.from(textBox, { opacity: 0, x: -20 });
    venueTextTL.to(textBox, { opacity: 1, x: 20 });
    venueTextTL.to(textBox, { opacity: 0, x: -20, delay: 3 });
  });
};

window.onload = loadVenueScrollAnimation();

// Preload images, initialize smooth scrolling, apply scroll-triggered animations, and remove loading class from body
preloadImages(".grid__item-inner").then(() => {
  initSmoothScrolling();
  scroll();
  setTimeout(() => window.scrollTo(0, 0), 300);
  document.body.classList.remove("loading");
});
