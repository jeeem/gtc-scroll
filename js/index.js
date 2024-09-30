// Import the necessary function for preloading images
import { preloadImages, getGrid } from "./utils.js";

// let isMobileScreen = window.innerWidth < 900;
// window.addEventListener("resize", () => {
//   isMobileScreen = window.innerWidth < 900;
// });

// Define a variable that will store the Lenis smooth scrolling object
let lenis;

// Sticky Nav
const firtSectionHTMLOffsetTop = document.querySelector(
  "#tourBrandingSection"
).offsetTop;
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
const grids = document.querySelectorAll(".grid.isDesktop");
const masonryWraps = document.querySelectorAll(
  ".masonry-wrapper-desktop.withScrollAnimation"
);

// Function to apply scroll-triggered animations to a given gallery Masonry
const applyAnimationMasonry = (masonry) => {
  const masonryItems = masonry.querySelectorAll(".masonry-item");
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: masonry,
      start: "top bottom+=5%",
      end: "bottom top-=5%",
      scrub: true,
    },
  });

  const centerItems = [];
  const outerItems = [];
  masonryItems.forEach((item, i) =>
    i % 3 === 1 ? centerItems.push(item) : outerItems.push(item)
  );

  timeline
    .set(centerItems, {
      y: "-=200",
    })
    .set(outerItems, {
      y: "+=200",
    })
    .to(centerItems, {
      y: "+=400",
      ease: "power2",
      z: 500,
    })
    .to(outerItems, {
      y: "-=400",
      ease: "power2",
      z: 500,
    });
};

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

    case "galleryBacktoForward":
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

    case "galleryScrollLeft":
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

    case "scrollUpTwirl":
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

    case "galleryScrollRight":
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

    case "galleryCenterImageStaggerScroll":
      // Set some CSS related style values
      grid.style.setProperty("--grid-width", "100%");
      grid.style.setProperty("--grid-columns", "3");
      grid.style.setProperty("--grid-gap", "1rem");
      const centerItems = [];
      const outerItems = [];
      gridItems.forEach((item, i) =>
        i % 3 === 1 ? centerItems.push(item) : outerItems.push(item)
      );

      timeline
        .set(gridWrap, {
          transformStyle: "unset",
        })
        .set(centerItems, {
          y: "-=200",
        })
        .set(outerItems, {
          y: "+=200",
        })
        .to(centerItems, {
          y: "+=200",
          ease: "power2",
          z: 500,
        })
        .to(outerItems, {
          y: "-=200",
          ease: "power2",
          z: 500,
        });
      break;
    default:
      console.error("Unknown animation type.");
      break;
  }
};

// Apply animations to each grid
const scroll = () => {
  // grids.forEach((grid, i) => {
  //   // Determine animation type
  //   let animationType;
  //   switch (i % 6) {
  //     case 0:
  //       // Tour section
  //       animationType = "galleryScrollLeft";
  //       break;
  //     default:
  //       animationType = "galleryCenterImageStaggerScroll";
  //       break;
  //   }
  //   applyAnimation(grid, animationType);
  // });
  masonryWraps.forEach((masonry) => applyAnimationMasonry(masonry));
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

// Masonry Functionality
let masonryFn = () => {
  let elems = document.querySelectorAll(
    ".masonry-container [class*='masonry-wrapper']"
  );

  elems.forEach((elem) => {
    return new Masonry(elem, {
      itemSelector: ".masonry-item",
      percentPosition: true,
      horizontalOrder: true,
      gutter: 10,
    });
  });
};

// Preload images, initialize smooth scrolling, apply scroll-triggered animations, and remove loading class from body
preloadImages("img.masonry-item").then(() => {
  initSmoothScrolling();
  setTimeout(() => window.scrollTo(0, 0), 300);
  masonryFn();
  scroll();
  document.body.classList.remove("loading");
});

const nameForm = document.querySelector('#nameForm');
const emailForm = document.querySelector('#emailForm');
const bodyForm = document.querySelector('#bodyForm');
const formSubmit = document.querySelector('#submitButton');

const formChanged = () => {
  const emailContent = emailForm.value;
  const bodyContent = bodyForm.value;

  if (emailContent.length) {
    formSubmit.disabled = false;
  } else {
    formSubmit.disabled = true
  }
}

const contactFormCallback = (e) => {
  const emailContent = emailForm.value;
  const bodyContent = bodyForm.value;

  const jsonObject = { name: nameForm.value ? nameForm.value : emailContent, email: emailContent, message : bodyContent };

  fetch('https://www.globaltourcreatives.com/api/?get=contactForm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonObject)
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });
}

formSubmit.addEventListener("click", (event) => {
  contactFormCallback();
});

emailForm.addEventListener("change", () => {
  formChanged();
})

bodyForm.addEventListener("change", () => {
  formChanged();
})