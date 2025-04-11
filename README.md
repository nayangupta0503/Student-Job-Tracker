# 🎯 Student Job Tracker (MERN Stack)

A full-stack job application tracking system built with the MERN stack (MongoDB, Express.js, React, Node.js). This project allows students to manage their job applications by adding, viewing, filtering, updating, and deleting entries.

---

## 🚀 Features

### ✅ Add Job Application
- Fields: Company, Job Role, Status (Applied / Interview / Offer / Rejected), Date of Application, and Job Link.
- Validations:
  - Prevent duplicate entries for the same company and role.
  - Disallow future dates.

### 📋 View & Filter Applications
- table layout for all applications.
- Filter by:
  - Application status
  - Start and end date range

### 🔄 Update Application
- Change status (e.g., from Applied → Interview)

### ❌ Delete Application
- Remove an application from the list with confirmation

---

## 🗂️ Folder Structure

```
├── frontend/
│   ├── App.jsx              # React frontend with Tailwind CSS
│   └── components/
│       └── checkDuplicate.js  # Plain JS module to prevent duplicate entries
│
├── backend/
│   ├── models/
│   │   └── Application.js   # Mongoose schema for job applications
│   ├── routes/
│   │   └── applicationRoute.js # Express routes (CRUD APIs)
│   ├── config/
│   │   └── db.js   # initialzing the Mongo Database
│   └── server.js
│       └── backend execution starts from here
```

---

## 🧪 Tech Stack

| Layer     | Tech                      |
|-----------|---------------------------|
| Frontend  | React, Tailwind CSS       |
| Backend   | Node.js, Express.js       |
| Database  | MongoDB with Mongoose     |
| HTTP      | Axios                     |
| Others    | dotenv (for env vars)     |

---

## ⚙️ How to Run Locally

### 🔧 Backend
```bash
cd backend
npm install
# Set MONGO_URI in .env file
node server.js
```

### 💻 Frontend
```bash
cd frontend
npm install
# Set VITE_BACKEND_URL in .env file (e.g., http://localhost:5000)
npm run dev
```

---

## 🤖 AI Tools Used

- **ChatGPT**: Used to debug and get help with Mongoose query structure and error handling.
- **VS Code Copilot**: Assisted with repetitive React form logic and Tailwind classNames.

---

## 👤 Author

**Nayan Gupta**   
GitHub: [nayangupta0503](https://github.com/nayangupta0503)