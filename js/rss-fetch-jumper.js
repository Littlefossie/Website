(async () => {
  try {
    const response = await fetch(
      "https://corsproxy.io/?https://littlefossie.dreamwidth.org/data/atom"
    );

    const xmlText = await response.text();
    const xml = new DOMParser().parseFromString(xmlText, "text/xml");

    const entries = xml.querySelectorAll("entry");
    const index = document.getElementById("rss-index");

    let count = 0;

    entries.forEach(entry => {
      count++

      const title = entry.querySelector("title")?.textContent;
      const link = entry.querySelector("link")?.getAttribute("href")
      const date = new Date(entry.querySelector("published")?.textContent);

      const item = document.createElement("div");
      item.innerHTML = `
      <a href="#rss-post-${count}">${title}</a>
      <br>
      <time class="rss-date" datetime="${date}">
        ${date.getHours()}:${date.getMinutes()} - ${date.getMonth()}/${date.getDate()}/${date.getFullYear()-2000}
      </time>
       - 
      <a href="${link}" target="_blank" rel="noopener">⎘</a>
      `;
      index.appendChild(item);
    });
  } catch (err) {
    console.error("Index load failed:", err);
    document.getElementById("rss-index").innerHTML =
      "<p>Failed to load index.</p>";
  }
})();