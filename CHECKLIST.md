# Project 9 Checklist

## Getting Started

* [X] Open the project in a text editor.
* [X] Install dependencies (`npm install`).
* [X] Run `npm run seed` to create and seed **fsjstd-restapi.db**.
* [X] Verify the database using DB Browser.
* [X] Start the app (`npm start`) and check `http://localhost:3000/` for the welcome message.
* [X] **macOS Monterey only:** Change port to 3000

---

## Database Configuration

* [ ] Install Sequelize.
* [ ] Install Sequelize CLI as a dev dependency.
* [ ] Run `npx sequelize init`.
* [ ] Update `config.js`:

  * [ ] `storage: "fsjstd-restapi.db"`
  * [ ] `dialect: "sqlite"`
* [ ] Use Sequelize’s `authenticate()` to test the connection.

---

## Define Models

* [ ] Create **User** model with attributes:

  * [ ] `firstName: string`
  * [ ] `lastName: string`
  * [ ] `emailAddress: string`
  * [ ] `password: string`
  * [ ] Generate with:

    ```
    npx sequelize model:create --name User --attributes firstName:string,lastName:string,emailAddress:string,password:string
    ```

* [ ] Create **Course** model with attributes:

  * [ ] `title: string`
  * [ ] `description: text`
  * [ ] `estimatedTime: string`
  * [ ] `materialsNeeded: string`
  * [ ] Generate with:

    ```
    npx sequelize model:create --name Course --attributes title:string,description:text,estimatedTime:string,materialsNeeded:string
    ```

---

## Define Associations

* [ ] In **User model**: `User.hasMany(Course)`
* [ ] In **Course model**: `Course.belongsTo(User)`
* [ ] Set `foreignKey: "userId"` linked to `User.id`.

---

## Testing Setup

* [ ] Install Postman.
* [ ] Import `RESTAPI.postman_collection.json`.
* [ ] Don’t modify requests in the provided collection.

---

## Create User Routes

* [ ] `/api/users` **GET** → return current authenticated user (200).
* [ ] `/api/users` **POST** → create new user, set `Location: "/"`, return (201).

---

## Create Course Routes

* [ ] `/api/courses` **GET** → return all courses w/ User object (200).
* [ ] `/api/courses/:id` **GET** → return course w/ User object (200).
* [ ] `/api/courses` **POST** → create course, set `Location`, return (201).
* [ ] `/api/courses/:id` **PUT** → update course (204).
* [ ] `/api/courses/:id` **DELETE** → delete course (204).

---

## Model Validation

* [ ] **Users POST:** require `firstName`, `lastName`, `emailAddress`, `password`.
* [ ] **Courses POST/PUT:** require `title`, `description`.
* [ ] Respond with **400** if validation fails.

---

## Password Security

* [ ] Hash passwords before saving (use `bcrypt`).

---

## Authentication Middleware

* [ ] Create middleware to parse `Authorization` header.
* [ ] If valid → attach user to request, continue.
* [ ] If invalid → return **401** + `"Access Denied"`.
* [ ] Apply middleware to:

  * [ ] `/api/users GET`
  * [ ] `/api/courses POST`
  * [ ] `/api/courses/:id PUT`
  * [ ] `/api/courses/:id DELETE`

---

## Final Checks

* [ ] Add meaningful code comments.
* [ ] Ensure consistent formatting & indentation.
* [ ] Test functionality thoroughly in browser & Postman.
* [ ] Watch console for errors, fix any bugs.
* [ ] Optional: share repo in Slack `#review-my-project` for feedback.

---

## Extra Credit (Exceeds Expectations)

* [ ] **Email validation & uniqueness**:

  * [ ] Validate email format.
  * [ ] Add `unique: true` to `emailAddress`.
* [ ] **User Routes updates**:

  * [ ] Filter out `password`, `createdAt`, `updatedAt` in **GET /api/users**.
  * [ ] Handle `SequelizeUniqueConstraintError` in **POST /api/users** (return 400).
* [ ] **Course Routes updates**:

  * [ ] Filter out `createdAt`, `updatedAt` in course GETs.
  * [ ] Filter out `createdAt`, `updatedAt`, `password` in attached User object.
  * [ ] Restrict **PUT/DELETE** to course owner; return **403** if not owner.
