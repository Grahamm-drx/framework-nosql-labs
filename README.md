# Framework and NoSQL Technologies - Laboratory Repository

**Student Name:** John Drex F. Cantor

**Course & Section:** BSIS 3A 

**Professor:** Guillermo V. Red, Jr.

**Email:** johndrexfirma.cantor24@bicol-u.edu.ph

## Repository Purpose

This repository contains all laboratory outputs from Week 1 to Week 9, progressively building toward a full-stack midterm project.

 

## Lab Timeline

| Week | Description |
|------|-------------|
| 1    | Environment Setup & GitHub Integration |
| 2–7  | Backend, Frontend, and NoSQL Development |
| 8    | Project Polish & Local Output |
| 9    | Deployment to Render & Atlas |

 

## Setup Instructions

- Install Node.js, Git, and VS Code.

- Clone this repository and run `npm init -y`.

## Week 3 – Users API

This week focuses on implementing RESTful CRUD operations using Express controllers, in-memory storage, error handling, and endpoint testing. 

### API Endpoints & Test Results

*   **Create User**
    *   **Request:** `POST /api/users`
    *   **Body:** 
        ```json
        {
          "id": 1,
          "name": "Alice",
          "email": "alice@example.com"
        }
        ```
    *   **Response (201 Created):** 
        ```json
        {
          "message": "User created"
        }
        ```

*   **Update User**
    *   **Request:** `PUT /api/users/1`
    *   **Body:** 
        ```json
        {"name": "Alice Updated"}
        ```
    *   **Response (200 OK):**
        ```json
        {
          "message": "User updated",
          "user": {
            "id": 1,
            "name": "Alice Updated",
            "email": "alice@example.com"
          }
        }
        ```

*   **Delete User**
    *   **Request:** `DELETE /api/users/1`
    *   **Response (200 OK):**
        ```json
        {
          "message": "User deleted",
          "user": {
            "id": 1,
            "name": "Alice Updated",
            "email": "alice@example.com"
          }
        }
        ```

*   **Get Users with Query Filter**
    *   **Request:** `GET /api/users?name=ali`
    *   **Response (200 OK):**
        ```json
        [
          {
            "id": 1,
            "name": "Alice",
            "email": "alice@example.com"
          }
        ]
        ```

*   **Get User (Not Found)**
    *   **Request:** `GET /api/users/999`
    *   **Response (404 Not Found):**
        ```json
        {
          "message": "User not found"
        }
        ```

*   **Invalid Route**
    *   **Request:** `GET /api/does-not-exist`
    *   **Response (404 Not Found):**
        ```json
        {
          "message": "Route not found"
        }
        ```

### Status Codes Used

*   **`200 OK`**: Successful read, query filter, update, or delete operation.
*   **`201 Created`**: Successful user creation (with Location header).
*   **`404 Not Found`**: User ID not found, or the requested route does not exist.

### Additional Features Implemented (Weekly Challenge)
*   **Query Filtering:** Added case-insensitive name filtering to `GET /api/users` using query parameters (`?name=`).
*   **Location Header:** Configured `POST /api/users` to return a `Location` header pointing to the newly created resource (`/api/users/{id}`).

## Week 4 – MongoDB Atlas & Mongoose Integration

This week transitions the application from temporary in-memory array storage to a cloud database using MongoDB Atlas and Mongoose ODM.

### Key Features Implemented
* **Database Connection:** Connected Express application to MongoDB Atlas via Mongoose (`mongoose.connect`).
* **User Schema & Model:** Defined strict document rules in `models/userModel.js` requiring `name` and unique `email`, with non-negative constraints on `age`.
* **Full CRUD Integration:** Migrated all controller routes in `controllers/userController.js` to utilize standard Mongoose methods (`create`, `find`, `findById`, `findByIdAndUpdate`, `findByIdAndDelete`).

### API Endpoints & Test Results

* **Create User**
  * **Request:** `POST /api/users/`
  * **Body:** 
    ```json
    {
      "name": "Alice",
      "email": "alice@example.com",
      "age": 20
    }
    ```
  * **Response (201 Created):** 
    ```json
    {
      "name": "Alice",
      "email": "alice@example.com",
      "age": 20,
      "_id": "6a966e66d6598d20daf7bc05",
      "__v": 0
    }
    ```

* **Get All Users**
  * **Request:** `GET /api/users/`
  * **Response (200 OK):**
    ```json
    [
      {
        "_id": "6a966e66d6598d20daf7bc05",
        "name": "Alice",
        "email": "alice@example.com",
        "age": 20,
        "__v": 0
      }
    ]
    ```

* **Get User by ID**
  * **Request:** `GET /api/users/6a966e66d6598d20daf7bc05`
  * **Response (200 OK):**
    ```json
    {
      "_id": "6a966e66d6598d20daf7bc05",
      "name": "Alice",
      "email": "alice@example.com",
      "age": 20,
      "__v": 0
    }
    ```

* **Update User**
  * **Request:** `PUT /api/users/6a966e66d6598d20daf7bc05`
  * **Body:** 
    ```json
    {
      "name": "Drxiee",
      "age": 19,
      "email": "johndrex7@gmail.com"
    }
    ```
  * **Response (200 OK):**
    ```json
    {
      "message": "User updated",
      "user": {
        "_id": "6a966e66d6598d20daf7bc05",
        "name": "Drxiee",
        "email": "johndrex7@gmail.com",
        "age": 19,
        "__v": 0
      }
    }
    ```

* **Delete User**
  * **Request:** `DELETE /api/users/6a966e66d6598d20daf7bc05`
  * **Response (200 OK):**
    ```json
    {
      "message": "User deleted",
      "user": {
        "_id": "6a966e66d6598d20daf7bc05",
        "name": "Drxiee",
        "email": "johndrex7@gmail.com",
        "age": 19,
        "__v": 0
      }
    }
    ```

* **Verify Empty List Post-Deletion**
  * **Request:** `GET /api/users/`
  * **Response (200 OK):**
    ```json
    []
    ```

### Status Codes Used

* **`200 OK`**: Successful fetch, update, or deletion operation.
* **`201 Created`**: Successful document creation in MongoDB Atlas.

## Week 5 – Authentication & JWT Security

This week introduces user authentication, password hashing via bcrypt, and stateless session management using JSON Web Tokens (JWT). Protected routes now require valid credentials to ensure secure access.

### Key Features Implemented
* **Password Hashing:** Integrated `bcrypt` to securely salt and hash user passwords before storing them in MongoDB.
* **Authentication Endpoints:** Created signup and login controllers to register users and issue signed JWT tokens.
* **Route Protection Middleware:** Developed a custom authorization middleware to check for valid tokens in the `Authorization: Bearer <token>` header.

### API Endpoints & Test Results

* **Sign Up User**
  * **Request:** `POST /api/auth/signup`
  * **Body:** 
    ```json
    {
      "name": "Alice",
      "email": "alice@example.com",
      "password": "mypassword"
    }
    ```
  * **Response (201 Created):** 
    ```json
    {
      "message": "User created successfully",
      "userId": "6aaa03f189c5f06f15725b5c"
    }
    ```

* **Log In User**
  * **Request:** `POST /api/auth/login`
  * **Body:** 
    ```json
    {
      "email": "alice@example.com",
      "password": "mypassword"
    }
    ```
  * **Response (200 OK):**
    ```json
    {
      "message": "Login successful",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

* **Access Protected Route (Without Token - Denied)**
  * **Request:** `GET /api/users`
  * **Response (401 Unauthorized):**
    ```json
    {
      "message": "Access Denied"
    }
    ```

* **Access Protected Route (With Bearer Token - Success)**
  * **Request:** `GET /api/users`
  * **Header:** `Authorization: Bearer <token>`
  * **Response (200 OK):**
    ```json
    [
      {
        "_id": "6aaa03f189c5f06f15725b5c",
        "name": "Alice",
        "email": "alice@example.com",
        "password": "$2b$10$9ELx0WxQ1zc/LfJG5HrMoeysFMzbxVmykVw3ZEC66WVL/W/xwkdhe",
        "__v": 0
      }
    ]
    ```

### Status Codes Used

* **`200 OK`**: Successful login request or successful retrieval of protected resources using a valid JWT.
* **`201 Created`**: Successful user account creation via the signup endpoint.
* **`401 Unauthorized`**: Access denied when trying to access a protected route without providing a token.

## License

Academic use only.