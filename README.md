# Gym CRM

A comprehensive Customer Relationship Management (CRM) tool designed specifically for gyms and fitness centers.

## Features

- **Member Management**: Track all gym members with their personal information and membership status
- **Membership Management**: Manage different membership tiers and plans
- **Class Scheduling**: Schedule and manage fitness classes
- **Trainer Management**: Track trainers and their schedules
- **Dashboard**: Overview of key metrics and recent activity

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React** for UI components

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy to production:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub Integration

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Next.js and configure the build settings
6. Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository or upload your project folder
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

## Important Notes

⚠️ **Data Persistence**: This application currently uses an in-memory data store. Data will reset on server restarts and cold starts in serverless environments. For production use, connect to a database like:
- PostgreSQL (via Vercel Postgres, Supabase, or Railway)
- MongoDB (via MongoDB Atlas)
- Firebase Firestore
- Any other database service

## Project Structure

```
/app          - Next.js app directory (pages and routes)
/components   - Reusable React components
/lib          - Utility functions and types
/types        - TypeScript type definitions
```
