# Still App

A modern, interactive learning app built with React, TypeScript, Zustand, and Vite. Designed for students and families to learn physics and other subjects through lessons, quizzes, badges, and dashboards.

## Features

- **Slide-based Lessons**: Engaging, story-driven lessons with progress tracking.
- **Interactive Quizzes**: Test your knowledge with instant feedback and stats.
- **Badges & Achievements**: Earn badges and certificates for your progress.
- **Family & Teacher Dashboards**: Track progress, streaks, and stats for multiple students.
- **Dark/Light Theme**: Toggle between beautiful dark and light modes.
- **Persistent State**: User progress and settings are saved locally.
- **Accessible & Responsive**: Works great on desktop and mobile.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (fast dev/build)
- **Zustand** (state management)
- **Tailwind CSS** (utility-first styling)
- **Vitest** + **React Testing Library** (testing)
- **Dexie** (IndexedDB wrapper)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
```bash
npm install
```

### Development
Start the development server:
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build
Create a production build:
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

### Linting
Check code style and lint errors:
```bash
npm run lint
```

### Testing
Run all tests:
```bash
npm test
```
Run tests with UI:
```bash
npm run test:ui
```
Run tests with coverage:
```bash
npm run test:coverage
```

## Project Structure

```
project/
├── public/                # Static assets and manifest
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── layout/        # Layout components (AppHeader, etc)
│   │   ├── navigation/    # Navigation bar
│   │   ├── notifications/ # Badge notifications
│   │   ├── quiz/          # Quiz-related components
│   │   ├── views/         # Page-level views (HomeView, LessonsView, etc)
│   │   └── ...            # Other UI components
│   ├── data/              # Static data (lessons, questions, etc)
│   ├── hooks/             # Custom React hooks
│   ├── services/          # Database and external services
│   ├── store/             # Zustand stores for app state
│   ├── types/             # TypeScript type definitions
│   ├── test/              # Test utilities and setup
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Tailwind and global styles
├── package.json           # Project metadata and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── README.md              # Project documentation
```

## Testing Philosophy
- **Colocated tests**: Each component has a `.test.tsx` file next to it.
- **Mocking**: External dependencies and stores are mocked for isolation.
- **Coverage**: All core features and UI are covered by tests.

## Contributing
Pull requests and issues are welcome! Please open an issue to discuss major changes.

## License
MIT 