
/* =========================================
   1. IMPORTS
========================================= */

const fs = require("node:fs");
const path = require("node:path");


/* =========================================
   2. PATHS
========================================= */

const root = path.resolve(__dirname, "..");
const postsDirectory = path.join(root, "posts");
const outputFile = path.join(root, "posts.json");


/* =========================================
   3. READ POST METADATA
========================================= */

function readPost(filename) {
  const filePath = path.join(postsDirectory, filename);
  const markdown = fs.readFileSync(filePath, "utf8");

  const frontmatter = markdown.match(
    /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/
  );

  if (!frontmatter) {
    throw new Error(`Missing frontmatter: ${filename}`);
  }

  const metadata = {};

  frontmatter[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(":");

    if (separator === -1) return;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();

    metadata[key] = value;
  });

  const slug = path.basename(filename, ".md");

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid filename: ${filename}`);
  }

  if (!metadata.title || !metadata.date) {
    throw new Error(`Missing title or date: ${filename}`);
  }

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(metadata.date) ||
    Number.isNaN(Date.parse(metadata.date))
  ) {
    throw new Error(`Invalid date: ${filename}`);
  }

  return {
    slug,
    title: metadata.title,
    date: metadata.date,
    category: metadata.category || "Personal",
    description: metadata.description || "",
    file: `posts/${filename}`
  };
}


/* =========================================
   4. GENERATE POST INDEX
========================================= */

function generatePosts() {
  const files = fs.readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".md"));

  const posts = files
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));

  fs.writeFileSync(
    outputFile,
    JSON.stringify(posts, null, 2) + "\n",
    "utf8"
  );

  console.log(`Generated posts.json with ${posts.length} posts.`);
}

generatePosts();
