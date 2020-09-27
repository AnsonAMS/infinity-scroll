// const imageContainer = document.getElementById('image-container');
// const loader = document.getElementById('loader');

// let ready = false;
// let imageLoaded = 0;
// let totalImages = 0;
// let photosArray = [];

// // Unsplash API
// const count = 30;
// const apiKey = 'Bt6arDry4iLwKX_Ft3Nqph41BV-LRexY5IowjtNcQ2U';
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// // Check if all image were loaded
// function imageLoaded() {
//     imagesLoaded++;
//     if (imageLoaded === totalImages) {
//         ready = true;
//         loader.hidden = true;
//     }
// }

// // Helper Function to Set Attributes on DOM Elements
// function setAttributes(element, attributes) {
//     for (const key in attributes) {
//       element.setAttribute(key, attributes[key]);
//     }
// }

// // Create Elements For Links & Photos, Add to DOM
// function displayPhotos(){
//     imagesLoaded = 0;
//     totalImages = photosArray.length;
//     // Run function for each object in photosArray
//     photosArray.forEach((photo) => {
//       // Create <a> to link to Unsplash
//       const item = document.createElement('a');
//       setAttributes(item, {
//         href: photo.links.html,
//         target: '_blank',
//       });
//       // Create <img> for photo
//       const img = document.createElement('img');
//       setAttributes()(img, {
//           src: photo.urls.regular,
//           alt: photo.alt_description,
//           title: photo.alt_description,
//       });
//       // Event Listener, check when each is finished loading
//       img.addEventListener('load', imageLoaded);

//       // Put <img> inside <a>, then put both inside imageContainer Element
//       item.appendChild(img);
//       imageContainer.appendChild(item); 
//     });
// }
// // Get photo from Unsplash API
// async function getPhotos() {
//     try {
//       const response = await fetch(apiURL);
//       photosArray = await response.json();
//       displayPhotos();
//     } catch (error) {
//         // Catch Error Here
//     }
// }
// // Check to see if scrolling near bottom of page, Load More Photos
// window.addEventListener('scroll', () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
//         ready = false;
//         getPhotos();
//     }
// });
// // On Load
// getPhotos(); 

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;


// Unsplash API
let initialCount = 5;
const apiKey = 'Bt6arDry4iLwKX_Ft3Nqph41BV-LRexY5IowjtNcQ2U';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// Helper function to update the apiUrl after the initial loading
function updateAPIURLWithNewCount(picturesCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picturesCount}`;
}

// Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Create Elements for the Links and the Photos and add them to the DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // loop the array to create the anchor tag
  photosArray.forEach(photo => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });
    // Create image for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });
    // Event listener, check when each photo is loaded
    img.addEventListener('load', imageLoaded);
    // Put <img> inside the <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    // Catch Error Here
    console.log("Oops, we have an error: ", error);
  }
}

// Check if we are scrolling near the bottom of the page, and then load new images
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();