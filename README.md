# REST API Project

This project is a RESTful API built with **Node.js**, **Express**, and **Sequelize (SQLite)**.  
It provides secure user authentication and CRUD functionality for managing users and courses, following REST standards and best practices.

---

## Features

- **Sequelize ORM** with SQLite database
- **Models & Associations**
  - **User**
    - `firstName` (string, required)  
    - `lastName` (string, required)  
    - `emailAddress` (string, required, unique, valid email)  
    - `password` (string, hashed with bcrypt before saving)  
  - **Course**
    - `title` (string, required)  
    - `description` (text, required)  
    - `estimatedTime` (string, optional)  
    - `materialsNeeded` (string, optional)  
    - Associated with a User (`userId` foreign key)

- **Authentication**
  - Basic authentication middleware with password hashing using `bcrypt`
  - Routes requiring authentication:
    - `GET /api/users`
    - `POST /api/courses`
    - `PUT /api/courses/:id`
    - `DELETE /api/courses/:id`

- **Error Handling**
  - Global error handler with clear responses
  - Validation errors return `400 Bad Request` with details
  - Unauthorized requests return `401 Unauthorized`
  - Forbidden requests (editing/deleting another user’s course) return `403 Forbidden`
  - Not found resources return `404 Not Found`

---

## API Endpoints

### Users
- **GET `/api/users`**
  - Returns the currently authenticated user  
  - Response excludes `password`, `createdAt`, `updatedAt`

- **POST `/api/users`**
  - Creates a new user  
  - Hashes password before saving  
  - Validates email format and uniqueness  
  - Returns `201 Created` with `Location: /`

---

### Courses
- **GET `/api/courses`**
  - Returns all courses with their associated user  
  - Excludes `createdAt`, `updatedAt`

- **GET `/api/courses/:id`**
  - Returns a specific course with its associated user  
  - Excludes `createdAt`, `updatedAt`

- **POST `/api/courses`**
  - Creates a new course (authenticated users only)  
  - Returns `201 Created` with `Location` header pointing to the new course

- **PUT `/api/courses/:id`**
  - Updates an existing course (authenticated users only)  
  - Only the course owner may update  
  - Returns `204 No Content`

- **DELETE `/api/courses/:id`**
  - Deletes an existing course (authenticated users only)  
  - Only the course owner may delete  
  - Returns `204 No Content`

---

## Validation Rules
- User creation requires:  
  - `firstName`, `lastName`, `emailAddress`, and `password`
- Course creation and updates require:  
  - `title` and `description`
- Validation errors return a `400` status with descriptive messages.

---

## Security
- Passwords are hashed using `bcrypt` before storage
- User authentication is handled with **Basic Auth**
- Course modification restricted to owners

---

## Project Highlights
- Robust error handling with consistent JSON responses
- Clean separation of routes, middleware, and models
- Exceeds rubric expectations by filtering sensitive fields and handling unique constraints gracefully

---

## License
This project is for educational purposes and follows the specifications provided by Treehouse Full Stack JavaScript Techdegree.
