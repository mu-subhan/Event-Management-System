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
