Minitrello: The Simple Kanban Board
Project Status: Complete (v1.0.0) | Live Demo: [Insert Live Demo URL Here]
Minitrello is a responsive, utility-first Kanban board application designed to simplify task management for individuals and small teams. It allows users to visualize their workflow, track progress, and organize tasks across various stages (Backlog, To Do, In Progress, Done).

This project showcases a modern full-stack architecture focusing on real-time data handling, structured AI integration, and a highly interactive user interface built with React and Tailwind CSS.

🚀 Features
Firebase Authentication: Secure login using Google Sign-In or quick access via Anonymous Guest login.

Real-time Data Sync: Uses Firestore to store card data, ensuring instant updates across all users or sessions.

Intuitive Kanban UI: Responsive and draggable-friendly interface for moving tasks between lanes.

Gemini AI Integration (Project Manager Assistant): A unique feature that calls the Gemini API to:

Generate realistic, structured task ideas for a project.

Provide the output in a clean JSON format (using Structured Output) with a Title, Description, Priority, and relevant Tags.

Utility-First Styling: Built entirely using Tailwind CSS for rapid development and consistent design across all breakpoints.

💻 Tech Stack
Category

Technology

Purpose

Frontend

React / Next.js (Conceptual)

UI components and application structure.

Styling

Tailwind CSS

Utility-first CSS framework for fast, responsive, and aesthetic design.

Backend/Auth

Firebase Authentication

User sign-up, sign-in, and session management.

Database

Google Cloud Firestore

Real-time, scalable NoSQL database for task and board data.

AI/LLM

Gemini API (gemini-2.5-flash-preview-05-20)

Intelligent task generation using Structured Output and Google Search grounding.

⚙️ Installation and Setup (Local)
To run this project locally, you will need Node.js installed.

1. Clone the repository:
   git clone [Your Repository URL]
   cd minitrello

2. Install Dependencies (Node modules for a typical Next.js project):
   npm install