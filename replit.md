# LigAI - Vendas: Sistema de Vendas Automatizadas com IA

## Overview

LigAI - Vendas é um sistema revolucionário de vendas automatizadas que utiliza inteligência artificial para vender até 3.000 clientes diariamente. O sistema conecta WhatsApp (Cloud ou QR Code), realiza prospecção automática de clientes por segmento e localização, e possui um Vendedor IA treinado que atende e finaliza vendas automaticamente 24 horas por dia. A aplicação é construída como uma landing page responsiva e impactante para conversão de leads.

## User Preferences

Preferred communication style: Simple, everyday language in Portuguese.

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
- **Leads**: Contact information capture for potential customers interested in LigAI - Vendas
- **Contacts**: Detailed contact form submissions with messages for sales consultations

### Frontend Components
- **Landing Page Sections**: Hero (Vendas Automatizadas), Features (Recursos LigAI-Vendas), Solutions (3 Pilares), Benefits (Vantagens), Testimonials (Resultados Reais), CTA (Conversão), Contact
- **Navigation**: Fixed header with LigAI logo and smooth scroll navigation
- **Forms**: Lead capture and contact forms with validation for sales automation interest
- **UI Library**: Complete set of reusable components from shadcn/ui
- **Branding**: Uses attached LigAI logo and yellow/orange color scheme

### Backend Services
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **API Routes**: RESTful endpoints for leads and contacts management
- **Validation**: Server-side data validation using Zod schemas

## Data Flow

### Lead Capture Flow (Sales Automation Interest)
1. User fills out lead form expressing interest in automated sales system
2. Frontend validates data and sends POST request to `/api/leads`
3. Backend validates data with Zod schema
4. Lead is stored in database/memory
5. Success response triggers user notification about LigAI - Vendas contact

### Contact Form Flow (Sales Consultation)
1. User fills out detailed contact form for sales automation consultation
2. Frontend validates required fields
3. POST request sent to `/api/contacts`
4. Backend validates and stores contact information
5. User receives confirmation about LigAI - Vendas consultation scheduling

### Data Retrieval
- Admin endpoints available at `/api/leads` and `/api/contacts` for retrieving stored data
- Uses PostgreSQL database with Drizzle ORM for persistent data storage

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

## Recent Changes (January 2025)

### Complete LigAI - Vendas System Update
- **Updated all content** to reflect LigAI - Vendas sales automation system
- **New Logo Integration**: Uses provided LigAI logo throughout the application
- **Hero Section**: Updated to highlight automated sales capabilities (up to 3,000 clients/day)
- **Features Section**: 6 core features including WhatsApp integration, AI salesperson, prospecting
- **Solutions Section**: 3 main pillars - WhatsApp Integration, AI Salesperson, Prospecting & Reports
- **Benefits Section**: 4 key advantages focused on sales automation and cost reduction
- **Testimonials**: Updated with sales-focused testimonials showing concrete results
- **Navigation**: Updated menu items to reflect system features
- **Footer**: Updated branding and solution links
- **CTA Section**: Strong conversion-focused messaging for sales automation

### Key Messaging Updates
- Emphasizes WhatsApp Cloud integration to avoid blocks
- Highlights AI salesperson that works 24/7
- Focuses on automatic prospecting by segment and location
- Showcases ability to handle 3,000 customers daily
- Positions as complete sales automation solution
- Strong ROI and cost-benefit messaging throughout

### Database Integration (January 2025)
- **PostgreSQL Database**: Migrated from in-memory storage to persistent PostgreSQL database
- **Database Storage**: Implemented DatabaseStorage class using Drizzle ORM
- **Schema Migration**: Successfully pushed schema to database with `npm run db:push`
- **Persistent Data**: All leads and contacts now stored persistently in database