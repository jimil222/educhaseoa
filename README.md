# School Management System

A full-stack School Management System built with **Node.js**, **Express**, **MySQL** for backend and **React.js** with **Tailwind CSS** for frontend.
The system allows users to **add new schools** and **retrieve a list of schools sorted by proximity** to a user-specified location.

---

## Features

* Add a new school with `name`, `address`, `latitude`, and `longitude`.
* Retrieve schools sorted by **distance from user's location**.
* Simple and responsive **React frontend** built with Tailwind CSS.
* Full validation of inputs on backend.
* Easy deployment-ready Node.js backend.

---

## Tech Stack

**Backend:**

* Node.js
* Express.js
* MySQL
* Axios

**Frontend:**

* React.js
* Tailwind CSS

---

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Configuration

1. **Create a `.env` file in backend**:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT = your_db_port
PORT=5000
```

2. **Update React frontend** `.env` file (if using Vite):

```
VITE_BACKEND_URL=http://localhost:5000
```

3. **Create MySQL database and table**:

```sql
CREATE DATABASE school_management;

USE school_management;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

## API Endpoints

### 1. Add School

* **Endpoint:** `/addSchool`
* **Method:** POST
* **Payload:**

```json
{
  "name": "Greenwood High",
  "address": "123 Main Street",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

* **Response:**

```json
{
  "message": "School added successfully",
  "school": {
    "id": 1,
    "name": "Greenwood High",
    "address": "123 Main Street",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
}
```

---

### 2. List Schools

* **Endpoint:** `/listSchools`
* **Method:** GET
* **Query Params:** `latitude`, `longitude`

Example:

```
/listSchools?latitude=12.9716&longitude=77.5946
```

* **Response:**

```json
[
  {
    "id": 1,
    "name": "Greenwood High",
    "address": "123 Main Street",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "distance": 0.0
  },
  {
    "id": 2,
    "name": "Sunshine School",
    "address": "456 Elm Street",
    "latitude": 12.9616,
    "longitude": 77.5846,
    "distance": 1.43
  }
]
```

> Distance is calculated using the Haversine formula.

---

## Frontend

* React frontend allows users to:

  * Add a school through a form.
  * View schools sorted by proximity.
* Built with **Tailwind CSS** for responsive design.
* Communicates with backend using **Axios**.

---

## Hosting & Deployment

* **Backend:** Deploy on Render / Clever Cloud / Heroku.
* **Frontend:** Deploy on Vercel / Netlify.
* Ensure `VITE_BACKEND_URL` is updated to the hosted backend URL.

---

## License

MIT License © 2025
