# TO-DO Full Stack Application

This is a full-stack TO-DO application built with:

- React (Vite) for the frontend
- Node.js + Express for the backend
- MySQL for the database
- Docker & Docker Compose for container orchestration

---


## Setup Instructions

### Prerequisites

Make sure the following are installed:

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

### Database Setup

Create a MySQL database (e.g., `todo`) either via MySQL Workbench or command line:

```sql
CREATE DATABASE todo;
USE todo;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### Docker Instructions

Build and Start All Containers
Run the following command from the root of the project:

docker-compose up --build
This will:

Start MySQL on port 3307

Start the backend server on port 3000

Start the frontend (Vite) on port 5173

Stop Containers
docker-compose down

### Access the App

Frontend: http://localhost:5173

Backend API: http://localhost:3000

MySQL: Accessible via localhost:3307 (with tools like MySQL Workbench)



✅ Author
Developed by Saran



