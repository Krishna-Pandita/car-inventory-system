# PROMPTS.md

# AI Tooling Chat History

This document contains the prompts used during the development of the **Car Dealership Inventory System**.

## AI Tools Used

- ChatGPT
- Antogravity AI
- KiloCode

---

# Prompt 1 – Project Planning

**Tool:** ChatGPT

**Prompt**

```
Design a full-stack Car Dealership Inventory System using the MERN stack.
Suggest a clean folder structure, REST API architecture, authentication flow,
and database schema following SOLID principles.
```

**Outcome**

- Planned backend architecture
- Designed MongoDB schema
- Organized project folder structure

---

# Prompt 2 – JWT Authentication

**Tool:** KiloCode

**Prompt**

```
Generate JWT authentication middleware for Express.
Implement user registration, login, password hashing using bcrypt,
and role-based authorization for admin users.
```

**Outcome**

- JWT Authentication
- Role-based middleware
- Password hashing

---

# Prompt 3 – Vehicle CRUD APIs

**Tool:** Antogravity AI

**Prompt**

```
Create RESTful CRUD APIs for managing vehicles.
Each vehicle should include make, model, category,
price and quantity.
Implement proper validation and error handling.
```

**Outcome**

- Vehicle CRUD
- Validation
- Error handling

---

# Prompt 4 – Purchase & Restock Logic

**Tool:** ChatGPT

**Prompt**

```
Implement purchase and restock endpoints.
Purchase should reduce quantity by one and prevent
purchasing when stock reaches zero.
Restock should be accessible only to admin users.
```

**Outcome**

- Purchase API
- Restock API
- Inventory validation

---

# Prompt 5 – Search API

**Tool:** KiloCode

**Prompt**

```
Implement search functionality allowing users
to filter vehicles by make, model, category
and price range using MongoDB queries.
```

**Outcome**

- Search endpoint
- Query filters

---

# Prompt 6 – React Dashboard

**Tool:** Antogravity AI

**Prompt**

```
Create a responsive React dashboard using Tailwind CSS
to display all vehicles as cards with search functionality
and purchase buttons.
```

**Outcome**

- Dashboard UI
- Responsive layout
- Vehicle cards

---

# Prompt 7 – Admin Panel

**Tool:** ChatGPT

**Prompt**

```
Create an admin dashboard with forms to add,
update, delete and restock vehicles.
```

**Outcome**

- Admin Panel
- CRUD Forms

---

# Prompt 8 – Testing

**Tool:** KiloCode

**Prompt**

```
Generate Jest and Supertest test cases
for authentication, vehicle CRUD,
purchase, restock and search APIs.
```

**Outcome**

- API Tests
- Authentication Tests
- Inventory Tests

---

# Prompt 9 – Debugging

**Tool:** ChatGPT

**Prompt**

```
Help debug MongoDB connection issues,
JWT authentication errors,
CORS configuration,
and Express routing problems.
```

**Outcome**

- Fixed authentication
- Fixed MongoDB connection
- Fixed CORS issues

---

# Prompt 10 – Documentation

**Tool:** ChatGPT

**Prompt**

```
Generate a professional README including
installation instructions,
API documentation,
screenshots,
test report,
and AI usage section.
```

**Outcome**

- README.md
- Setup guide
- Documentation

---

# Reflection

AI tools were used to:

- Brainstorm the overall project architecture.
- Generate initial boilerplate code.
- Debug backend and frontend issues.
- Improve React component structure.
- Create unit and integration test cases.
- Refine documentation.

All generated code was reviewed, modified, tested, and integrated manually before being committed.