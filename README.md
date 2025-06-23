# ContactFlow-Backend
Table of Contents

1. Project Overview
2. Tech Stack
3. API Documentation
4. Error Handling
5. Authentication

---
## 1. Project Overview

A RESTful API for managing contacts with user authentication built with Node.js, Express, and MongoDB. 
### Key Features include:

- User registration and login with JWT authentication  
- CRUD operations for contacts  
- Password hashing and secure token-based authentication  
- Role-based access control  
- Robust error handling

---
## 2. Tech Stack

| Component       | Technology                |
|------------------|--------------------------|
| Backend         | Node.js, Express          |
| Database        | MongoDB (Mongoose ODM)    |
| Authentication  | JWT, bcrypt               |
| Error Handling  | Custom middleware         |

---
## 3. API Documentation
### Base URL
http://localhost:3000

### Authentication Endpoints
1. Register User
POST /api/users/register

Request Body:
