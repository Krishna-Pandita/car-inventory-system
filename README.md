# Car Dealership Inventory System

A full-stack web application designed for car dealerships to manage their vehicle inventory. This project was developed as part of a Test-Driven Development (TDD) Kata, aiming to demonstrate modern software practices including API design, React SPA development, strict TDD git workflows, and effective AI pairing.

## Features

- **Modern UI:** Built with React, Tailwind CSS, and Lucide Icons for a sleek, premium, and dynamic experience.
- **Role-Based Authentication:** JWT-based authentication supporting Customer and Admin interactions.
- **Inventory Management:** Admins can easily add, update, restock, and remove vehicles.
- **Customer Portal:** Customers can browse available inventory, search/filter via API, and add vehicles to a robust persistent shopping cart.
- **Real-time Database:** Powered by MongoDB Atlas for robust data storage.
- **RESTful API:** Node.js backend using Express and Prisma ORM.

## Tech Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Testing:** Vitest

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** MongoDB
- **Testing:** Vitest + Supertest

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js (v18 or higher)
- A MongoDB Cluster (or local instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Krishna-Pandita/car-inventory-system.git
   cd car-inventory-system
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory with the following variables:
   ```env
   DATABASE_URL="your_mongodb_connection_string"
   JWT_SECRET="your_jwt_secret_key"
   PORT=5000
   ```
   Generate the Prisma client and push the schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

You'll need to run both the backend and frontend servers simultaneously in separate terminal windows.

**Start the Backend:**
```bash
cd backend
npm run dev
```

**Start the Frontend:**
```bash
cd frontend
npm run dev
```

Your app will be available at `http://localhost:5173`.

---

## Screenshots

*(Note: Replace these placeholder paths with actual screenshots of the final application)*

1. **Dashboard & Vehicle Listing**
   ![Dashboard Preview](./screenshots/dashboard.jpg)

2. **Cart Drawer & Checkout Flow**
   ![Cart View](./screenshots/cart.jpg)

---

## My AI Usage

As part of this kata, I extensively used AI as a pairing partner to accelerate development and adhere strictly to TDD constraints. 

**Which AI tools I used:**
I used **Google Antigravity (Gemini)** as an autonomous agentic AI assistant integrated into my workflow.

**How I used them:**
- **Scaffolding and Setup:** I asked Antigravity to generate the initial backend API boilerplate, set up the Express routing, and configure Prisma.
- **Test-Driven Development (TDD):** I used the AI to write failing tests for backend services (Purchase, Restock, Auth), commit them to Git in a "Red" state, and then immediately implement the logic to pass them in a "Green" state. 
- **Database Migration:** When shifting from SQLite to MongoDB, I prompted the AI to rewrite the Prisma schemas and migrate the codebase entirely over to the new provider.
- **Debugging Complex Errors:** I leveraged the AI to solve a `500 Internal Server Error` which ended up being a combination of a crashed background Node process and a misapplied global JWT middleware block. The AI traced the logs, fixed the middleware, and validated the public API.
- **Git Sequencing:** I instructed the AI to execute specific git sequences (stashing features, committing failing TDD tests to remote, then restoring the feature and pushing the passing commit) to satisfy kata requirements for atomic, transparent commit histories.

*(A complete history of the specific prompts used is available in `PROMPTS.md`)*

**Reflection:**
Using AI significantly accelerated my ability to scaffold and deploy complex, full-stack architectures. By having the AI write the boilerplate, I could focus my energy on architectural decisions (like separating public/private routing) and managing the precise Git workflow required for the kata. The most valuable aspect was using the AI to quickly isolate server-side crashes that would otherwise take considerable time to debug manually.

---


## Test Report

Our test suite is split between the Backend (Supertest integration tests) and the Frontend (Vitest logic tests). The suite follows strict TDD coverage for the core business constraints.

### Backend Tests

```text
 RUN  v2.1.9 D:/Documents/car-dealership-inventory/backend

  tests/auth.test.ts (4 tests) 1795ms
    Auth API (TDD) > should register a new customer user successfully 477ms
  tests/vehicles.test.ts (6 tests) 2733ms
    Vehicles API (TDD) > should update vehicle details 304ms
  tests/inventory.test.ts (4 tests) 2778ms
    Inventory API (TDD) > should decrease quantity upon purchase 311ms
    Inventory API (TDD) > should allow admin to restock vehicle 355ms

 Test Files  3 passed (3)
      Tests  14 passed (14)
   Start at  23:43:22
   Duration  4.80s


### Frontend Tests

```text
 RUN  v2.1.9 D:/Documents/car-dealership-inventory/frontend

  src/tests/cart.test.ts (5 tests) 4ms
  src/App.test.tsx (3 tests) 79ms

 Test Files  2 passed (2)
      Tests  8 passed (8)
   Start at  23:43:39
   Duration  743ms
```
