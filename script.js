const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");

const ACCESS_KEY = "mc16wD8ikm3xrsmXj7yyPG4AJum0Cms9J1ZYk1ZNpGE";

let page = 1;
let query = "nature";
let isLoading = false;

/* Fetch Images */
async function fetchImages() {
  if (isLoading) return;
  isLoading = true;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=30&client_id=${ACCESS_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayImages(data.results);
    page++;
  } catch (error) {
    console.log("Error:", error);
  }

  isLoading = false;
}

/* Display Images */
function displayImages(images) {
  images.forEach(image => {
    const card = document.createElement("div");
    card.classList.add("image-card");

    const img = document.createElement("img");
    img.src = image.urls.small;
    img.alt = image.alt_description || "Image";

    const caption = document.createElement("div");
    caption.classList.add("caption");
    caption.innerText =
      image.alt_description || "Photo by " + image.user.name;

    card.appendChild(img);
    card.appendChild(caption);
    gallery.appendChild(card);
  });
}

/* Search */
searchInput.addEventListener("input", () => {
  query = searchInput.value.trim() || "nature";
  page = 1;
  gallery.innerHTML = "";
  fetchImages();
});

/* Infinite Scroll */
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
    fetchImages();
  }
});

/* Initial Load */
fetchImages();