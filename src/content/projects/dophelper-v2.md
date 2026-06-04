# DOPHelper v2: Electron Desktop Automation Platform

[💻 GitHub Repository](https://github.com/Desai-Vedant/TaskTracker)

> A complete rewrite of the DOPHelper application using Electron and Playwright to improve UI responsiveness, local data storage, and web automation speeds.

---

### 📌 The Challenge
* **The Problem:** The original Python version lacked local history tracking and occasionally suffered from the inherent execution overhead and rendering lockups associated with Selenium.
* **The Goal:** To rebuild the app with a modern tech stack that supports a local database for tracking past reports and uses a faster browser automation framework.

### 🛠️ Technical Strategy & Actions
* **The Stack:** Electron.js • React • Node.js • Playwright • SQLite • SheetJS
* **Key Architecture:** Split the workload between an Electron React renderer for the UI and a Node.js main process. The main process handles SQLite interactions and runs Playwright automation to keep the user interface smooth.
* **The Breakthrough:** Replaced Selenium with Playwright, leveraging Chrome DevTools Protocols (CDP) to avoid frequent timeout issues and speed up the automated portal navigation.

### 🚀 Impact & Key Results
* **Efficiency:** Accelerated the background execution workflow by switching to Playwright and handling data parsing with SheetJS instead of Pandas.
* **Performance:** Successfully integrated a local SQLite database that retrieves historical entry logs smoothly.
* **Key Takeaway:** Learned how to safely manage Inter-Process Communication (IPC) in Electron and handle heavy headless browser tasks in Node.js background processes.
