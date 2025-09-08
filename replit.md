# BMO Interactive Portfolio

## Overview

BMO Interactive Portfolio is a creative web application inspired by the character BMO from Adventure Time. The project creates an immersive, retro gaming-style portfolio experience where users interact with a virtual BMO character that serves as both the interface and the content delivery system. The application features a file explorer interface accessed through BMO's screen, showcasing portfolio sections like projects, skills, and contact information in a nostalgic, pixel-art aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (September 8, 2025)

### Enhanced Video Player Integration
- Fixed Vercel deployment configuration for serverless functions
- Integrated enhanced video player interface inspired by BMO's retro aesthetic
- Added playlist-style video section with ReactPlayer integration
- Implemented tabbed interface (Home, Videos, AI Talk) within video section
- Connected local video files with YouTube URLs for dual playback options
- Enhanced video browsing experience with Adventure Time themed styling

### Deployment Fixes
- Updated Vercel configuration to properly handle serverless functions at `dist/index.js`
- Fixed asset import paths to work correctly on both Netlify and Vercel
- Resolved build output directory structure for seamless deployment

## System Architecture

### Frontend Architecture
The application uses a modern React-based frontend built with TypeScript and Vite. The component architecture follows a modular design with clearly separated concerns:

**Component Structure:**
- `BMOPortfolio`: Main container managing application state and navigation
- `BMOCharacter`: Core visual component representing the BMO character with animated screen
- `FileExplorer`: Retro-style file browser interface for navigation
- `ContentSection`: Dynamic content renderer for different portfolio sections
- `ChatModal`: Interactive chat feature simulating conversation with BMO

**State Management:**
The application uses React's built-in state management with hooks for handling navigation between different sections (face, explorer, about, projects, skills, contact). State is managed locally within components without external state management libraries.

**Styling System:**
The project implements a comprehensive design system using:
- Tailwind CSS for utility-first styling
- CSS custom properties for BMO-themed color scheme (teal, green, yellow accents)
- Shadcn/ui component library for consistent UI elements
- Custom font integration (Press Start 2P for pixel aesthetics, Orbitron for tech feel)

### Backend Architecture
The backend follows a minimal Express.js setup designed for potential expansion:

**Server Structure:**
- Express.js server with middleware for JSON parsing and logging
- Modular routing system with `/api` prefix for future API endpoints
- Error handling middleware for consistent error responses
- Development-specific Vite integration for hot module replacement

**Storage Interface:**
The application defines a storage abstraction layer with:
- `IStorage` interface defining CRUD operations
- `MemStorage` implementation for in-memory data persistence
- User management schema prepared for authentication features
- Extensible design allowing easy database integration

### Data Storage Solutions
**Current Implementation:**
- In-memory storage for development and testing
- User schema defined with Drizzle ORM
- PostgreSQL configuration prepared for production deployment

**Database Schema:**
- Users table with UUID primary keys, username, and password fields
- Zod schema validation for type safety
- Migration system configured with Drizzle Kit

### Authentication and Authorization
The application includes infrastructure for user authentication:
- Session management prepared with connect-pg-simple
- Password handling capabilities in user schema
- React Query setup for API communication with credential support
- Error handling for unauthorized access (401 responses)

## External Dependencies

### Core Framework Dependencies
- **React 18**: Component-based frontend framework with hooks
- **TypeScript**: Type safety and enhanced developer experience
- **Vite**: Fast build tool and development server
- **Express.js**: Backend web framework
- **Wouter**: Lightweight client-side routing

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Pre-built component library with Radix UI primitives
- **Radix UI**: Accessible, unstyled UI components
- **Class Variance Authority**: Component variant management
- **Lucide React**: Icon library

### Database and ORM
- **Drizzle ORM**: Type-safe SQL toolkit
- **Drizzle Kit**: Database migration and schema management
- **@neondatabase/serverless**: PostgreSQL database connector
- **Drizzle Zod**: Schema validation integration

### Development Tools
- **React Query (TanStack Query)**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution for development

### External Services
- **Google Fonts**: Custom font loading (Press Start 2P, Orbitron)
- **Font Awesome**: Icon library for retro gaming aesthetics
- **Replit Integration**: Development environment optimization and error handling

The architecture prioritizes developer experience with hot reloading, type safety, and modular design while maintaining the creative, interactive nature of the BMO-themed portfolio concept.