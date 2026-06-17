import React from "react";
import MacWindow from "./MacWindow";
import "./cli.scss";

import TerminalModule from "react-console-emulator";
const Terminal = TerminalModule.default;

const Cli = ({ windowName, setWindowsState, cliTheme }) => {

  const commands = {

    about: {
      description: "About me",
      usage: "about",
      fn: () =>
        "Pranav Arun — A passionate backend developer & AI enthusiast dedicated to building robust systems and solving complex problems with modern tech.",
    },

    skills: {
      description: "List technical skills",
      usage: "skills",
      fn: () => `
Programming:
  Python, JavaScript, TypeScript

Frontend:
  React

Backend:
  Node.js

Database:
  MongoDB, MySQL, Cassandra DB

Tools:
  Docker, Git, GitHub
`,
    },

    projects: {
      description: "View my projects",
      usage: "projects",
      fn: () => `
1️⃣ Chain-of-Thought
   → Research and implementation of Chain-of-Thought reasoning patterns and AI explorations.
   URL: https://github.com/toxicbishop/Chain-of-Thought

2️⃣ DSA-with-tsx
   → Data Structures and Algorithms implemented using TypeScript/React/TSX.
   URL: https://github.com/toxicbishop/DSA-with-tsx

3️⃣ Crypt-Vault (Group Project)
   → A secure cryptography vault.
   Collaborators: supr1795, Mohammed0572, Rohithgaloth
   URL: https://github.com/toxicbishop/Crypt-Vault

4️⃣ Student-GUI-With-SQL
   → A Student database GUI application integrated with SQL.
   URL: https://github.com/toxicbishop/Student-GUI-With-SQL

5️⃣ VITAL-Health-App-Flutter
   → A mobile health application built using Flutter.
   URL: https://github.com/toxicbishop/VITAL-Health-App-Flutter

6️⃣ KSSEM-College-ERP-System
   → College Enterprise Resource Planning (ERP) System designed for KSSEM.
   URL: https://github.com/toxicbishop/KSSEM-College-ERP-System
`,
    },

    experience: {
      description: "Display academic & project experience",
      usage: "experience",
      fn: () => `
Student & Developer
KSSEM | 2022 – Present

• Building robust backend systems and database configurations
• Developing AI reasoning chains and integrations
• Collaborating on group projects like Crypt-Vault
• Creating desktop and mobile applications (Flutter, SQL, React)
`,
    },

    education: {
      description: "Show education background",
      usage: "education",
      fn: () => `
B.E. (Bachelor of Engineering)
K.S. School of Engineering and Management (KSSEM)
`,
    },

    contact: {
      description: "Get contact information",
      usage: "contact",
      fn: () => `
Name: Pranav Arun

Email:
pranavarun19@gmail.com

Contact me via Social Media:
• Instagram: https://www.instagram.com/toxicbishop_/
• LinkedIn:  https://www.linkedin.com/in/pranav-arun/
• Twitter/X: https://x.com/Pranav63076884
• GitHub:    https://github.com/toxicbishop
`,
    },

    github: {
      description: "Open GitHub profile",
      usage: "github",
      fn: () => {
        window.open(
          "https://github.com/toxicbishop",
          "_blank"
        );
        return "Opening GitHub...";
      },
    },

    linkedin: {
      description: "Open LinkedIn profile",
      usage: "linkedin",
      fn: () => {
        window.open(
          "https://www.linkedin.com/in/pranav-arun/",
          "_blank"
        );
        return "Opening LinkedIn...";
      },
    },

    instagram: {
      description: "Open Instagram profile",
      usage: "instagram",
      fn: () => {
        window.open(
          "https://www.instagram.com/toxicbishop_/",
          "_blank"
        );
        return "Opening Instagram...";
      },
    },

    twitter: {
      description: "Open X / Twitter profile",
      usage: "twitter",
      fn: () => {
        window.open(
          "https://x.com/Pranav63076884",
          "_blank"
        );
        return "Opening X/Twitter...";
      },
    },

    social: {
      description: "View social media links",
      usage: "social",
      fn: () => `
GitHub:    github.com/toxicbishop
LinkedIn:  linkedin.com/in/pranav-arun/
Twitter/X: x.com/Pranav63076884
Instagram: instagram.com/toxicbishop_/
`,
    },

    echo: {
      description: "Echo a passed string",
      usage: "echo <string>",
      fn: (...args) => args.join(" "),
    },
  };

  const welcomeMessage = `
╔══════════════════════════════════════════════════╗
║          Pranav Arun Portfolio CLI               ║
╚══════════════════════════════════════════════════╝

Backend Developer + AI Enthusiast

Welcome to my interactive developer terminal.

You can explore my work using commands.

Try these:

  about        → Who I am
  skills       → Tech stack
  projects     → GitHub & Group projects
  education    → Academic background
  contact      → Get in touch
  github       → Open GitHub
  linkedin     → Open LinkedIn
  twitter      → Open X/Twitter
  instagram    → Open Instagram

Type 'help' to see all commands.

Happy exploring 🚀
`;

  return (
    <MacWindow windowName={windowName} setWindowsState={setWindowsState}>
      <div className="cli-window">
        <Terminal
          commands={commands}
          welcomeMessage={welcomeMessage}
          promptLabel={"pranav@portfolio:~$"}
          promptLabelStyle={{ color: cliTheme }}
        />
      </div>
    </MacWindow>
  );
};

export default Cli;