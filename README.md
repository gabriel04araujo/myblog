
# Gabriel Space 👽

**A little corner of the internet, somewhere on planet Earth.**

I've decided to create a blog to share my journey as a developer, as a husband, as a father and as a human being in general. Even tho sometimes I feel like I'm not one. 👽

Welcome to my space!

---

## About the Project

Gabriel Space is my personal blog, built from scratch using HTML, CSS, and JavaScript.

I wanted to create my own place on the internet where I could write about software development, personal projects, everyday life, and whatever happens to be on my mind.

Instead of using a ready-made blogging platform, I decided to build one myself.

Why? Because I love understanding how things work, solving problems, and learning through building.

This website is both my personal journal and an ongoing software development project.

## Tech Stack

The project currently uses:

- **HTML5** — Website structure and content.
- **CSS3** — Styling, layout, and responsive design.
- **JavaScript** — Dynamic content and interactions.
- **Markdown** — Writing and organizing blog posts.
- **Node.js** — Generating the blog post index.
- **Marked** — Converting Markdown into HTML.
- **DOMPurify** — Sanitizing generated HTML.
- **Git & GitHub** — Version control.
- **GitHub Pages** — Free static website hosting.

No frontend frameworks, databases, or traditional backend servers are required.

## Project Structure

```text
gabriel-space/
│
├── index.html
├── post.html
├── style.css
├── app.js
├── posts.json
├── .nojekyll
├── README.md
│
├── posts/
│   └── hello-world.md
│
└── scripts/
    └── generate-posts.js
```

## How Publishing Works

Blog posts are written in Markdown and stored inside the `posts/` directory.

Each article contains its own metadata and content.

Example:

```markdown
---
title: Hello, World!
date: 2026-11-11
category: Personal
description: Welcome to my little corner of the internet.
---

# Hello, World!

This is my first blog post!

I'm building my own space on the internet.
```

A Node.js script reads the Markdown files and generates a `posts.json` index.

The website uses JavaScript to load this index, display articles on the homepage, and render individual posts.

To update the post index, run:

```bash
node scripts/generate-posts.js
```

New articles are automatically included in the generated index.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Navigate to the project directory:

```bash
cd YOUR_REPOSITORY
```

Generate the post index:

```bash
node scripts/generate-posts.js
```

Start a local HTTP server:

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000

You can also use the Live Server extension in Visual Studio Code.

**Note:** Opening `index.html` directly using the `file://` protocol will not work correctly because the application uses `fetch()` to load its content.

## Contributing

This is primarily a personal learning project.

However, feedback, suggestions, and constructive criticism are always welcome.

## About Me

I'm Gabriel, a developer in progress who loves computers, technology, and figuring out how things work.

I'm also a husband, a father, and someone who enjoys learning about the world.

Gabriel Space is where all those parts of my life come together.

---

**Made with curiosity, code, and a little bit of alien energy. 👽**
