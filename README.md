# Software Developer Portfolio (MD based)

A production-grade, highly optimized software developer portfolio designed with a clean minimalist aesthetic. It features a raw, semantic markup core, cohesive typography, and an interactive developer-focused terminal panel that bridges system interaction with visual portfolio navigation.

---

## ⚡ Architectural Highlights

*   **Interactive Terminal Panel**: A built-in terminal emulator engineered with React and TypeScript. It supports interactive quick actions, diagnostics, system state inspections, theme switching, and seamless route navigation mapping.
*   **Dynamic Markdown Compilation**: High-fidelity project descriptions compiled directly from raw Markdown files using `react-markdown` and raw asset import loaders (`?raw`). Enables rapid maintenance and update cycles.
*   **Dual-Theme Alignment (Light & Dark)**: Full-contrast light and dark mode configurations. Leverages standard Tailwind v4 `@variant dark (&:where(.dark, .dark *))` directives combined with HSL CSS design tokens for maximum readability.
*   **Micro-Animations**: Smooth visual transitions implemented using the `motion` package to highlight critical project statistics and interactive elements without blocking user flow.
*   **High Performance**: Strictly optimized asset loading ensuring ultra-fast paint times and minimal memory footprint.

---

## 🛠️ Tech Stack

*   **Core**: React 19, TypeScript
*   **Styling**: Tailwind CSS v4, Vanilla CSS Design System
*   **Markdown Core**: `react-markdown`
*   **Animations**: `motion`
*   **Bundler**: Vite 6 (customized configurations)

---

## 🚀 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18+ recommended)

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone <your-repo-url>
    cd Developer-Portfolio
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Boot Local Development Server**:
    ```bash
    npm run dev
    ```
    *The site will be hosted locally at [http://localhost:3000](http://localhost:3000).*

### Production Builds

To compile a highly optimized and minified production build bundle:

```bash
npm run build
```

Verify typechecking and styling alignment beforehand with:

```bash
npm run lint
```
