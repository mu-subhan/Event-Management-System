## 🎉Event Management System
A full-stack application built with the MERN stack, using PostgreSQL (via Prisma), and an integrated TensorFlow ML module.

## 🧭 Table of Contents

1. Technologies Used
2. Prerequisites
3. Installation
   * Clone the Repo
   * Backend Setup (Node.js + PostgreSQL + Prisma)
   * Frontend Setup (React)
4. Running the Application
5. Database & Prisma
6. Useful Tips
   
## 🌟 Technologies Used

| Layer            | Technology                      |
| ---------------- | ------------------------------- |
| Frontend         | React, React Router, Axios      |
| Backend          | Node.js, Express, Prisma ORM    |
| Database         | PostgreSQL (manage via pgAdmin) |
| ORM              | Prisma                          |
| Machine Learning | Python, TensorFlow              |


##  Prerequisites
Make sure your system has:

* Git
* Node.js (v14+) and npm
* PostgreSQL (service running, pgAdmin optional)

## 🚀 Installation

## 1. Clone the Repo

   * git clone https://github.com/mu-subhan/Event-Management-System.git
   * cd Event-Management-System
   
## 2. Backend Setup (Node.js + PostgreSQL + Prisma)

   * cd backend
   * npm install
     
## i. Create .env file in backend folder
user=user_name
password=user_password
CLOUDINARY_CLOUD_NAME=cloudry name
CLOUDINARY_API_KEY=Cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_secret_key
PORT=3001
frontendUrl=http://localhost:3000 // frontend url
ACTIVATION_SECRET=your_activation_key
JWT_SECRET_KEY=your_secret_key
email=your_email
ADMIN_EMAIL=Admin_email
SMPT_MAIL=your_smpt_email
SMPT_PASSWORD=your_smpt_password
SMPT_HOST=smtp.gmail.com
SMPT_PORT=your_smtp_port
SMPT_SERVICE=gmail
DEBUG=true
DB_NAME=your_db_name

# This was inserted by prisma init:

# Environment variables declared in this file are automatically made available to Prisma.

# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.

# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL= your_db_URL


## ii. Generate Prisma files:

   * npx prisma generate
     
## iii. Create and apply migrations:

   * npx prisma studio
     
## iv. (Optional) Open Prisma Studio:
   
   * npx prisma studio

## v. Run the server:

   * npm run dev

## 3. Frontend Setup (React)

   * cd client
     
    Create .env file in client
    
   * npm install
   * npm start

## 🗄️ Database & Prisma

* Use pgAdmin or CLI to manage your PostgreSQL database.
* Prisma migration command (npx prisma migrate dev) generates SQL and updates the schema. 
* Prisma models are in backend/prisma/schema.prisma.

## 💡 Useful Tips

* Customize .env values (PORT, DATABASE_URL) as per your setup.
* Re-run migrations after updating schema.prisma.
* If ports conflict, adjust PORT or frontend proxy in frontend/package.json.
* Use npm test or pytest if tests are defined.
* Add meaningful migrations names:
* npx prisma migrate dev --name add_users_table

## 📚 Reference Commands

# Backend
-->  npm install

-->  npx prisma generate

-->  npx prisma migrate dev --name init

-->  npm run dev

# Frontend
-->  cd frontend

-->  npm install

-->  npm start

# 📞 Questions or Issues?
Please open a GitHub issue or contact the maintainer.
