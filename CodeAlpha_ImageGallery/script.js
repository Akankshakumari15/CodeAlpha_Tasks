let currentIndex = 0;
let visibleImages = [];

// Get all images once and store them
const allImages = document.querySelectorAll(".gallery img");

/**
 * FILTER IMAGES
 * This needs to run first to set the display styles.
 */
function filterImages(category) {
  allImages.forEach((img) => {
    if (category === "all" || img.dataset.category === category) {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });
}

/**
 * LOAD VISIBLE IMAGES
 * Updated to handle the initial empty string state.
 */
function loadVisibleImages() {
  visibleImages = Array.from(allImages).filter(
    // An image is visible if display isn't "none" 
    // (Initial state is usually "" which is also visible)
    img => img.style.display !== "none"
  );
}

/**
 * OPEN LIGHTBOX
 */
function openLightbox(index) {
  loadVisibleImages();

  // Find the image that was actually clicked based on the original index
  const clickedImage = allImages[index];
  
  // Set our currentIndex based on where that image sits in the FILTERED list
  currentIndex = visibleImages.indexOf(clickedImage);

  // If for some reason the index is -1, default to 0
  if (currentIndex === -1) currentIndex = 0;

  document.getElementById("lightbox").style.display = "flex";
  showImage();
}

function showImage() {
  if (visibleImages.length > 0) {
    document.getElementById("lightbox-img").src = visibleImages[currentIndex].src;
  }
}

function nextImage() {
  if (visibleImages.length === 0) return;
  currentIndex = (currentIndex + 1) % visibleImages.length;
  showImage();
}

function prevImage() {
  if (visibleImages.length === 0) return;
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  showImage();
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}