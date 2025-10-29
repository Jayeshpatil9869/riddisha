"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// video modal variables
const videoModalContainer = document.querySelector(
  "[data-video-modal-container]"
);
const videoModalCloseBtn = document.querySelector(
  "[data-video-modal-close-btn]"
);
const videoOverlay = document.querySelector("[data-video-overlay]");
const portfolioVideo = document.getElementById("portfolio-video");
const videoWrapper = document.querySelector(".video-wrapper");
const projectItems = document.querySelectorAll(".project-item");

// Function to adjust video modal dimensions based on video orientation
const adjustVideoModalDimensions = function (videoElement) {
  // Check if video metadata is loaded
  if (videoElement.videoWidth && videoElement.videoHeight) {
    const isPortrait = videoElement.videoHeight > videoElement.videoWidth;

    if (isPortrait) {
      // Portrait video (vertical)
      videoWrapper.style.paddingBottom = "0"; // Remove padding-bottom
      videoWrapper.style.maxWidth = "56.25%"; // Limit width for portrait videos
      videoWrapper.style.margin = "0 auto"; // Center the video
      videoWrapper.style.height = "70vh"; // Set fixed height constraint (70% of viewport height)
      videoWrapper.style.aspectRatio = "9/16"; // Maintain aspect ratio
    } else {
      // Landscape video (horizontal)
      videoWrapper.style.paddingBottom = "56.25%"; // 16:9 aspect ratio
      videoWrapper.style.maxWidth = "100%"; // Full width for landscape videos
      videoWrapper.style.margin = "0"; // Reset margin
      videoWrapper.style.height = "auto"; // Auto height for landscape
      videoWrapper.style.aspectRatio = "auto"; // Reset aspect ratio
    }
  }
};

// video modal toggle function
const videoModalFunc = function () {
  videoModalContainer.classList.toggle("active");
  videoOverlay.classList.toggle("active");

  // Pause video when closing modal
  if (!videoModalContainer.classList.contains("active")) {
    portfolioVideo.pause();
  }
};

// add click event to all project items with video
for (let i = 0; i < projectItems.length; i++) {
  const projectItem = projectItems[i];
  const videoSrc = projectItem.getAttribute("data-video-src");

  if (videoSrc) {
    const iconBox = projectItem.querySelector(".project-item-icon-box");

    iconBox.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Set video source and load it
      portfolioVideo.querySelector("source").src = videoSrc;
      portfolioVideo.load();

      // Add event listener to adjust dimensions when metadata is loaded
      portfolioVideo.addEventListener(
        "loadedmetadata",
        function () {
          adjustVideoModalDimensions(portfolioVideo);
        },
        { once: true }
      );

      portfolioVideo.play();
      videoModalFunc();
    });
  }
}

// add click event to video modal close button
videoModalCloseBtn.addEventListener("click", videoModalFunc);
videoOverlay.addEventListener("click", videoModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
