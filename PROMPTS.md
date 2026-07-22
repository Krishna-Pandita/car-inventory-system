# PROMPTS

This file contains a history of the primary prompts and requests provided to the AI (Google Antigravity) during the development of the Car Dealership Inventory System.

---

### Initial Setup & Architecture
**User Request:** Build the full-stack Car Dealership Inventory System following the TDD Kata requirements using React (Frontend) and Node.js/Express (Backend).
**Result:** The AI scaffolded the repository, set up Prisma ORM, configured the frontend with React Router, and implemented the core CRUD logic for vehicles following a Test-Driven Development (TDD) cycle.

### Database Migration
**User Request:** Migrate the database from SQLite to MongoDB Atlas.
**Result:** The AI updated the Prisma schema to use the MongoDB provider, configured the `DATABASE_URL` environment variables, and regenerated the Prisma client to successfully link the application to the MongoDB cloud instance.

### Backend Debugging (500 Internal Server Error)
**User Request:** "Request failed with status code 500 can solve when i add vehical"
**Result:** The AI debugged the backend server logs, identified that the local backend process had crashed and was not running, restarted the server, and verified that POST requests to `/api/vehicles` were returning a 201 Created status.

### Bug Fix: Middleware Authorization 
**User Request:** "No Vehicles Found. No inventory matches your current search criteria or category filters. it is showing this"
**Result:** The AI investigated the network requests and discovered that the global `authenticateToken` middleware was mistakenly applied to all routes in `vehicleRoutes.ts`. The AI refactored the routes to allow public `GET` access while protecting the `POST`, `PUT`, and `DELETE` routes, successfully restoring the vehicle dashboard.

### Feature Addition: Cart Functionality
**User Request:** "based on my current code , add a functionality that when i click on a car image it opens another page and displays its descrption with image and details also add cart functionality" and "in cart , develop incrment decrement feture and min value should be 1"
**Result:** The AI created a new `VehicleDetails` page, implemented a `CartContext` using React Context and `useReducer` for state management (backed by `localStorage`), and built a slide-out cart UI with quantity increment/decrement controls.

### TDD Git Sequencing
**User Request:** "push these file in sequnce first commit the test files (show that i have created the test butit failed) and then push then commit its method file ( show tht i have passed this test case) and push these . but do all these in sequnce if u ask , i will give u repo link"
**Result:** The AI executed a strict TDD Git workflow by stashing the cart implementation, writing failing tests for the cart logic, pushing the TDD Red commit, then popping the stash, running the passing tests, and pushing the TDD Green commit.

### Documentation Generation
**User Request:** "update my readme file as said here based on my softeare" (referencing the Kata instructions).
**Result:** The AI generated the `README.md` containing the setup instructions, tech stack details, test reports, and the mandatory "My AI Usage" section, as well as this `PROMPTS.md` file.
