(async () => {
  try {
    const response = await fetch(
      "https://corsproxy.io/?https://littlefossie.dreamwidth.org/data/atom"
    );

    const xmlText = await response.text();
    const xml = new DOMParser().parseFromString(xmlText, "text/xml");

    const entries = xml.querySelectorAll("entry");
    const feed = document.getElementById("rss-feed");

    const maxPosts = Number(feed.getAttribute("data-max-posts")) || 999;
    let count = 0;

    entries.forEach(entry => {
      if (count++ >= maxPosts) return;

      const title = entry.querySelector("title")?.textContent || "";
      const link = entry.querySelector("link")?.getAttribute("href") || "";
      const content =
        entry.querySelector("content")?.textContent ||
        entry.querySelector("title")?.textContent ||
        "";

      const date = new Date(entry.querySelector("published")?.textContent);
      const update = new Date(entry.querySelector("updated")?.textContent);

      let upd = "";
      if (update.getTime() !== date.getTime()) {
        upd = `<p>edited at <time class="rss-date" datetime="${update}">
          ${update.getHours()}:${update.getMinutes()} - ${update.getMonth()}/${update.getDate()}/${update.getFullYear()-2000}
        </time></p>`
      }

      const details = document.createElement("details");
      details.className = "rss-post";
      details.id = "rss-post-" + count;
      details.open = true;

      details.innerHTML = `
        <summary class="rss-title">
					${title}
           - 
					<time class="rss-date" datetime="${date}">
            ${date.getHours()}:${date.getMinutes()} - ${date.getMonth()}/${date.getDate()}/${date.getFullYear()-2000}
          </time>
           - 
					<a href="${link}" target="_blank" rel="noopener">⎘</a>
				</summary>

        <div class="rss-body">
          ${content}
        </div>

        ${upd}
      `;

      feed.appendChild(details);
    });
  } catch (err) {
    console.error("Feed load failed:", err);
    document.getElementById("rss-feed").innerHTML =
      "<p>Failed to load feed.</p>";
  }
})();