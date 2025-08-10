# Overview

Le Soula is a modern bilingual (English/French) wine website showcasing high-altitude wines from the Fenouillèdes region. The application features a luxury editorial design with video-first presentation, emphasizing organic farming and terroir. Built as a full-stack React application with Express backend, it uses a clean modern architecture optimized for performance and user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for component-based UI development
- **Vite** as the build tool and development server for fast builds and hot module replacement
- **Wouter** for lightweight client-side routing
- **TailwindCSS** for utility-first styling with custom Le Soula brand colors (honey palette)
- **shadcn/ui** component library for consistent, accessible UI components
- **Radix UI** primitives for complex interactive components
- **TanStack Query** for server state management and data fetching

## Internationalization
- Custom language provider with English/French toggle
- Translation system with nested key support
- Browser language detection with localStorage persistence
- Dynamic content switching for wines, journal entries, and UI text

## Design System
- Custom color palette featuring honey (#E7A90E), ink (#0E0E0E), and paper (#FCFBF8) tones
- Typography combining Inter (sans-serif) and Crimson Text (serif) fonts
- Accessibility-first approach with reduced motion support
- Mobile-first responsive design with smooth animations

## Backend Architecture
- **Express.js** server with TypeScript
- Modular route registration system
- In-memory storage implementation with interface for future database migration
- Development-optimized Vite integration with middleware support
- Comprehensive request logging and error handling

## Database Schema
- **Drizzle ORM** with PostgreSQL dialect for type-safe database operations
- User management schema with UUID primary keys
- Zod validation schemas for runtime type checking
- Migration system for schema evolution

## Build and Development
- **ESBuild** for production server bundling
- Development mode with hot reloading and error overlays
- Replit-optimized configuration with cartographer integration
- TypeScript strict mode with path mapping for clean imports

## Performance Optimizations
- Lazy loading for images with proper loading states
- Video optimization with poster frames and multiple formats
- CSS-in-JS avoided in favor of utility classes for smaller bundle size
- Intersection Observer API for scroll-triggered animations

# External Dependencies

## Core Frameworks
- **React 18** - Frontend framework
- **Express.js** - Backend web server
- **Vite** - Build tool and development server
- **TypeScript** - Type safety across the stack

## Database and ORM
- **Drizzle ORM** - Type-safe database toolkit
- **@neondatabase/serverless** - Serverless PostgreSQL client
- **Postgres** (configured for Neon) - Primary database

## UI and Styling
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Variant-based component styling

## State Management
- **TanStack React Query** - Server state management
- **React Hook Form** - Form handling and validation
- **Zod** - Runtime schema validation

## Development Tools
- **@replit/vite-plugin-runtime-error-modal** - Development error handling
- **@replit/vite-plugin-cartographer** - Replit integration
- **PostCSS** with Autoprefixer - CSS processing

## Media and Assets
- **Embla Carousel React** - Touch-friendly carousels
- Custom video integration with fallback poster images
- Google Fonts integration for typography

## Third-party Services
- **Unsplash** - Stock photography for wine and vineyard imagery
- **Sample Videos** - Placeholder video content for hero section
- Browser APIs for language detection and intersection observation