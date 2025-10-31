const slider = document.querySelector(".slider");
const dots = document.querySelectorAll(".slider-nav a");
const slides = document.querySelectorAll(
  ".slider img#slide-1, .slider img#slide-2, .slider img#slide-3"
);
const trailer = document.querySelector(".trailer-anchor"); // trailer anchor tag

//URls for trailer
const paramSundariUrl =
  "https://www.youtube.com/watch?v=fdWnfzsx-ks&list=RDfdWnfzsx-ks&start_radio=1";
const lazarusUrl = "https://www.youtube.com/watch?v=MjP-63ZG74I";
const edenUrl = "https://www.youtube.com/watch?v=2HRB36E5N6g";

//Default active dot for slide1:
dots[0].classList.add("active");

// Detect which image is most in view
slider.addEventListener("scroll", () => {
  let index = 0;
  let minDiff = Infinity;
  let timeout;

  //TODO For trailer visuals / UI
  // Hide button immediately
  trailer.classList.add("hidden");

  // Clear previous timeout
  clearTimeout(timeout);

  // Show button after 300ms of no scrolling
  timeout = setTimeout(() => {
    trailer.classList.remove("hidden");
  }, 300);

  slides.forEach((slide, i) => {
    // Get the distance of each slide from the left edge of the viewport
    const diff = Math.abs(slide.getBoundingClientRect().left);
    if (diff < minDiff) {
      minDiff = diff;
      index = i;
    }
  });

  //Show trailer according to index of the image on slider displayed
  if (index === 0) {
    trailer.href = paramSundariUrl;
  }

  if (index === 1) {
    trailer.href = lazarusUrl;
  }

  if (index === 2) {
    trailer.href = edenUrl;
  }

  // Remove "active" class from all dots
  dots.forEach((dot) => dot.classList.remove("active"));
  // Add "active" to the current one
  dots[index].classList.add("active");
});

// For keyboard control :

function goToSlide(i) {
  const slideWidth = slides[0].offsetWidth;
  slider.scrollTo({
    left: slideWidth * i,
    behavior: "smooth",
  });
}

// Handle keyboard arrows
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    index++;
    if (index >= slides.length) index = 0; // loop back
    goToSlide(index);
  } else if (e.key === "ArrowLeft") {
    index--;
    if (index < 0) index = slides.length - 1; // loop back
    goToSlide(index);
  }
});

