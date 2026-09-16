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

## Week 6 – Advanced Aggregation & Indexing

This week focuses on building advanced NoSQL data pipelines, performing cross-collection joins, analyzing spending trends, and optimizing query performance using MongoDB indexes.

### Day 1 – Basic Aggregation Pipelines

### Key Features Implemented
* **Document Filtering (`$match`):** Filtered records based on conditional criteria like age thresholds.
* **Array Flattening & Frequency Counting (`$unwind` + `$group`):** Unpacked array fields (hobbies) to compute and rank category frequencies.
* **Field Projection & Transformation (`$project`):** Reshaped documents and computed new fields using arithmetic operators.
* **Result Ordering (`$sort`):** Sorted collection outputs in descending order.

### Aggregation Pipelines & Test Results

* **Filter Users Older Than 25**
  * **Request (Pipeline):** 
    ```json
    [
      { "$match": { "age": { "$gt": 25 } } }
    ]
    ```
  * **Response Summary:** Successfully filtered the user collection to return only documents where the `age` field is strictly greater than 25.

* **Count Users by Hobby**
  * **Request (Pipeline):** 
    ```json
    [
      { "$unwind": "$hobbies" },
      { "$group": { "_id": "$hobbies", "count": { "$sum": 1 } } },
      { "$sort": { "count": -1 } }
    ]
    ```
  * **Response Summary:** Successfully flattened the `hobbies` array, grouped individual hobbies to count user frequencies, and sorted the results from highest to lowest count.

* **Show Name and Derived Birth Year**
  * **Request (Pipeline):** 
    ```json
    [
      { "$project": { "name": 1, "yearOfBirth": { "$subtract": [2024, "$age"] } } }
    ]
    ```
  * **Response Summary:** Successfully projected the user's name and computed a custom `yearOfBirth` field by subtracting their `age` from 2024.

* **Order Users by Age Descending**
  * **Request (Pipeline):** 
    ```json
    [
      { "$sort": { "age": -1 } }
    ]
    ```
  * **Response Summary:** Successfully retrieved and sorted all user documents by age in descending order (oldest to youngest).

### Operations & Operators Used
* **Aggregation Stages:** `$match`, `$unwind`, `$group`, `$project`, `$sort`.
* **Operators & Accumulators:** `$gt`, `$sum`, `$subtract`.

### Day 2 – Advanced Aggregation & Indexing

### Key Features Implemented
* **Cross-Collection Joins (`$lookup`):** Linked the `orders` collection with the `users` collection to enrich orders with customer information.
* **Analytical Grouping:** Used aggregation operators (`$group`, `$sum`, `$sort`, `$limit`, `$year`, `$month`) to determine top spenders and track monthly signup trends.
* **Database Indexing:** Created performance-tuning indexes on high-traffic fields (`email`, `userId`, `orderDate`) and validated execution efficiency using `.explain("executionStats")`.

### Aggregation Pipelines & Test Results

* **Join Orders with User Info**
  * **Request (Pipeline):** 
    ```json
    [
      { "$lookup": { "from": "users", "localField": "userId", "foreignField": "_id", "as": "customer" } },
      { "$unwind": "$customer" },
      { "$project": { "product": 1, "price": 1, "orderDate": 1, "customer.name": 1, "customer.email": 1 } },
      { "$sort": { "orderDate": 1 } }
    ]
    ```
  * **Response Summary:** Successfully retrieved orders sorted chronologically by `orderDate` with embedded customer names and emails.

* **Top 5 Customers by Total Spend**
  * **Request (Pipeline):** 
    ```json
    [
      { "$group": { "_id": "$userId", "totalSpent": { "$sum": "$price" } } },
      { "$sort": { "totalSpent": -1 } },
      { "$limit": 5 },
      { "$lookup": { "from": "users", "localField": "_id", "foreignField": "_id", "as": "customer" } },
      { "$unwind": "$customer" },
      { "$project": { "_id": 0, "name": "$customer.name", "email": "$customer.email", "totalSpent": 1 } }
    ]
    ```
  * **Response Summary:** Successfully isolated the top 5 highest-spending users ranked in descending order based on their cumulative `totalSpent` amount.

* **Monthly Signups Trend**
  * **Request (Pipeline):** 
    ```json
    [
      { "$group": { "_id": { "year": { "$year": "$createdAt" }, "month": { "$month": "$createdAt" } }, "signups": { "$sum": 1 } } },
      { "$sort": { "_id.year": 1, "_id.month": 1 } }
    ]
    ```
  * **Response Summary:** Successfully aggregated user registration data grouped and sorted chronologically by year and month.

* **Database Indexing & Performance Evaluation**
  * **Commands Executed:** 
    ```javascript
    db.users.createIndex({ email: 1 });
    db.orders.createIndex({ userId: 1 });
    db.orders.createIndex({ orderDate: 1 });
    db.orders.find({ userId: db.users.findOne()._id }).explain("executionStats");
    ```
  * **Response Summary:** Indexes (`email_1`, `userId_1`, `orderDate_1`) created successfully, and query performance execution stats were verified.

### Operations & Operators Used
* **Aggregation Stages:** `$lookup`, `$unwind`, `$project`, `$sort`, `$group`, `$limit`.
* **Accumulators & Operators:** `$sum`, `$year`, `$month`.
* **Performance Tools:** `.createIndex()`, `.explain("executionStats")`.

## License

Academic use only.