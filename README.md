# TaskFlow - Modern Task Management Application

A beautiful, responsive task management application built with React, TypeScript, and Node.js. TaskFlow demonstrates modern web development practices with polished UI components, accessibility features, and seamless backend integration.

## ✨ Features

### Frontend
- **Modern React with TypeScript** - Type-safe development with latest React patterns
- **Responsive Design** - Mobile-first approach with CSS modules
- **Accessibility First** - WCAG compliant with keyboard navigation and screen reader support
- **Polished UI Components** - Custom components with consistent design system
- **Real-time Feedback** - Toast notifications and loading states
- **Offline Detection** - Connection status monitoring
- **Form Validation** - Client-side validation with clear error messages

### Backend
- **RESTful API** - Well-structured endpoints with Express.js
- **Type Safety** - Full TypeScript implementation
- **Input Validation** - Server-side validation with express-validator
- **Security** - Helmet.js for security headers, CORS protection
- **Error Handling** - Comprehensive error handling with user-friendly messages
- **API Documentation** - Self-documenting API responses

### Task Management
- **Create Tasks** - Add tasks with title, description, priority, and due dates
- **Edit Tasks** - Update any task properties
- **Complete Tasks** - Mark tasks as done with visual feedback
- **Delete Tasks** - Remove tasks with confirmation dialogs
- **Filter Tasks** - View all, active, or completed tasks
- **Priority Levels** - Low, medium, and high priority with visual indicators
- **Due Dates** - Optional deadlines with overdue detection

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskflow-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The API will be available at `http://localhost:3001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The application will open at `http://localhost:3000`

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/          # Reusable UI components
│   ├── Button/         # Button component with variants
│   ├── Input/          # Form input components
│   ├── Modal/          # Modal dialog component
│   ├── TaskCard/       # Task display component
│   └── TaskForm/       # Task creation/editing form
├── services/           # API integration
├── styles/             # Global styles and CSS modules
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

### Backend Structure
```
src/
├── server.ts           # Express server setup
└── types.ts            # Shared type definitions
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6) - Action buttons, links, focus states
- **Success**: Green (#22c55e) - Completed tasks, success messages
- **Warning**: Yellow (#f59e0b) - Medium priority, due today
- **Danger**: Red (#ef4444) - High priority, overdue, delete actions
- **Gray Scale**: Neutral colors for text and backgrounds

### Typography
- **Font Family**: System font stack for optimal performance
- **Font Sizes**: Consistent scale (sm, base, lg, xl, 2xl)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- **Base Unit**: 4px (0.25rem)
- **Scale**: xs(4px), sm(8px), md(16px), lg(24px), xl(32px), 2xl(48px)

## 🌐 API Endpoints

### Tasks
- `GET /api/tasks` - Retrieve all tasks
- `GET /api/tasks/:id` - Retrieve a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Health Check
- `GET /health` - Check API server status

## 🧪 Testing

Run the frontend development server:
```bash
cd frontend
npm start
```

Run the backend development server:
```bash
cd backend
npm run dev
```

## 📱 Responsive Design

TaskFlow is built with a mobile-first approach:
- **Mobile**: 320px+ - Single column layout, touch-friendly interactions
- **Tablet**: 768px+ - Improved spacing, multi-column forms
- **Desktop**: 1024px+ - Full grid layout, hover effects

## ♿ Accessibility Features

- **Keyboard Navigation** - Full keyboard support for all interactive elements
- **Screen Reader Support** - Proper ARIA labels and semantic HTML
- **Focus Management** - Visible focus indicators and logical focus order
- **Color Contrast** - WCAG AA compliant color combinations
- **Reduced Motion** - Respects user's motion preferences

## 🔧 Built With

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS Modules** - Scoped styling
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 🚀 Production Deployment

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with a static file server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Skills Demonstrated

This project showcases:
- **Modern React Development** - Hooks, TypeScript, component patterns
- **UI/UX Design** - Consistent design system, responsive layouts
- **Accessibility** - WCAG compliance, keyboard navigation
- **Backend Development** - RESTful APIs, validation, error handling
- **Code Quality** - TypeScript, modular architecture, best practices
- **User Experience** - Clear feedback, error handling, loading states# taskflow-app
