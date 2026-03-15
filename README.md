# Task Manager UI

Frontend application for the **Task Manager API**, built with **React** and **Vite**.

This interface allows users to create, view, update, filter, and delete tasks through a web interface connected to a backend REST API.

The project was designed as a simple personal task management tool that runs locally and can later be deployed to a **Raspberry Pi** for home use.

---

# Tech Stack

- React
- Vite
- JavaScript
- Axios
- CSS

---

# Project Overview

The UI communicates with the backend **Task Manager API**, built with:

- Java
- Spring Boot
- PostgreSQL
- Docker

The frontend consumes the API endpoints and renders a dynamic task management interface.

Main features currently implemented:

- Create tasks
- Update task status
- Update task priority
- Delete tasks
- Filter tasks
- Pagination

---

# Requirements

Before running the project, make sure you have:

- Node.js 20+
- npm
- The backend **Task Manager API** running locally

---

# Project Structure

```bash
src/
├── components/
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   └── TaskFilter.jsx
│
├── services/
│   ├── api.js
│   └── taskService.js
│
├── App.jsx
├── main.jsx
└── index.css
## Features

### Create Tasks

Users can create new tasks with:

- name
- description
- due date
- priority

### Update Tasks

Tasks can be updated directly in the interface:

- Change status
- Change priority

### Delete Tasks

Tasks can be removed from the list.

### Filtering

Tasks can be filtered by:

- status
- priority
- text search

### Pagination

Tasks are loaded in pages to improve performance when the dataset grows.

---

## Running the Project

### Install dependencies

```bash
npm install

Start development server
```bash
npm run dev

Access the application
```bash
http://localhost:5173

Backend API

This UI requires the backend API running locally.

Default API URL:
```bash 
http://localhost:8080

Related backend project:
```bash
Task Manager API (Spring Boot backend)