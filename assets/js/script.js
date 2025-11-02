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

// PROJECT MODAL (Portfolio detail)
const projectItems = document.querySelectorAll(
  ".project-item [data-project-open]"
);
const projectModalContainer = document.querySelector(
  "[data-project-modal-container]"
);
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalCloseBtn = document.querySelector(
  "[data-project-modal-close-btn]"
);
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalBody = document.querySelector("[data-project-modal-body]");
const projectPrevBtn = document.querySelector("[data-project-prev]");
const projectNextBtn = document.querySelector("[data-project-next]");

let currentProjectList = [];
let currentProjectIndex = -1;

const renderProjectFromItem = function (item) {
  if (!item) return;
  const title = item.getAttribute("data-project-title") || "Project";
  const videoSrc = item.getAttribute("data-video");
  const poster = item.getAttribute("data-poster") || "";
  const imagesAttr = item.getAttribute("data-images") || "";
  const images = imagesAttr
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  projectModalTitle.textContent = title;
  if (videoSrc) {
    projectModalBody.innerHTML =
      '<figure class="project-detail-img"><video controls autoplay playsinline poster="' +
      poster +
      '" style="width:100%;border-radius:12px"><source src="' +
      videoSrc +
      '" type="video/mp4"></video></figure>';
  } else {
    projectModalBody.innerHTML = images
      .map(
        (src) =>
          '<figure class="project-detail-img"><img src="' +
          src +
          '" alt="' +
          title +
          '" loading="lazy"/></figure>'
      )
      .join("");
  }
};

const toggleProjectModal = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
};

for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();
    const item = this.closest(".project-item");
    currentProjectList = Array.from(
      document.querySelectorAll(".project-item.active")
    );
    currentProjectIndex = currentProjectList.indexOf(item);
    renderProjectFromItem(item);

    toggleProjectModal();
    const showNav = currentProjectList.length > 1;
    if (projectPrevBtn)
      projectPrevBtn.style.display = showNav ? "flex" : "none";
    if (projectNextBtn)
      projectNextBtn.style.display = showNav ? "flex" : "none";
  });
}

projectModalCloseBtn &&
  projectModalCloseBtn.addEventListener("click", toggleProjectModal);
projectOverlay && projectOverlay.addEventListener("click", toggleProjectModal);

// Pause video when modal closes
document.addEventListener("click", function (e) {
  const closeClicked =
    e.target.closest("[data-project-modal-close-btn]") ||
    e.target.closest("[data-project-overlay]");
  if (!closeClicked) return;
  const vid = projectModalBody && projectModalBody.querySelector("video");
  if (vid) {
    try {
      vid.pause();
    } catch (_) {}
  }
});

// Navigate to contact from project modal CTA
document.addEventListener("click", function (e) {
  const target = e.target.closest(".project-cta");
  if (!target) return;
  e.preventDefault();
  toggleProjectModal();
  for (let i = 0; i < navigationLinks.length; i++) {
    if (navigationLinks[i].innerText.trim().toLowerCase() === "contact") {
      navigationLinks[i].click();
      break;
    }
  }
});

// Next/Prev navigation inside project modal
projectNextBtn &&
  projectNextBtn.addEventListener("click", function () {
    if (!currentProjectList.length) return;
    currentProjectIndex = (currentProjectIndex + 1) % currentProjectList.length;
    renderProjectFromItem(currentProjectList[currentProjectIndex]);
  });

projectPrevBtn &&
  projectPrevBtn.addEventListener("click", function () {
    if (!currentProjectList.length) return;
    currentProjectIndex =
      (currentProjectIndex - 1 + currentProjectList.length) %
      currentProjectList.length;
    renderProjectFromItem(currentProjectList[currentProjectIndex]);
  });
