# macOS Portfolio

An interactive, macOS-inspired developer portfolio web application built with React, Vite, and Tailwind CSS.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD627)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## Overview

This project is a premium macOS-themed developer portfolio designed to showcase skills, experience, projects, and contact details in an interactive and engaging desktop environment. Built specifically for Devashish Sharma, the website mimics a real macOS desktop experience with draggable, resizable application windows, a dynamic wallpaper, an interactive terminal, and system-like widgets.

---

## Key Features

- **Interactive macOS Desktop**: Windows are draggable, resizable, and stackable using React Rnd, providing a realistic multitasking interface.
- **Mac-Style Dock**: Features a fluid magnification and scaling animation on mouse hover, active application dot indicators, and quick-launch shortcuts.
- **Top Menubar**: Includes custom status indicators for WiFi and local date/time, alongside a responsive navigation menu with Moonlight (dark) and Sunlit (light) modes.
- **Interactive CLI Terminal**: A fully functional command-line emulator built using React Console Emulator. Visitors can execute commands such as:
  - `about` to view developer bio.
  - `skills` to list the technology stack.
  - `projects` to check out AI and Full Stack work.
  - `experience` to see internship details.
  - `education` to review academic background.
  - `contact` to show contact details.
  - `github` and `linkedin` to launch external social handles.
- **GitHub Integration**: Dynamically queries the GitHub API to fetch public repositories, showing them as cards styled with custom language tags and direct links.
- **Notes App Clone**: A code/text viewer loaded dynamically from a text file and styled with code syntax highlighting.
- **Spotify Integration**: Embeds a functional Spotify player inside a window so visitors can listen to music while exploring.
- **PDF Resume Viewer**: Directly embeds the developer's PDF resume in a window interface.
- **Dynamic Particle Background**: A particle animation engine that responds to theme changes (Moonlight vs. Sunlit).

---

## Technologies Used

- **Frontend**: React 19, JavaScript
- **Styling**: Sass, Tailwind CSS v4, Autoprefixer, PostCSS
- **Animations**: Framer Motion
- **Window Management**: React Rnd (Draggable and Resizable React Component)
- **Terminal Emulator**: React Console Emulator
- **Markdown & Syntax Highlighting**: React Markdown, React Syntax Highlighter
- **Build Tool**: Vite

---

## Getting Started

### Prerequisites

Make sure you have Node.js (version 18 or higher) and pnpm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/toxicbishop/Mac-Portfolio
   ```

2. Install the dependencies:
   ```bash
   pnpm install
   ```

### Running Locally

To start the Vite local development server:
```bash
pnpm dev
```
Open the local URL displayed in the terminal to view the application in your browser.

### Building for Production

To compile the application assets for production deployment:
```bash
pnpm build
```
The compiled build output will be stored in the `dist/` directory.

To preview the production build locally:
```bash
pnpm preview
```

---

## Project Structure

- **src/assets/**: Source icons and styling assets.
- **src/components/**: Core desktop and utility elements (Dock, Nav, DateTime, ParticleBg, Morphtext).
- **src/components/windows/**: Application-specific window content implementations:
  - `Cli.jsx`: Shell terminal console simulation.
  - `Github.jsx`: Dynamic repository feed feed fetcher.
  - `Note.jsx`: Syntax-highlighted text reader.
  - `Resume.jsx`: PDF viewer embed.
  - `Spotify.jsx`: Iframe audio player.
  - `MacWindow.jsx`: Wrapper handling title bars, min/max/close controls, and window states.
- **public/**: Static assets including document icons, raw text files, and the PDF resume.
- **src/App.jsx**: Main application state controller handling open/close desktop window states.

---

## Customization

To adapt this portfolio for your own details:

1. **Update GitHub Username**:
   Change `GITHUB_USERNAME` in `src/components/windows/Github.jsx`.

2. **Select Featured Repositories**:
   Edit the `FEATURED_REPOS` array in `src/components/windows/Github.jsx` to list the repositories you want pinned first.

3. **Update CLI Terminal Content**:
   Customize commands (like `about`, `skills`, `projects`, `experience`, `education`, `contact`) in `src/components/windows/Cli.jsx`.

4. **Replace Resume & Notes**:
   Overwrite the static files in the `public/` directory:
   - `resume.pdf` with your own PDF.
   - `note.txt` with your preferred markdown or code.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
