const params = new URLSearchParams(window.location.search);
const album = window.albumData?.find((item) => item.id === params.get("id")) ?? window.albumData?.[0];
const detail = document.querySelector("#album-detail");

const platformIcon = (platform) => {
  if (platform === "QQ Music") return "qqmusic";
  if (platform === "Spotify") return "spotify";
  return "apple";
};

const renderDescription = (description) => {
  const paragraphs = Array.isArray(description) ? description : [description];
  return paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
};

if (album && detail) {
  const verifiedLinks = album.links.filter((link) => !link.href.includes("/search"));
  const detailSections = album.detailSections ?? [];
  document.title = `${album.title} | Chuanbo (Pilgrim) Peng`;
  detail.innerHTML = `
    <a class="text-link album-back" href="hobbies.html">Back to albums</a>
    <div class="album-detail-layout reveal">
      <img class="album-detail-cover" src="${album.cover}" alt="Album cover for ${album.title} by ${album.artist}" />
      <div class="album-detail-copy">
        <p class="eyebrow">${album.type}</p>
        <h1>${album.title}</h1>
        <p class="album-artist">
          <span>${album.artist}</span>
          ${album.artistTagline ? `<span class="album-artist-tagline">${album.artistTagline}</span>` : ""}
        </p>
        <div class="album-description">${renderDescription(album.description)}</div>
        <div class="album-platforms album-detail-platforms" aria-label="${album.title} platform links">
          ${verifiedLinks
            .map(
              (link) => `
                <a class="icon-link" href="${link.href}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
                  <svg><use href="#icon-${platformIcon(link.label)}"></use></svg>
                </a>
              `
            )
            .join("")}
        </div>
        ${detailSections
          .map((section) => {
            const sectionLinks = section.links.filter((link) => !link.href.includes("/search"));
            return `
              <section class="album-detail-extra">
                <h2>${section.title}</h2>
                <p>${section.description}</p>
                <div class="album-platforms album-detail-platforms" aria-label="${section.title} platform links">
                  ${sectionLinks
                    .map(
                      (link) => `
                        <a class="icon-link" href="${link.href}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
                          <svg><use href="#icon-${platformIcon(link.label)}"></use></svg>
                        </a>
                      `
                    )
                    .join("")}
                </div>
              </section>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}
