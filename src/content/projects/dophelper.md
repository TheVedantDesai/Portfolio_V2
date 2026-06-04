# DOPHelper: Operational Automation for India Post Agents

[💻 GitHub Repository](https://github.com/Desai-Vedant/DOPHelper)

> A Python desktop application that automates repetitive data entry tasks for MPKBY agents, handling Excel preparation and automated web portal submission to save time and reduce manual errors.

---

### 📌 The Challenge
* **The Problem:** MPKBY agents were spending around 40 minutes formatting and entering data for a single standardized report. This manual process was repetitive, tedious, and susceptible to typing errors.
* **The Goal:** To build a reliable desktop tool that automates the data extraction, formatting, and web submission process so non-technical users can complete it with a single click.

### 🛠️ Technical Strategy & Actions
* **The Stack:** Python • PySide6 (Qt) • Selenium WebDriver • Pandas
* **Key Architecture:** Combined a PySide6 desktop interface interface with a background Selenium browser automation thread to ensure the UI remains responsive during long-running web tasks.
* **The Breakthrough:** Handled unpredictable loading times on the government portal by implementing explicit Selenium waits and signal-slot mechanisms to relay progress logs reliably back to the UI.

### 🚀 Impact & Key Results
* **Efficiency Gains:** Reduced a manual task that typically took ~40 minutes down to roughly 1 minute of automated execution time.
* **Data Integrity:** Eliminated common data-entry typos by enforcing pre-submission data validation directly on the imported spreadsheets.
* **Product Ownership:** Learned how to build, package, and distribute a functional Python executable for end-users to run natively without relying on cloud infrastructure.