# AI Prompts History

This document contains the prompt history and user requests provided during the design, development, and testing of the **Car Dealership Inventory System**.

---

## Prompt 1: Initial Requirements & Kata Specifications

**User Request:**
> TDD Kata: Car Dealership Inventory System 
> 
> Objective 
> The goal of this kata is to design, build, and test a full-stack Car Dealership Inventory System. This project will test your skills in API development, database management, frontend implementation, testing, and modern development workflows, including the use of AI tools. 
> 
> Core Requirements 
> 1. Backend API (RESTful) 
> - Node.js/TypeScript (with Express) 
> - Database: SQLite / Prisma 
> - User Authentication: JWT token-based authentication (register, login) 
> - API Endpoints:
>   - Auth: POST /api/auth/register, POST /api/auth/login
>   - Vehicles (Protected): POST /api/vehicles, GET /api/vehicles, GET /api/vehicles/search, PUT /api/vehicles/:id, DELETE /api/vehicles/:id (Admin only)
>   - Inventory (Protected): POST /api/vehicles/:id/purchase, POST /api/vehicles/:id/restock (Admin only)
> - Vehicle attributes: unique ID, make, model, category, price, quantity in stock.
> 
> 2. Frontend Application 
> - HTML5, CSS3, Tailwind, React 
> - Registration & Login forms, Dashboard, Search & Filter, Purchase action (disabled when out of stock), Admin UI for CRUD & restock.
> 
> 3. TDD Workflow & Git History 
> - Red-Green-Refactor pattern with tests before code.
> - Git commit history with co-author trailers (`Co-authored-by: AI Tool Name <AI@users.noreply.github.com>`).
> 
> 4. Documentation: README.md with "My AI Usage" section, Screenshots, Test report, PROMPTS.md file in root folder.

---

## Prompt 2: Implementation Plan Confirmation

**User Request:**
> implement plan

**Action Taken:**
Executed full-stack implementation including backend TDD setup (Vitest + Supertest + Prisma/SQLite), frontend SPA (React + Tailwind CSS + Lucide icons), seed scripts, tests, Git commit history with co-author metadata, and documentation.
