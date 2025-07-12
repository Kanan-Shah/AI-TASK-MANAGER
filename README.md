# ✨ AI TaskGenie — Your Smart Productivity Partner

> 🎓 Final Year Project | React + Node.js | AI-Integrated Task Manager

---

## 🚀 What is TaskGenie?

TaskGenie is a modern, AI-powered productivity web app that turns **natural language** into actionable **task commands**. Just chat like:

> “Add a task to finish report by Friday”

And boom 💥 — Task created.

---

## 💡 Key Features

✅ **Chat with AI**: Talk to TaskGenie to create, update, or delete tasks  
✅ **Smart Parsing**: Fake AI logic intelligently converts plain English to JSON actions  
✅ **Modern UI**: Clean, mobile-friendly React UI with animation and tabs  
✅ **Offline Capable**: No OpenAI/Gemini needed – works entirely with local logic  
✅ **Beautiful UX**: Designed with attention to detail using `framer-motion` and responsive CSS  
✅ **Expandable**: Easily switch to real AI later (OpenAI / Gemini ready)

---


---

## 🧠 How It Works

```mermaid
graph TD
A[User Chat] --> B[Local AI Parser]
B --> C{Action Type}
C -->|createTask| D[Add Task to List]
C -->|updateTask| E[Mark Task as Complete]
C -->|deleteTask| F[Remove Task from List]
