<div align="center">

# Linea Forum

A modern, full-stack forum platform built with a focus on scalability, security, and clean architecture.

A portfolio-grade project designed to showcase real-world Next.js application development.

</div>

---

## Overview

**Linea Forum** is a community-driven discussion platform where users can create topics, participate in conversations, and manage their accounts securely.

The project was developed as a **production-oriented forum application**, emphasizing modern web standards, authentication best practices, and maintainable database design.

---

## Key Features

- User authentication and session management
- Secure login system using industry standards
- Create, edit, and delete forum topics
- Comment-based discussion system
- Category-based content organization
- Role-based authorization (User / Admin)
- Server-side rendering and optimized routing
- Clean and scalable project structure

---

## Technology Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript

### Backend
- Next.js Server Actions and API Routes
- NextAuth for authentication and authorization

### Database
- Drizzle ORM
- SQL-based database (PostgreSQ)

### Architecture & Tooling
- Modular folder structure
- Environment-based configuration
- Strong type safety
- Production-ready setup

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/RounenRaıs/linea-forum.git
cd linea-forum

```
### 2. Install dependencies
```bash

npm install
```
### 3. Configure environment variables
```bash
Create a .env file and provide the required values:
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```


### 4. Database migration
```bash
npm run db:migrate
```
