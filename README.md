
# TODO List App 📝

A full-stack Todo List application built using **React.js** for the frontend and **Node.js + Express.js + MongoDB** for the backend. This project is developed as part of a **Web Developer Intern Assignment**.

## 🌐 Live UI Design
Figma Link: [To-Do App UI](https://www.figma.com/design/1iVgCn5lvTKHvkeYxkNnXZ/To-Do-(Sample)?node-id=1-2)

## 📦 Tech Stack

### Frontend
- React.js (SPA)
- Tailwind CSS
- Heroicons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## ✅ Features

- Create a new Todo from the **TODO** button.
- Title, description, and creation date are stored in the database.
- Todos are displayed with pagination (10 per page).
- Click on a todo to view and edit it on the right pane.
- Live editing: updates are saved to the database on save.
- Fully responsive and clean UI.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/IndrajeetNinjaCoder/TODOList-App.git
cd TODOList-App
```

### 2. Install Dependencies

Install both frontend and backend dependencies:

```bash
# For backend (Node + Express)
cd backend
npm install

# For frontend (React)
cd ../frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the backend directory with the following:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
```

### 4. Run the App

```bash
# Start backend server
cd backend
npm run dev

# Start frontend dev server
cd ../frontend
npm start
```

The frontend should now be running on `http://localhost:3000` and backend on `http://localhost:8000`.

---

## 📷 UI Preview

![UI Preview](preview.png)

---

## 📌 Notes

- Avoided excessive client-side rendering (CSR).
- Backend built with RESTful API structure.
- State managed with React hooks.

---
