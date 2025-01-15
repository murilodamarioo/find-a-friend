# 📚✨ **API Documentation**

## 🚀🌟 **Project** **Find a Friend App**

## RFs (Functional Requirements)
- [X] It should be possible to register a pet.
- [X] It should be possible to list all pets available for adoption in a city.
- [X] It should be possible to filter pets by their characteristics.
- [X] It should be possible to view the details of a pet for adoption.
- [X] It should be possible to register as an organization (ORG).
- [X] It should be possible to login as an ORG.

## BRs (Business Rules)
- [X] To list the pets, the city must be provided.
- [X] An ORG must have an address and a WhatsApp number.
- [X] A pet must be linked to an ORG.
- [X] The user who wants to adopt will contact the ORG via WhatsApp.
- [X] All filters, in addition to the city, are optional.
- [X] For an ORG to access the application as an admin, it must be logged in.

---

## 🛠️💻 **Technologies Used**

- 🟢 **Language:** [Node.js, Typescript]
- 🏗️ **Framework:** [Fastify]
- 🗄️ **Database:** [PostgreSQL]
- 🔒 **Authentication:** [JWT]
- 🚢 **Other Technologies:** [Docker]

---

## 📦⚙️ **Installation & Configuration**

1️⃣ **📥 Clone the repository:**
```bash
git clone https://github.com/murilodamarioo/find-a-friend.git
```

2️⃣ **📂 Navigate to the project directory:**
```bash
cd find-a-friend
```

3️⃣ **📦 Install dependencies:**
```bash
npm install
```

4️⃣ **📝 Set up environment variables:**
Create a `.env` file based on `.env.example` and adjust as needed.

5️⃣ **🚀 Start the server:**
```bash
npm start
```
---
## 🚢 Docker Container

To up a PostgreSQL Container
```bash
docker compose up -d
```

To stop PostgreSQL image
```bash
docker compose stop
```

---

## 🔑🛡️ **Authentication**

This API uses **🔐 JWT (JSON Web Token)** for authentication. Make sure to include the token in the 📨 header of protected requests.

**📝 Header Example:**
```http
Authorization: Bearer <token>
```

---

## 🏢 Organizations Routes

### 📝 **Register Organization**
- 🛠️ **Method:** `POST`
- 🌐 **URL:** `/orgs`
- 📝 **Description:** Registers a new org.
- 📨 **Request:**
  ```json
  {
    "name": "Best Friends",
    "email": "best@gmail.com",
    "whatsapp": "1199884423",
    "password": "123456",
    "cep": "1322890",
    "state": "SP",
    "city": "São Paulo",
    "neighborhood": "Moema",
    "street": "Rua Moema",
    "latitude": -23.6020717,
    "longitude": -46.6771666
  }
  ```
- 📤 **Response:**
  ```
    status: 201
  ```

### 🔑 **Authenticate Organization**
- 🛠️ **Method:** `POST`
- 🌐 **URL:** `/auth`
- 📝 **Description:** Authenticates a organization.
- 📨 **Request:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- 📤 **Response:**

  `status: 200`
  ```json
  {
    "token": "string"
  }
  ```

### 📍 **Fetch Nearby Organizations**
- 🛠️ **Method:** `GET`
- 🌐 **URL:** `/orgs/nearby`
- 📨 **Query Parameters**
  - `latidude`: `number` **(required)**
  - `longitude`: `number` **(required)**
- 📝 **Description:** Retrieves a list of organizations near the given location.
- 📤 **Response:**
  
  `status: 200`
  ```json
  {
    "orgs": [
        {
            "id": "a729b53e-e566-447a-bb50-4ecaff5a8d0d",
            "name": "Best Friends",
            "email": "best@gmail.com",
            "whatsapp": "1199884423",
            "cep": "1322890",
            "state": "SP",
            "city": "São Paulo",
            "neighborhood": "Moema",
            "street": "Rua Moema",
            "latitude": "-23.6020717",
            "longitude": "-46.6771666"
        }
    ]
  }
  ```
## 🐾 Pets Routes

### 📋 **Register Pet**
- 🛠️ **Method:** `Post`
- 🌐 **URL:** `/orgs/pets`
- 🔐 **Middleware**: JWT verification is required
- 📝 **Description:** Registers a new pet under an authenticated organization.
- 📨 **Request:**
  ```json
  {
    "name": "Peanut",
    "about": "Corgi",
    "age": "1",
    "size": "small",
    "energy_level": "high",
    "environment": "indoor",
    "isAvailable": true
  }
  ```
- 📤 **Response:**

  `status: 201`
  ```json
  {
    "id": "49f9c161-26ba-4c89-9516-c11ffc3bddab",
    "name": "Peanut",
    "about": "Corgi",
    "age": "1",
    "size": "small",
    "energy_level": "high",
    "environment": "indoor",
    "isAvailable": true,
    "org_id": "a729b53e-e566-447a-bb50-4ecaff5a8d0d"
  }
  ```

### 🔍 **Get Pet by ID**
- 🛠️ **Method:** `GET`
- 🌐 **URL:** `/orgs/pets/:id`
- 📝 **Description:** Fetches details of a pet by its ID.
- 📤 **Response:**

  `status: 200`
  ```json
    {
      "id": "49f9c161-26ba-4c89-9516-c11ffc3bddab",
      "name": "Peanut",
      "about": "Corgi",
      "age": "1",
      "size": "small",
      "energy_level": "high",
      "environment": "indoor",
      "isAvailable": true,
      "org_id": "a729b53e-e566-447a-bb50-4ecaff5a8d0d"
    }
  ```

### 🔍 **Search Pets**
- 🛠️ **Method:** `GET`
- 🌐 **URL:** `/orgs/pets`
- 🔍 Query Parameters:
  - `city`: `string` **(required)**
  - `age`: `string` **(optional)**
  - `energy_level`: `string` **(optional)**
  - `environment`: `string` **(optional)**
  - `size`: `string` **(optional)**
- 📝 **Description:** Searches for pets based on query parameters.

- 📤 **Response:**

`status: 200`
  ```json
  {
    "pets": [
        {
            "id": "2f16bbe1-3a8d-413c-9fbf-eb7c63d10a6f",
            "name": "Peanut",
            "about": "Cute dog",
            "age": "1",
            "size": "small",
            "energy_level": "high",
            "environment": "indoor",
            "isAvailable": true,
            "org_id": "a729b53e-e566-447a-bb50-4ecaff5a8d0d"
        },
    ]
  }
  ```

---

## 🧪 **Tests**

### 1. **Unit Tests**
Runs all unit tests located in the `src/use-cases/` directory.
```bash
npm run test:unit
````

Runs the tests and watches for changes in the `src/use-cases/` directory. Tests will automatically rerun on any changes.
```bash
npm run test:watch
````

### 2. **E2E Tests**
Runs the tests for integration/HTTP files located in the `src/http` directory, typically used for testing client-server communication.
```bash
npm run test:e2e
````
### 3. Test Coverage
Runs all tests and generates a coverage report, showing the percentage of code covered by tests.
```bash
npm run test:coverage
````
