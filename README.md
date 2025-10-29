# BookIt: Experiences & Slots

A fullstack web application for booking travel experiences and activities.

## Project Structure

```
.
├── frontend/           # Next.js + TypeScript frontend
└── backend/           # Express.js + TypeScript backend
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database named 'bookit'

4. Configure your environment variables:
   - Copy `.env.example` to `.env`
   - Update the database credentials in `.env`

5. Run database migrations:
   ```bash
   npm run migrate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be running on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running on http://localhost:3000

## Features

- Browse travel experiences
- View experience details and available slots
- Book experiences
- Apply promo codes
- Receive booking confirmations

## API Endpoints

- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience details
- `POST /api/bookings` - Create a new booking
- `POST /api/promo/validate` - Validate promo codes

## Tech Stack

### Frontend
- Next.js
- TypeScript
- TailwindCSS
- Axios

### Backend
- Express.js
- TypeScript
- PostgreSQL
- Node.js

## Deployment

The application is deployed on:
- Frontend: [URL to be added]
- Backend: [URL to be added]