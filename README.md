# Task Manager UI

Frontend application for the **Task Manager API**, built with **React, Vite, and Material UI**.

This interface allows users to create, view, update, filter, and delete tasks through a clean web interface connected to a backend REST API.

The project was designed as a **simple personal task management tool**, initially intended to run locally and later be deployed to a **Raspberry Pi for home usage**.

---

# Tech Stack

Frontend

- React
- Vite
- JavaScript
- Material UI
- Axios

Backend (separate project)

- Java
- Spring Boot
- PostgreSQL
- Docker

---

# Features

The application currently supports:

### Task Management

- Create new tasks
- Update task status
- Update task priority
- Delete tasks with confirmation dialog

### Filtering

Tasks can be filtered by:

- text search
- status
- priority

### Pagination

Tasks are loaded using paginated requests from the backend API.

### User Experience

- Snackbar feedback for actions
- Loading indicators
- Confirmation dialog for destructive actions
- Modern UI using Material UI

---

# Project Structure
```
src
├── components
│ ├── TaskForm.jsx
│ ├── TaskList.jsx
│ └── TaskFilter.jsx
│
├── services
│ ├── api.js
│ └── taskService.js
│
├── App.jsx
├── main.jsx
├── theme.js
└── index.css


---

# Running the Project

## 1 Install dependencies
```
npm install


## 2 Start the development server
```
npm run dev


## 3 Open the application
```
http://localhost:5173/


---

# Backend API

This UI requires the backend API running locally.

Default API URL:
```
http://localhost:8080


Related backend project:

**Task Manager API (Spring Boot backend)**

---

# Future Improvements

Possible improvements for the project:

- Dark mode support
- Skeleton loading states
- Date formatting improvements
- Drag and drop task organization
- Authentication

---

# Purpose of the Project

This project was built as a **learning exercise and portfolio project**, demonstrating:

- Integration between React and a REST API
- Component-based frontend architecture
- State management using React hooks
- Modern UI development with Material UI
- Full CRUD operations with a backend service