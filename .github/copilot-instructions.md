# Copilot Instructions for vancobz21.github.io

## Project Overview
This repository is a static website project, primarily composed of multiple HTML files (e.g., `index.html`, `index2.html`, etc.) and static assets (e.g., images like `CrayneLogo.jpg`). There is no build system, backend, or package management—files are served as-is.

## Key Conventions
- **File Naming:** Each HTML file (e.g., `index.html`, `index2.html`, `index390.html`) represents a different version or variant of the site. Changes are often made by duplicating and editing HTML files.
- **Static Assets:** Images and other assets are placed at the project root. Reference them with relative paths (e.g., `<img src="CrayneLogo.jpg">`).
- **No Frameworks:** There are no JavaScript frameworks, CSS preprocessors, or build tools. Use plain HTML, CSS, and JavaScript.
- **No External Dependencies:** All code and assets are local. Avoid adding package managers or external build steps unless explicitly requested.

## Editing & Workflow
- **Direct Editing:** Make changes directly to the relevant HTML file. There is no compilation step.
- **Previewing:** Open HTML files in a browser to preview changes. No local server is required.
- **Versioning:** When making major changes, consider duplicating an existing HTML file (e.g., `index.html` → `index2.html`) to preserve previous versions.

## Patterns & Examples
- **Navigation:** Navigation is typically hardcoded in each HTML file. Update navigation links in all relevant files when adding or renaming pages.
- **Styling:** CSS is usually embedded in `<style>` tags within each HTML file or linked as a static file. There is no global CSS management.
- **JavaScript:** If present, scripts are included via `<script>` tags in the HTML files. There is no module system.

## Recommendations for AI Agents
- **Do not introduce build tools, frameworks, or external dependencies.**
- **Preserve the flat, static structure.**
- **When adding new features, follow the duplication/versioning pattern for HTML files.**
- **Document any new conventions or patterns in this file.**

## Key Files
- `index.html`, `index2.html`, etc.: Main site entry points and variants
- `CrayneLogo.jpg`: Example of a static asset

---

_If you are unsure about a workflow or pattern, ask for clarification before making structural changes._
