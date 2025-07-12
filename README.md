# 🧠 AI TaskGenie — Conversational Task Management App

> 🚀 Company Assessment Project | Smart, Modular, AI-Ready Task Manager  
> Built with React.js + Node.js + Express | Designed for scale, simplicity, and AI extensibility.

---

## 📌 Project Summary

AI TaskGenie is an intuitive, chat-driven task management app that allows users to manage their to-dos using natural language — just like talking to a virtual assistant.

The project simulates an AI-powered backend that interprets user commands like:

> “Add a task to submit the report by Tuesday”

...and converts them into structured task operations (`createTask`, `updateTask`, etc.).

---

## 🎯 Project Objectives

- ✅ Implement a conversational interface to handle task operations
- ✅ Use React + Node.js to demonstrate full-stack capability
- ✅ Design a clean, modular architecture that can plug into any NLP backend
- ✅ Build an interface that's responsive, animated, and easy to use
- ✅ Keep it scalable, readable, and ready for production upgrades

---

## 🔥 Live Features

| Feature                        | Description                                                                          |
|-------------------------------|--------------------------------------------------------------------------------------|
| 💬 Natural Language Commands   | Users can type task-related commands in simple English                              |
| ⚙️ Smart Backend Logic         | Commands are converted to structured JSON actions by a modular AI-like processor    |
| 📋 Task Management             | Create, update, delete, and view tasks using API and frontend logic                 |
| 💡 Modular Design              | Easily replace internal logic with OpenAI, Gemini, or any custom NLP engine         |
| 📱 Modern UI                   | Clean React frontend with responsive layout and Framer Motion animations            |
| 💬 Feedback Console            | Logs show each processed command and system action — great for debugging or scaling |

---

## 🔧 Tech Stack

| Layer      | Tech Stack         | Purpose                                      |
|------------|--------------------|----------------------------------------------|
| Frontend   | React.js, Axios    | UI, interaction, and communication with API  |
| Backend    | Node.js, Express   | API endpoints, AI processing, task logic     |
| Animation  | Framer Motion      | Smooth transitions, user interaction         |
| Dev Tools  | VS Code, Git       | Development, version control                 |

---

## 🧠 AI/NLP Component

Although the current version uses rule-based logic to simulate AI understanding, the structure is fully ready for:

- 🔄 Replacing logic with OpenAI's `gpt-3.5-turbo` or Gemini's `gemini-pro`
- 🧠 AI-generated JSON actions using `/ai-agent` endpoint
- 🎯 Real-time AI integration with prompt engineering and feedback loop

This means that the app isn't just functional — it's **future-ready**.

---




## 🧠 How It Works

```mermaid
graph TD
A[User Chat] --> B[Local AI Parser]
B --> C{Action Type}
C -->|createTask| D[Add Task to List]
C -->|updateTask| E[Mark Task as Complete]
C -->|deleteTask| F[Remove Task from List]
