# Gemini Project Context — Kanban Task BoardView

## Overview
I am building a **Task BoardView (Kanban style)** web application using:
- **Next.js** (Frontend + Routing)
- **Firebase** (Auth, Firestore, Storage, Hosting)
- **Tailwind CSS** (UI styling)

The goal is to showcase a **mini SaaS product** that is simple, colorful, and practical.  
This project will evolve gradually. Gemini should **not generate the full app at once** — only help implement small parts when asked.

---

## Core Features (MVP)
1. **Authentication**
    - Firebase Auth (Email/Password + Google Sign-In).
    - Each user has their own board(s).

2. **BoardView & Columns**
    - Default: To-Do, In Progress, Done.
    - Users can add custom columns with custom colors.

3. **Tasks**
    - CRUD (title, description, due date, optional tag/priority).
    - Drag-and-drop tasks between columns.

4. **Realtime Sync**
    - Firestore so updates show instantly across devices.

---

## Nice-to-Have Features (Future Scope)
- Team invites with role-based access.
- Labels, filters, and search.
- Task stats dashboard (progress charts, overdue counts).
- Dark mode and theme customization.
- BoardView templates (e.g., Personal, Sprint Planning).

---

## UI Guidelines
- Clean, colorful, SaaS-like design.
- Use material colors.
- Keep the UI modern and intuitive.
- Responsive for desktop and mobile.
- Smooth drag-and-drop animations.
- Use Tailwind CSS utility classes.

---

## Development Approach
- Build **step by step**.
- Each request will focus on a **single piece of functionality** (e.g., setup auth, create Firestore schema, implement drag-and-drop).
- Keep the code modular and easy to expand.

---

## Important Notes
- Do not generate the full codebase at once.
- Always assume incremental progress.
- I may ask for schema designs, code snippets, or UI ideas separately.
- When I suggest an architectural change or new feature and ask WDYT, respond with pros/cons and implementation ideas. Give honest and genuine feedback on my ideas. Don't sugar coat.
- 
