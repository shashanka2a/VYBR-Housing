# VYBR Housing - Next.js App

A modern student housing platform built with Next.js 14, React 18, and Tailwind CSS.

## Features

- 🏠 **Smart Housing Discovery** - AI-powered search for student accommodations
- 👥 **Roommate Matching** - Find compatible roommates based on preferences
- 📱 **Mobile-First Design** - Responsive design optimized for all devices
- 🤖 **VYBR AI Assistant** - Intelligent housing recommendations
- 🔍 **Advanced Filters** - Detailed search and filtering options
- 📋 **Sublease Marketplace** - Find and list sublease opportunities

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: Radix UI + Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **TypeScript**: Full type safety
- **Deployment**: Static export ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run export
```

The static files will be generated in the `out` directory.

## Project Structure

```
├── pages/                 # Next.js pages
│   ├── _app.tsx          # App wrapper with theme provider
│   ├── _document.tsx     # HTML document structure
│   └── index.tsx         # Main application page
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   ├── auth/        # Authentication components
│   │   ├── search/      # Search and filtering
│   │   ├── property/    # Property-related components
│   │   └── layout/      # Layout components
│   ├── styles/          # Global styles
│   └── assets/          # Static assets
├── public/              # Static files
└── out/                 # Static export output
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Generate static export
- `npm run lint` - Run ESLint

## Deployment

This app is configured for static export and can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.