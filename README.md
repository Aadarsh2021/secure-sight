# 🎯 SecureSight - CCTV Monitoring Dashboard

A modern, real-time CCTV monitoring dashboard built with Next.js 15, TypeScript, and Prisma. Features computer vision threat detection with a professional dark-themed UI.

## 🚀 Live Demo

**Dashboard**: [https://secure-sight-2xdn3np7l-aadarsh2021s-projects.vercel.app/](https://secure-sight-2xdn3np7l-aadarsh2021s-projects.vercel.app/)

## 📋 Features

### ✅ **Mandatory Scope (Complete)**
- **Navbar**: Professional navigation with MANDLACX branding
- **Incident Player**: Large video frame with timestamp overlay and camera selection
- **Incident List**: Thumbnail-based list with resolve functionality and optimistic UI

### ✅ **Optional Scope (Complete)**
- **Incident Timeline**: 24-hour timeline with camera-specific incident markers
- **Professional UI**: Exact Figma design replication with dark theme

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (cloud) / SQLite (local development)
- **Styling**: Tailwind CSS with custom dark theme
- **Icons**: Heroicons
- **Date Handling**: date-fns

## 🗄️ Database Schema

```prisma
model Camera {
  id       Int        @id @default(autoincrement())
  name     String
  location String
  incidents Incident[]
}

model Incident {
  id           Int      @id @default(autoincrement())
  cameraId     Int
  type         String
  tsStart      DateTime
  tsEnd        DateTime
  thumbnailUrl String
  resolved     Boolean  @default(false)
  camera       Camera   @relation(fields: [cameraId], references: [id])
}
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aadarsh2021/secure-sight.git
   cd secure-sight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # For local development (SQLite)
   echo "DATABASE_URL=\"file:./dev.db\"" > .env
   
   # For production (PostgreSQL)
   echo "DATABASE_URL=\"postgresql://username:password@host:port/database\"" > .env
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Set up a cloud database** (required for Vercel):
   - **Option A**: [Neon](https://neon.tech) (PostgreSQL)
   - **Option B**: [PlanetScale](https://planetscale.com) (MySQL)
   - **Option C**: [Supabase](https://supabase.com) (PostgreSQL)

2. **Deploy to Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Configure environment variables in Vercel**:
   ```
   DATABASE_URL="your-cloud-database-url"
   ```

4. **Initialize the database**:
   Visit: `https://your-app.vercel.app/api/seed`

### Alternative Deployments

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on:
- Netlify deployment
- Render deployment
- Docker deployment

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/incidents` | GET | Fetch incidents (supports `?resolved=false` filter) |
| `/api/incidents/[id]` | GET | Fetch single incident |
| `/api/incidents/[id]/resolve` | PATCH | Resolve an incident |
| `/api/cameras` | GET | Fetch all cameras |
| `/api/seed` | GET | Initialize database with sample data |

## 🎨 UI Components

### Incident Player
- Large video frame with timestamp overlay
- Live indicator with camera label
- Mini camera strip for quick switching
- Responsive design with aspect ratio preservation

### Incident List
- Thumbnail-based incident cards
- Color-coded threat type icons
- Camera location and timestamp display
- Optimistic UI for resolve actions
- Hover effects and smooth transitions

### Incident Timeline
- 24-hour timeline with hour markers
- Camera-specific incident visualization
- Draggable time scrubber
- Playback controls
- Real-time current time indicator

## 🔧 Development

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   ├── IncidentPlayer.tsx
│   ├── IncidentList.tsx
│   ├── IncidentTimeline.tsx
│   └── Navbar.tsx
└── lib/                   # Utilities
    └── prisma.ts          # Prisma client singleton
```

### Key Features
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Performance**: Optimized builds with Next.js 15
- **Responsive**: Mobile-first design approach
- **Accessibility**: Semantic HTML and ARIA labels

## 🎯 Assessment Requirements

### ✅ **Completed Requirements**
- [x] Public GitHub repository
- [x] Production build success
- [x] Live deployment URL
- [x] Comprehensive documentation
- [x] Database schema with relationships
- [x] API endpoints for CRUD operations
- [x] Professional UI matching Figma design
- [x] Optimistic UI for better UX
- [x] Error handling and loading states

### 📋 **Technical Decisions**

1. **Next.js 15 App Router**: Latest features and performance optimizations
2. **Prisma ORM**: Type-safe database operations with auto-generated client
3. **Tailwind CSS**: Utility-first styling for rapid development
4. **SQLite (local) / PostgreSQL (production)**: Flexible database setup
5. **TypeScript**: Enhanced developer experience and type safety
6. **Vercel Deployment**: Optimized for Next.js with automatic builds

## 🔮 Future Improvements

- [ ] Real-time video streaming integration
- [ ] User authentication and role-based access
- [ ] Advanced filtering and search capabilities
- [ ] Export functionality for incident reports
- [ ] Mobile app development
- [ ] AI-powered threat detection
- [ ] Multi-tenant architecture
- [ ] Performance monitoring and analytics

## 📝 License

This project is created for technical assessment purposes.

## 🤝 Contributing

This is a technical assessment project. For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Next.js 15, TypeScript, and Prisma**
