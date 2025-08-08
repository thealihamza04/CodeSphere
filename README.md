
# CodeSphere 🌐 (Frontend)

**A Developer Collaboration Platform UI**  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) 
![GitHub stars](https://img.shields.io/github/stars/thealihamza04/CodeSphere?style=social)

Frontend interface for CodeSphere - a platform for developers to collaborate and share code snippets (Mock API data used for demonstration).

![CodeSphere UI Screenshot](./screenshot.png) <!-- Add actual screenshot path -->

## Features ✨

- **Code Editor Interface** - Monaco Editor integration
- **Mock API Integration** - Demonstrates full UI functionality
- **Responsive Design** - Works on all devices
- **Interactive Components**:
  - Code snippet sharing UI
  - Project management dashboard
  - User profile pages
  - Documentation viewer

## Tech Stack 🛠️

**Frontend:**
- React.js (v18+)
- TypeScript
- Redux Toolkit (State Management)
- Monaco Editor (VS Code's editor)
- Tailwind CSS (Styling)
- Axios (Mock API calls)
- React Router (v6+)

**Mock API:**
- JSON-server (Simulated backend)
- Faker.js (Mock data generation)

## Installation 💻

### Prerequisites
- Node.js (v16+)
- npm/yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/thealihamza04/CodeSphere.git
   cd CodeSphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the mock API server** (in separate terminal)
   ```bash
   npm run mock-api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   App will open at `http://localhost:3000`

## Project Structure 📂

```
src/
├── components/      # Reusable UI components
├── pages/           # Page components
├── services/        # Mock API services
├── store/           # Redux store
├── types/           # TypeScript types
├── utils/           # Utility functions
├── App.tsx          # Main component
└── main.tsx         # Entry point
```

## Mock API Endpoints 📡

The UI works with these simulated endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/snippets` | GET | Get code snippets |
| `/api/projects` | POST | Create project |
| `/api/users` | GET | Get user data |

To modify mock data, edit `src/mocks/db.json`

## Available Scripts 🛠

- `npm start`: Runs the app
- `npm run mock-api`: Starts mock API server
- `npm run build`: Production build
- `npm test`: Runs tests
- `npm run lint`: Runs ESLint

## Connecting to a Real Backend 🔌

To connect to your backend:

1. Create `.env` file:
   ```env
   REACT_APP_API_URL=http://your-backend-url.com/api
   ```

2. Update API service files in `src/services/`

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
