# AIDesk: Voice-Activated Generative AI Systems Assistant

[💻 GitHub Repository](https://github.com/Desai-Vedant/AIDesk)

> A Python desktop assistant integrating local system commands with AI processing. It allows users to control basic OS functions, trigger web searches, and get AI responses using voice queries.

---

### 📌 The Challenge
* **The Problem:** Navigating standard OS tools and searching the web usually requires interrupting a workflow. Power users often benefit from hands-free alternatives while working across screens.
* **The Goal:** To build a responsive background assistant that can listen to voice commands, determine the user's intent, and execute either local system actions or fetch generative AI answers.

### 🛠️ Technical Strategy & Actions
* **The Stack:** Python • SpeechRecognition • PyAudio • Gemini API
* **Key Architecture:** Used an event listener loop to capture microphone input with SpeechRecognition, routing commands through simple regex checks for local tasks (like taking screenshots) or passing them to the Gemini API for conversational responses.
* **The Breakthrough:** Managed audio input inconsistencies by configuring ambient noise-reduction methods before processing the audio stream, noticeably improving transcription accuracy in typical home environments.

### 🚀 Impact & Key Results
* **Efficiency:** Enabled quick voice-triggered local actions (like launching websites or grabbing screen captures) without requiring keyboard input.
* **Performance:** Achieved low-latency local command execution and relatively consistent voice recognition by keeping basic command parsing local rather than relying entirely on cloud processing.
* **Key Takeaway:** Gained practical experience integrating continuous audio streams, third-party LLM APIs, and native OS APIs within a single Python application.
