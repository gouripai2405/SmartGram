# SmartGram - Digital Grampanchayat Portal

A modern, responsive web application for village governance and citizen services. SmartGram streamlines village administration and enables seamless citizen engagement through an intuitive digital platform.

## 🌟 Features

### Core Functionality
- **File Complaints**: Citizens can report grievances about village issues with real-time status tracking
- **Tax Management**: View and pay property taxes, water taxes, and other dues online with instant receipts
- **Notices & News**: Stay updated with official announcements and important village notices
- **Support Tickets**: Get instant help from the support team through the portal
- **Digital Receipts**: Access all receipts and transaction records in one secure place
- **User Profiles**: Manage personal information and account settings

### Administrative Features
- **Dashboard Analytics**: View key statistics at a glance
- **Complaint Management**: Track and manage citizen complaints
- **User Management**: Administer user accounts and permissions
- **Report Generation**: Generate comprehensive reports

## 🏗️ Project Structure

```
/app
  ├── page.tsx                 # Landing page
  ├── login/                   # Login page
  ├── register/                # Registration page
  ├── dashboard/               # Main dashboard
  ├── complaints/              # Complaints management
  ├── taxes/                   # Tax management
  ├── notices/                 # Notices and announcements
  ├── support/                 # Support tickets
  ├── receipts/                # Transaction receipts
  ├── profile/                 # User profile management
  └── layout.tsx               # Root layout with auth provider

/components
  ├── header.tsx               # Navigation header with responsive menu
  ├── footer.tsx               # Footer component
  ├── layout.tsx               # Page wrapper with header/footer
  └── dashboard-components.tsx # Reusable dashboard cards

/lib
  ├── auth-context.tsx         # Authentication context and hooks
  ├── api.ts                   # Mock API service layer
  ├── types.ts                 # TypeScript type definitions
  └── utils.ts                 # Utility functions
```

## 🎨 Design System

- **Color Scheme**: Green primary (#22c55e), with neutral grays and accent colors
- **Typography**: Geist font family for consistent, modern appearance
- **Responsive Design**: Mobile-first approach with tailored breakpoints
- **Components**: Built with shadcn/ui for consistency and accessibility

### Design Tokens
- Primary Green: oklch(0.5 0.25 142)
- Background: oklch(0.995 0.001 70) - Off-white
- Foreground: oklch(0.15 0 0) - Dark slate
- Accent: oklch(0.58 0.25 142) - Brighter green

## 🔐 Authentication

### Mock Authentication (Frontend Only)
The application uses mock authentication for demonstration purposes. Demo credentials:
- **Email**: `citizen@example.com`
- **Password**: `password123`

Authentication state is managed via React Context with localStorage persistence for development.

### Ready for Backend Integration
The API service layer (`lib/api.ts`) is structured to easily integrate with a real backend:
- All API calls use consistent patterns
- Mock data can be replaced with real endpoints
- JWT token storage is ready for production authentication

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser to http://localhost:5000
```

### Build for Production

```bash
pnpm build
pnpm start
```

## 📋 Pages Overview

### Public Pages
- **Home (`/`)**: Landing page with features and CTAs
- **Login (`/login`)**: User authentication
- **Register (`/register`)**: New user registration

### Protected Pages (Authentication Required)
- **Dashboard (`/dashboard`)**: Overview with key statistics and quick access to services
- **Complaints (`/complaints`)**: File and track complaints
- **Taxes (`/taxes`)**: View and manage tax payments
- **Notices (`/notices`)**: Browse official announcements
- **Support (`/support`)**: Create and track support tickets
- **Receipts (`/receipts`)**: View transaction history and receipts
- **Profile (`/profile`)**: Manage account information

## 🛠️ Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form + Zod validation
- **Notifications**: Sonner (toast notifications)
- **Icons**: Lucide React
- **State Management**: React Context API

## 📝 Form Validation

All forms use React Hook Form with Zod for type-safe validation:
- Login/Register: Email format, password strength
- Complaints: Required fields with min/max lengths
- Tax Payments: Amount validation and payment method selection
- Support: Priority levels and category selection

## 🎯 Key Features Implementation

### Responsive Navigation
- Desktop: Full navigation bar
- Mobile: Hamburger menu with slide-out navigation
- Dynamic nav based on authentication status

### Data Fetching
- Mock API service with simulated delays
- Error handling with user-friendly notifications
- Loading states with skeleton loaders

### Form Handling
- Real-time validation feedback
- Disabled submit buttons during processing
- Toast notifications for success/error states

### Protected Routes
- Automatic redirect to login if not authenticated
- Dashboard only accessible when logged in
- Session persistence using localStorage

## 🔄 Future Backend Integration

To connect a real backend:

1. **Update API endpoints** in `/lib/api.ts`
2. **Replace mock data** with actual API calls
3. **Implement proper authentication** with JWT tokens
4. **Add environment variables** for API URLs
5. **Implement error boundary** for better error handling

Example mock function ready for real backend:
```typescript
// Current mock (in lib/api.ts)
export const complaintsAPI = {
  list: async () => mockComplaints,
  create: async (data) => { /* mock */ },
}

// Replace with real backend:
export const complaintsAPI = {
  list: async () => fetch('/api/complaints').then(r => r.json()),
  create: async (data) => fetch('/api/complaints', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(r => r.json()),
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All pages are optimized for touch on mobile and have proper spacing and font sizes.

## ♿ Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators on all interactive elements
- High contrast colors meeting WCAG standards

## 📄 License

This project is built as a demonstration of modern web development practices.

---

**SmartGram** - Empowering villages through digital governance.
