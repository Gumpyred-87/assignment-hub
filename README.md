# AssignPro - AI Assignment Assistant

## Overview
An AI-powered platform for students and professionals to plan, research, draft, refine, and format academic and professional assignments end-to-end.

## Tech Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: PostgreSQL with Prisma ORM
- **AI**: Anthropic Claude API (server-side)
- **Auth**: Email/password + Google OAuth
- **Payments**: Stripe (Free/Pro/Team plans)
- **Exports**: DOCX, PDF, Markdown

## Features
- 🎯 **AI Assignment Wizard**: 4-step process from details to draft
- 📝 **Rich Text Editor**: TipTap-based with AI actions
- 📚 **Template Library**: 12 assignment types with pre-structured outlines
- 🔍 **Research Assistant**: AI-powered source suggestions and grounding
- 💳 **Subscription Billing**: Free/Pro/Team plans with Stripe
- 📊 **Usage Tracking**: Project limits based on subscription tier
- 🔐 **Secure Auth**: Email/password + Google OAuth
- 🌙 **Theme Support**: Dark mode toggle
- 📱 **Responsive Design**: Mobile-first approach
- 🚀 **Performance Optimized**: Next.js 15 features

## Getting Started

### Prerequisites
- Node.js 18+ (with npm)
- PostgreSQL database

### Installation
```bash
# Clone the repository
ggit clone https://github.com/Gumpyred-87/assignment-hub.git
cd assignment-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma client
npm run prisma:generate

# Start development server
npm run dev
```

### Database Setup
```bash
# Create PostgreSQL database
# Example: CREATE DATABASE assignpro;

# Set DATABASE_URL in your .env file
DATABASE_URL="postgresql://user:password@localhost:5432/assignpro?schema=public"
```

### Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session cookies
- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: OAuth credentials
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `NEXT_PUBLIC_APP_URL`: Your application URL

### Development Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run prisma:generate  # Generate Prisma client
```

## Project Structure
```
├── app/              # Next.js pages
├── components/      # UI components
├── lib/             # Utility functions
├── prisma/          # Database schema
├── scripts/         # Build scripts
├── public/          # Static assets
└── styles/          # Global CSS
```

## Features
- 🛠️ **AI Assignment Wizard**: 4-step process from details to draft
- 📝 **Rich Text Editor**: TipTap-based with AI actions
- 📚 **Template Library**: 12 assignment types with pre-structured outlines
- 🔍 **Research Assistant**: AI-powered source suggestions and grounding
- 💳 **Subscription Billing**: Free/Pro/Team plans with Stripe
- 📊 **Usage Tracking**: Project limits based on subscription tier
- 🔐 **Secure Auth**: Email/password + Google OAuth
- 🌙 **Theme Support**: Dark mode toggle
- 📱 **Responsive Design**: Mobile-first approach
- 🚀 **Performance Optimized**: Next.js 15 features

## Development Workflow
1. **Start with the assignment wizard** to create a new project
2. **Use the template library** or start from scratch
3. **Leverage the editor workspace** with AI assistance
4. **Export your work** in your preferred format

## Academic Integrity
AssignPro is designed as a **learning and drafting support tool**. Users are responsible for:
- Following their institution's academic integrity policies
- Reviewing and personalizing AI-generated content
- Verifying citations and sources
- Using the tool responsibly and ethically

## License
This project is for demonstration and development purposes. Commercial licenses available upon request.

## Support
For questions or issues, contact the project maintainers through GitHub issues.