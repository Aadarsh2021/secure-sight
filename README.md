# SecureSight - AI-Powered CCTV Monitoring

SecureSight is a next-generation CCTV monitoring system that uses computer vision models to detect and prevent security threats in real-time. This project includes both the main dashboard for monitoring incidents and a 3D landing page showcasing the product features.

## Features

### Main Dashboard
- Real-time incident monitoring with camera feeds
- Incident list with threat categorization and timestamps
- Interactive timeline for navigating through incidents
- One-click incident resolution with optimistic UI updates
- Dark mode support

### 3D Landing Page
- Interactive 3D product showcase using React Three Fiber
- Animated feature highlights with custom shaders
- Responsive design with mobile support
- Dynamic lighting and particle effects

## Tech Stack

- **Frontend Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS for utility-first styling
- **Database**: Prisma with SQLite (easily switchable to PostgreSQL/MySQL)
- **3D Graphics**: React Three Fiber + Drei for 3D rendering
- **Animation**: React Spring for smooth animations
- **Type Safety**: TypeScript for better developer experience

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/securesight.git
   cd securesight
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Import your repository in Vercel
3. Add the following environment variables:
   - `DATABASE_URL`: Your database connection string
4. Deploy!

### Manual Deployment
1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Technical Decisions

1. **Next.js App Router**: Chosen for its file-based routing, server components, and built-in optimizations.

2. **SQLite Database**: 
   - Perfect for development and small to medium deployments
   - Easy to switch to PostgreSQL/MySQL for production
   - Zero-config setup with file-based storage

3. **Prisma ORM**:
   - Type-safe database queries
   - Easy schema migrations
   - Great developer experience with auto-completion

4. **React Three Fiber**:
   - Declarative 3D rendering in React
   - Excellent performance with WebGL
   - Rich ecosystem with Drei helpers

5. **TailwindCSS**:
   - Utility-first approach for rapid development
   - Built-in dark mode support
   - Easy responsive design

## Future Improvements

1. **Performance**:
   - Implement WebSocket for real-time updates
   - Add Redis caching for frequently accessed data
   - Optimize 3D models and textures

2. **Features**:
   - Add user authentication and role-based access
   - Implement incident categorization with ML
   - Add custom alert rules and notifications
   - Support for multiple camera layouts

3. **Developer Experience**:
   - Add comprehensive test suite
   - Implement CI/CD pipeline
   - Add Storybook for component documentation

4. **UX Enhancements**:
   - Add more interactive 3D features
   - Implement advanced video controls
   - Add export and reporting features
   - Enhance mobile responsiveness

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
