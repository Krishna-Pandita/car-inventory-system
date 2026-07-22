# Car Dealership Inventory System

A full-stack web application designed for car dealerships to manage their vehicle inventory, featuring a beautiful dynamic UI, user authentication, and admin privileges.

## Features

- **Modern UI:** Built with React, Tailwind CSS, and Lucide Icons for a sleek, premium, and responsive experience.
- **Role-Based Authentication:** JWT-based authentication supporting Customer and Admin roles.
- **Inventory Management:** Admins can easily add, update, restock, and remove vehicles.
- **Customer Portal:** Customers can browse available inventory, search/filter, and purchase vehicles.
- **Real-time Database:** Powered by MongoDB Atlas for robust data storage.
- **RESTful API:** Node.js backend using Express and Prisma ORM.

## Tech Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (Vanilla CSS approach)
- **Routing:** React Router
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** MongoDB
- **Testing:** Vitest + Supertest

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A MongoDB Cluster (or local instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd car-dealership-inventory
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory with the following variables:
   ```env
   DATABASE_URL="your_mongodb_connection_string"
   JWT_SECRET="your_jwt_secret"
   PORT=5000
   ```
   Generate Prisma client and seed the database:
   ```bash
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed.ts
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
