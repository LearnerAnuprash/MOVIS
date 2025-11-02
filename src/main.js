const slider = document.querySelector(".slider");
const dots = document.querySelectorAll(".slider-nav a");
const slides = document.querySelectorAll(
  ".slider img#slide-1, .slider img#slide-2, .slider img#slide-3"
);
const trailer = document.querySelector(".trailer-anchor"); // trailer anchor tag

let trendingImage1 = document.querySelector(".t-1");
let trendingImage2 = document.querySelector(".t-2");
let trendingImage3 = document.querySelector(".t-3");

//URls for trailer
const paramSundariUrl =
  "https://www.youtube.com/watch?v=fdWnfzsx-ks&list=RDfdWnfzsx-ks&start_radio=1";
const lazarusUrl = "https://www.youtube.com/watch?v=MjP-63ZG74I";
const edenUrl = "https://www.youtube.com/watch?v=2HRB36E5N6g";

//Default active dot for slide1:
dots[0].classList.add("active");

let timeout;

//API Call for trending section

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGQyMTBhNzgzYWI4ZmQwMzVkZjAyNzk1ZDViYmJmZSIsIm5iZiI6MTc2MTk2NTk4OS42MjIwMDAyLCJzdWIiOiI2OTA1NzdhNWZiODcxOTIzMDJlMTI0MjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tdwcSCJ1Lyy0mxIk5MMw0MV4MGJ3J97U-Ml6s1InHKc",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((res) => res.json())

  .then((data) => {
    trendingImage1.src = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
    trendingImage2.src = `https://image.tmdb.org/t/p/w500${data.results[1].poster_path}`;
    trendingImage3.src = `https://image.tmdb.org/t/p/w500${data.results[2].poster_path}`;
  })

  .catch((err) => console.error(err));

// Detect which image is most in view
slider.addEventListener("scroll", () => {
  let index = 0;
  let minDiff = Infinity;

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
