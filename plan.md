# Kitchen Lanka - Implementation Plan

## Project Overview
A simple food delivery/menu web application built with Next.js, Tailwind CSS, and SQLite.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite (via Prisma)
- **Icons**: Lucide-React

## File Structure
```
/
├── prisma/
│   ├── schema.prisma       # Database schema (FoodItem model)
│   └── seed.ts             # Seed script for initial data
├── public/                 # Static assets (images)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/       # Simple auth API
│   │   │   └── foods/      # CRUD API for food items
│   │   ├── admin/
│   │   │   ├── login/      # Admin login page
│   │   │   └── page.tsx    # Admin dashboard
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Public Menu page
│   ├── components/
│   │   ├── FoodCard.tsx    # Display individual food item
│   │   ├── Cart.tsx        # Cart management and WhatsApp checkout
│   │   ├── AdminNav.tsx    # Navigation for admin
│   │   └── FoodForm.tsx    # Form to add/edit food items
│   └── lib/
│       ├── prisma.ts       # Prisma client instance
│       └── utils.ts        # Helper functions
├── .env                    # Environment variables (ADMIN_USER, ADMIN_PASS)
├── next.config.js
├── package.json
└── tailwind.config.ts
```

## Execution Steps

1.  **Scaffold Project**: Initialize Next.js app with Tailwind CSS. (Done)
2.  **Database Setup**:
    -   Initialize Prisma with SQLite.
    -   Define `FoodItem` model.
    -   Run migration/push.
    -   Seed database with 5 dummy items.
3.  **Core Components**:
    -   Create `FoodCard` for displaying items.
    -   Create `Cart` component with WhatsApp integration.
4.  **Public View**:
    -   Implement `app/page.tsx` to fetch and display food items.
    -   Integrate Cart functionality.
5.  **Admin View**:
    -   Implement simple authentication (cookie/session based or simple client-side check for MVP).
    -   Create Admin Dashboard to manage items (Add, Edit, Delete, Toggle Stock).
6.  **Styling & Polish**:
    -   Apply "Warm, appetizing" color theme.
    -   Ensure mobile responsiveness.
