# TO-DO Full Stack Application

A full-stack TO-DO application built with:

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Containerization:** Docker & Docker Compose

---

## Project Structure

```
TO-DO/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── To_Do.jsx
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── docker-compose.yml
└── README.md
```

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### Environment Variables

Create a `.env` file in the `server/` directory with the following content:

```env
DB_HOST=localhost
DB_USER=your_mysql_userName
DB_PASSWORD=your_mysql_password
DB_NAME=todo
PORT=3000
```

---

### Database Setup

Create a MySQL database (e.g., `todo`) using MySQL Workbench or the command line:

```sql
CREATE DATABASE todo;
USE todo;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### Docker Instructions

**Build and Start All Containers**

Run the following command from the root of the project:

```sh
docker-compose up --build
```

This will:

- Start MySQL on port **3307**
- Start the backend server on port **3000**
- Start the frontend (Vite) on port **5173**

**Stop Containers**

```sh
docker-compose down
```

---

### Access the App

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3000](http://localhost:3000)
- **MySQL:** Accessible via `localhost:3307` (use MySQL Workbench or similar tools)

---

##