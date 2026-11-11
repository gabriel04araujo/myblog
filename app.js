
/* =========================================
   1. DOM ELEMENTS
========================================= */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const year = document.querySelector("#year");


/* =========================================
   2. FOOTER
========================================= */

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================================
   3. MOBILE NAVIGATION
========================================= */

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    });
  });
}


/* =========================================
   4. HELPERS
========================================= */

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric"
    }
  );
}

function createElement(tag, text, className) {
  const element = document.createElement(tag);

  if (text !== undefined) {
    element.textContent = text;
  }

  if (className) {
    element.className = className;
  }

  return element;
}


/* =========================================
   5. LOAD POSTS
========================================= */

async function loadPosts() {
  const response = await fetch("posts.json");

  if (!response.ok) {
    throw new Error("Could not load posts.json");
  }

  return response.json();
}


/* =========================================
   6. HOMEPAGE
========================================= */

function renderPosts(posts) {
  const container = document.querySelector("#posts-container");

  if (!container) return;

  container.replaceChildren();

  if (posts.length === 0) {
    container.appendChild(
      createElement("p", "No transmissions yet.")
    );
    return;
  }

  posts.forEach((post) => {
    const article = createElement("article", undefined, "post-card");
    const content = createElement("div");

    const metadata = createElement(
      "span",
      `${post.category} · ${formatDate(post.date)}`,
      "post-tag"
    );

    const title = createElement("h3");
    const link = createElement("a", post.title);

    link.href = `post.html?slug=${encodeURIComponent(post.slug)}`;
    title.appendChild(link);

    const description = createElement("p", post.description);

    const readLink = createElement(
      "a",
      "Read article →",
      "read-link"
    );

    readLink.href = link.href;

    content.append(metadata, title, description, readLink);
    article.appendChild(content);
    container.appendChild(article);
  });
}


/* =========================================
   7. ARTICLE PAGE
========================================= */

async function renderArticle(posts) {
  const container = document.querySelector("#article-container");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    container.appendChild(
      createElement("h1", "Article not found.")
    );
    return;
  }

  
  const response = await fetch(post.file);

  if (!response.ok) {
    throw new Error(
      `Could not load article Markdown: ${response.url} (HTTP ${response.status})`
    );
  }


  const markdown = await response.text();

  // Remove metadata before rendering.
  const content = markdown.replace(
    /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/,
    ""
  );

  document.title = `${post.title} | Gabriel Space`;

  const header = createElement(
    "header",
    undefined,
    "article-header"
  );

  const metadata = createElement(
    "span",
    `${post.category} · ${formatDate(post.date)}`,
    "post-tag"
  );

  const description = createElement(
    "p",
    post.description,
    "article-description"
  );

  header.append(metadata, description);

  const body = createElement(
    "div",
    undefined,
    "article-body"
  );

  // Convert Markdown into sanitized HTML.
  body.innerHTML = DOMPurify.sanitize(
    marked.parse(content)
  );

  container.replaceChildren(header, body);
}


/* =========================================
   8. INITIALIZATION
========================================= */

async function initializeBlog() {
  const homepage = document.querySelector("#posts-container");
  const articlePage = document.querySelector("#article-container");

  if (!homepage && !articlePage) return;

  try {
    const posts = await loadPosts();

    renderPosts(posts);
    await renderArticle(posts);

  } catch (error) {
    console.error("Gabriel Space:", error);

    const target = homepage || articlePage;

    target.replaceChildren(
      createElement("p", "Unable to load posts. Please try again.")
    );
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeBlog);
} else {
  initializeBlog();
}
