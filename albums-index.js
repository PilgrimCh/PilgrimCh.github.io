const albumGrid = document.querySelector("#album-grid");

if (albumGrid && window.albumData) {
  albumGrid.innerHTML = window.albumData
    .map(
      (album) => `
        <article class="album-card reveal">
          <a class="album-cover-link" href="album.html?id=${album.id}" aria-label="Open ${album.title} by ${album.artist}">
            <img src="${album.cover}" alt="Album cover for ${album.title} by ${album.artist}" loading="lazy" />
          </a>
          <div class="album-info">
            <h2>${album.title}</h2>
            <p>${album.artist}</p>
          </div>
        </article>
      `
    )
    .join("");
}
