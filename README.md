# 📘 Online Lecture Scheduling Module – LMS Assignment

A complete full-stack **Lecture Scheduling Module** built as part of the LMS Assignment.

This system includes:

- Admin Panel  
- Instructor Panel  
- Authentication & Authorization  
- Course Management  
- Instructor Management  
- Lecture Scheduling with **date-clash protection**  
- Cloud image uploads  
- Clean UI Dashboard  

---

## 🚀 Live Demo Links

### 🔹 Frontend  
👉 *Add your link here*

### 🔹 Backend API  
👉 *Add your link here*

---

## 🔐 Login Credentials

### **Admin**
Email: admin@example.com
Password: Admin@123


### **Instructors**
Rahul Sharma
Email: rahul@example.com
Password: Rahul@123

Vinay Kumar
Email: vinay.instructor@example.com
Password: Vinay@123

Priya Singh
Email: priya@example.com
Password: Priya@123


---

## 🎥 Screen Recording
Add drive link here → *Your video recording link*

---

## 📂 Repository
Add GitHub link here → *Your repo link*

---

## 🗄 Database Dump
(Include dump JSON or MongoDB export inside project or drive)

---

# 📚 Table of Contents

1. Project Overview  
2. Features  
3. Tech Stack  
4. API Routes  
5. Database Models  
6. Admin Panel Features  
7. Instructor Panel Features  
8. Installation  
9. Environment Variables  
10. Screenshots  

---

# 🧾 1. Project Overview

This module allows administrators to:

- Manage instructors  
- Manage courses  
- Upload course images  
- Schedule lectures  
- Prevent scheduling the same instructor on the same date  

Instructors can view their assigned lectures in a clean dashboard.

---

# ✨ 2. Features

### 👨‍💼 Admin Panel  
- CRUD for Instructors  
- CRUD for Courses  
- CRUD for Lectures  
- Prevent duplicate lecture schedule  
- Role-based access  
- Cloudinary storage  

### 👨‍🏫 Instructor Panel  
- View assigned lectures only  

### 🔐 Authentication  
- JWT Access token  
- JWT Refresh token  
- HTTP-only cookies  
- Role-based permission middleware  

---

# 🛠 3. Tech Stack

### Frontend  
- React (Vite)  
- React Router  
- TailwindCSS  
- Axios  

### Backend  
- Node.js + Express  
- MongoDB + Mongoose  
- Multer (file upload)  
- Cloudinary  
- JWT Authentication  

---

# 📡 4. API Routes

## 🔐 Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users/register` | Register user |
| POST | `/api/v1/users/login` | Login |
| POST | `/api/v1/users/logout` | Logout |
| POST | `/api/v1/users/refresh-token` | Refresh token |
| GET | `/api/v1/users/me` | Get current user |

---

## 👨‍🏫 Instructor Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/instructors/` | Create instructor |
| GET | `/api/v1/instructors/` | Get all instructors |
| PUT | `/api/v1/instructors/:id` | Update instructor |
| DELETE | `/api/v1/instructors/:id` | Delete instructor |

---

## 📚 Course Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/courses/` | Create course with image |
| GET | `/api/v1/courses/` | Get all courses |
| GET | `/api/v1/courses/:id` | Get course by ID |
| PUT | `/api/v1/courses/:id` | Update course |
| DELETE | `/api/v1/courses/:id` | Delete course |

---

## 🗓 Lecture Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/lectures/` | Create lecture (with date clash validation) |
| GET | `/api/v1/lectures/` | Get all lectures |
| GET | `/api/v1/lectures/:id` | Get lecture by ID |
| PUT | `/api/v1/lectures/:id` | Update lecture |
| DELETE | `/api/v1/lectures/:id` | Delete lecture |

---

# 🧵 5. Database Models

### User Model
- name  
- email  
- password  
- role (`admin`, `instructor`)  
- refreshToken  

### Course Model
- name  
- level  
- description  
- image URL (Cloudinary)  
- lectures: `[ObjectId]`  

### Lecture Model
- course  
- instructor  
- date  

---

# 👨‍💼 6. Admin Features (UI)
- Instructor listing  
- Course cards with image preview  
- Lecture scheduling page  
- Add / edit / delete  
- Error handling (date clash, validation)  
- Toast notifications  

---

# 👨‍🏫 7. Instructor Features
- Read-only dashboard  
- View own lectures only  
- No add/delete/edit options  

---

# ⚙️ 8. Installation

## Backend Setup
```bash
cd backend
npm install
npm run dev
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```


# 🔑 9. Environment Variables
### Create .env file inside backend:
```
PORT=8000
MONGODB_URI=
MONGODB_DB_NAME=hermanosLMS
CORS_ORIGIN="http://localhost:5173"
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV="development"
```


### Create .env file inside frontend:
```
VITE_BACKEND_ENDPOINT=http://localhost:8000
```