# LigAI - AI-Powered Business Management Platform

## Overview

LigAI is a modern business management platform that leverages artificial intelligence to help companies collect strategic information, manage processes efficiently, and make data-driven decisions. The application is built as a full-stack web application with a React frontend and Express.js backend, designed to capture leads and contacts through an elegant landing page.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript and follows a modern component-based architecture:
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
The backend uses Express.js with TypeScript in a RESTful API design:
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: In-memory storage with fallback to database sessions
- **Validation**: Zod schemas for data validation

### Development Setup
- **Monorepo Structure**: Single repository with client, server, and shared code
- **Hot Reloading**: Vite dev server with HMR
- **Development Tools**: TSX for running TypeScript, ESBuild for production builds

## Key Components

### Data Models
The application defines three main entities in the shared schema:
- **Users**: Basic user management with username/password authentication
- **Leads**: Contact information capture for potential customers
- **Contacts**: Detailed contact form submissions with messages

### Frontend Components
- **Landing Page Sections**: Hero, Features, Solutions, Benefits, Testimonials, CTA, Contact
- **Navigation**: Fixed header with smooth scroll navigation
- **Forms**: Lead capture and contact forms with validation
- **UI Library**: Complete set of reusable components from shadcn/ui

### Backend Services
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **API Routes**: RESTful endpoints for leads and contacts management
- **Validation**: Server-side data validation using Zod schemas

## Data Flow

### Lead Capture Flow
1. User fills out lead form on hero section
2. Frontend validates data and sends POST request to `/api/leads`
3. Backend validates data with Zod schema
4. Lead is stored in database/memory
5. Success response triggers user notification

### Contact Form Flow
1. User fills out detailed contact form
2. Frontend validates required fields
3. POST request sent to `/api/contacts`
4. Backend validates and stores contact information
5. User receives confirmation toast notification

### Data Retrieval
- Admin endpoints available at `/api/leads` and `/api/contacts` for retrieving stored data
- Currently uses in-memory storage with planned database integration

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, Wouter for routing
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: TanStack Query for API state
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React icons
- **Utilities**: Class variance authority, clsx, date-fns

### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for schema validation
- **Session**: Connect-pg-simple for session management
- **Development**: TSX for TypeScript execution

### Development Tools
- **Build**: Vite, ESBuild
- **Database**: Drizzle Kit for migrations
- **Replit Integration**: Cartographer and runtime error overlay

## Deployment Strategy

### Production Build
- Frontend builds to `dist/public` directory
- Backend bundles to `dist/index.js` with ESBuild
- Static assets served by Express in production

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Neon serverless PostgreSQL for production database
- Development uses Vite dev server with API proxy

### Deployment Process
1. `npm run build` creates production builds
2. `npm start` runs production server
3. Database migrations handled via `npm run db:push`

The application is designed for easy deployment on platforms like Replit, with built-in development tools and configuration for seamless development-to-production workflow.