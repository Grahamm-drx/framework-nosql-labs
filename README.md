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

*   **`200 OK`**: Successful read, update, or delete operation.
*   **`201 Created`**: Successful user creation.
*   **`404 Not Found`**: User ID not found, or the requested route does not exist.

 

## License

Academic use only.