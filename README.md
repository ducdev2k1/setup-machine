# Setup Machine Web Builder

A modern, Glassmorphism-styled web interface built with React, Vite, and Tailwind CSS v4 to generate customized Ubuntu setup scripts.
Select the developer tools, databases, and utilities you need, and instantly download a ready-to-use Bash script.

## Features

- **Modern UI**: Smooth Glassmorphism design with responsive grid layouts.
- **Customizable Script**: Choose exactly what you want to install.
- **Instant Preview**: View the generated bash script in real-time.
- **One-Click Download**: Download the script directly for immediate use.

## Available Software Options

- **Developer Tools**: Git, VS Code, Cursor AI, Antigravity, Node.js 24 (via NVM), Postman
- **Databases**: MongoDB Server 7.0, TimescaleDB (PostgreSQL 16), MongoDB Compass, pgAdmin 4
- **Utilities & Themes**: Ibus-Bamboo (Bộ gõ TV), Flameshot, Bitwarden, Telegram, WhiteSur Theme (macOS style), FileZilla, Termius

## Getting Started

### Running the Web Builder Locally

1. Ensure you have Node.js and `pnpm` installed.
2. Clone this repository.
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the development server:
   ```bash
   pnpm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173/`.

### Using the Generated Script

After selecting your tools and downloading the `setup_machine.sh` script, follow these steps on your Ubuntu machine:

1. Provide execution permissions to the script:
   ```bash
   chmod +x setup_machine.sh
   ```
2. Run the script:
   ```bash
   ./setup_machine.sh
   ```

## Tech Stack

- **React 19**
- **Vite 7**
- **TypeScript**
- **Tailwind CSS v4** (using `@tailwindcss/vite`)
- **SCSS**

## License

MIT License. See `LICENSE` for more information.
