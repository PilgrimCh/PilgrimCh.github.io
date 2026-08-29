const momentsSection = document.querySelector(".moments-section");
const albumHero = document.querySelector(".album-hero");

if (momentsSection && albumHero) {
  albumHero.before(momentsSection);
}

const momentLightbox = document.querySelector("#moment-lightbox");
const momentLightboxImage = momentLightbox?.querySelector("img");
const momentLightboxCaption = momentLightbox?.querySelector("figcaption span");
const momentLightboxDownload = momentLightbox?.querySelector("figcaption a");
const momentCloseButtons = momentLightbox?.querySelectorAll(
  ".moment-lightbox-close, .moment-lightbox-backdrop",
);

function openMomentLightbox(button) {
  if (!momentLightbox || !momentLightboxImage || !momentLightboxCaption || !momentLightboxDownload) {
    return;
  }

  const card = button.closest(".moment-card");
  const title = card?.querySelector("h3")?.textContent?.trim() ?? "";
  const meta = card?.querySelector("p")?.textContent?.trim() ?? "";
  const fullImage = button.dataset.full;

  if (!fullImage) {
    return;
  }

  momentLightboxImage.src = fullImage;
  momentLightboxImage.alt = button.querySelector("img")?.alt ?? "";
  momentLightboxCaption.textContent = meta ? `${title} · ${meta}` : title;
  momentLightboxDownload.href = fullImage;
  momentLightboxDownload.download = button.dataset.download || "";
  momentLightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  momentLightbox.querySelector(".moment-lightbox-close")?.focus();
}

function closeMomentLightbox() {
  if (!momentLightbox || !momentLightboxImage) {
    return;
  }

  momentLightbox.hidden = true;
  momentLightboxImage.removeAttribute("src");
  document.body.classList.remove("lightbox-open");
}

document.querySelectorAll(".moment-image-button").forEach((button) => {
  button.addEventListener("click", () => openMomentLightbox(button));
});

momentCloseButtons?.forEach((button) => {
  button.addEventListener("click", closeMomentLightbox);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && momentLightbox && !momentLightbox.hidden) {
    closeMomentLightbox();
  }
});
