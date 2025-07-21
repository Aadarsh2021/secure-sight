# SecureSight - CCTV Monitoring Dashboard

A comprehensive CCTV monitoring software dashboard built with Next.js 15, featuring real-time incident detection, video feeds, and interactive timeline visualization.

![SecureSight Dashboard](https://img.shields.io/badge/Status-Complete-green)
![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.12.0-purple)

## 🎯 Features

### Mandatory Features ✅
- **Navbar**: MANDLACX branding with navigation links and user profile
- **Incident Player**: Large video feed with timestamp overlay and mini camera strip
- **Incident List**: Right panel with incident thumbnails, colored type icons, and resolve buttons
- **Database**: SQLite with Prisma ORM
- **API Routes**: RESTful endpoints for incident management
- **Seed Data**: 3 cameras + 15+ incidents across multiple threat types

### Optional Features ✅
- **Interactive Timeline**: 24-hour ruler with draggable scrubber and incident markers
- **Optimistic UI**: Smooth resolve button interactions
- **Dark Theme**: Modern, professional interface matching Figma design

## 🚀 Deployment Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd securesight

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed

# Start development server
npm run dev
```

### Production Deployment (Vercel)

1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Environment Variables** (set in Vercel dashboard):
   ```
   DATABASE_URL="file:./dev.db"
   ```

3. **Build Commands** (auto-detected by Vercel):
   ```bash
   npm run build
   npm start
   ```

### Alternative Deployment (Netlify/Render)

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**: Same as above

## 🛠 Tech Decisions

### Frontend Framework
- **Next.js 15 App Router**: Chosen for its modern architecture, built-in API routes, and excellent TypeScript support
- **TypeScript**: For type safety and better developer experience
- **TailwindCSS**: For rapid UI development and consistent design system

### Database & ORM
- **SQLite**: Lightweight, file-based database perfect for development and small-scale deployments
- **Prisma ORM**: Type-safe database client with excellent migration and seeding capabilities
- **Local File Storage**: Simple and reliable for assessment purposes

### State Management
- **React Hooks**: Local state management with useState and useEffect
- **Optimistic Updates**: Immediate UI feedback for better user experience
- **Server State**: Direct API calls with error handling

### UI/UX Design
- **Dark Theme**: Professional appearance suitable for security monitoring
- **Responsive Design**: Works across different screen sizes
- **Interactive Elements**: Hover states, transitions, and visual feedback
- **Accessibility**: Semantic HTML and keyboard navigation support

### API Design
- **RESTful Endpoints**: Simple and intuitive API structure
- **Query Parameters**: Flexible filtering (e.g., `?resolved=false`)
- **Error Handling**: Proper HTTP status codes and error messages
- **Type Safety**: Full TypeScript integration

## 🔮 If I Had More Time...

### Performance Optimizations
- Implement React Query/SWR for better caching and data synchronization
- Add virtual scrolling for large incident lists
- Optimize image loading with Next.js Image component
- Implement service workers for offline functionality

### Enhanced Features
- Real-time WebSocket connections for live incident updates
- Advanced filtering and search capabilities
- Export functionality (PDF reports, CSV data)
- User authentication and role-based access control
- Multi-language support

### Technical Improvements
- Add comprehensive unit and integration tests
- Implement proper error boundaries and fallback UI
- Add logging and monitoring (Sentry, LogRocket)
- Database connection pooling for production
- Implement proper CORS and security headers

### UI/UX Enhancements
- Add keyboard shortcuts for power users
- Implement drag-and-drop for incident management
- Add customizable dashboard layouts
- Implement dark/light theme toggle
- Add onboarding tutorial for new users

### Infrastructure
- Set up CI/CD pipeline with GitHub Actions
- Implement automated testing and deployment
- Add database backups and recovery procedures
- Set up monitoring and alerting systems
- Implement proper logging and analytics

## 📁 Project Structure

```
securesight/
├── prisma/                 # Database schema and migrations
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API routes
│   │   └── page.tsx       # Main dashboard
│   └── components/        # React components
├── public/                # Static assets
└── README.md             # This file
```

## 🎨 Design Implementation

The dashboard is an exact replica of the provided Figma design, featuring:
- **MANDLACX** branding and navigation
- **15 unresolved incidents** with proper timestamps
- **4 resolved incidents** counter
- **Interactive timeline** with camera-specific incident markers
- **Professional dark theme** with proper contrast and accessibility

## 📝 License

This project is created for technical assessment purposes.

---

**Built with ❤️ using Next.js, TypeScript, and Prisma**
