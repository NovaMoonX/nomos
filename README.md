# Nomos

Nomos is a private, local AI assistant that transforms raw intent into a structured schedule. By offloading the "mental tax" of planning, it breaks down big goals into manageable daily wins. Built for privacy and executive focus, Nomos creates order from chaos. Your life, governed by logic. No more excuses.

## Features

### 🔐 Authentication & Security
- Email/password authentication with Firebase Auth
- Secure user sessions with automatic state management
- User-specific data isolation with Firestore security rules

### 📊 Data Management
- **Categories**: Organize your goals with importance levels (low, medium, high, critical)
  - Create and edit categories with custom names, descriptions, and colors
  - Visual importance badges for quick identification
  - Grid layout for easy browsing
  - Full CRUD operations (Create, Read, Update, Delete)
- **Goals**: High-level objectives linked to categories with target dates
- **Tasks**: Actionable items linked to goals with priority and due dates
- All data is user-scoped and protected by Firestore security rules

### 🎨 UI & Design
- Clean, modern interface with Dreamer UI components
- Dark/light theme support
- Responsive design for all screen sizes
- Toast notifications for user feedback
- Tab-based navigation for easy access to different sections
- Modal-based forms for creating and editing data

## Tech Stack

- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Firebase](https://firebase.google.com/) - Authentication and Firestore database
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Dreamer UI](https://www.npmjs.com/package/@moondreamsdev/dreamer-ui) - Component library
- [Vite](https://vitejs.dev/) - Build tool

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NovaMoonX/nomos.git
cd nomos
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication
   - Create a Firestore database
   - Create a `.env` file in the root directory with your Firebase configuration

4. Start the development server:
```bash
npm run dev
```

## Usage

After starting the application and signing in:

### Managing Categories

1. **View Categories**: Click the "Categories" tab in the navigation to see all your life categories
2. **Create Category**: 
   - Click the "Create Category" button
   - Fill in the category name (required)
   - Add an optional description
   - Select the importance level (Low, Medium, High, or Critical)
   - Optionally choose a color for visual identification
   - Click "Create Category" to save
3. **Edit Category**: Click the "Edit" button on any category card to modify its details
4. **Delete Category**: Click the "Delete" button on a category card to remove it (confirmation required)

Categories are displayed in a responsive grid layout with:
- Color-coded importance badges
- Optional custom color indicators
- Full descriptions
- Edit and delete controls

## Firebase Configuration

The project requires a `.env` file in the root directory with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

Get these values from your Firebase project settings.

## Firestore Security Rules

The application uses the following security model:
- All documents have an `ownerId` field
- Users can only read/write documents where `ownerId` matches their authenticated user ID
- This applies to all collections: `categories`, `goals`, and `tasks`

## Data Schema

All timestamps are stored as Unix timestamps in milliseconds (number type, not Date objects).
Optional fields use `| null` instead of `?:` for better Firebase compatibility.

### Category
```typescript
interface Category {
  id: string;
  ownerId: string;
  name: string;
  description: string | null;
  importance: 'low' | 'medium' | 'high' | 'critical';
  color: string | null;
  createdAt: number; // Unix timestamp in milliseconds
  updatedAt: number; // Unix timestamp in milliseconds
}
```

### Goal
```typescript
interface Goal {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  categoryId: string;
  targetDate: number | null; // Unix timestamp in milliseconds
  completed: boolean;
  createdAt: number; // Unix timestamp in milliseconds
  updatedAt: number; // Unix timestamp in milliseconds
}
```

### Task
```typescript
interface Task {
  id: string;
  ownerId: string;
  title: string;
  description: string | null;
  goalId: string;
  categoryId: string | null;
  dueDate: number | null; // Unix timestamp in milliseconds
  completed: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical' | null;
  createdAt: number; // Unix timestamp in milliseconds
  updatedAt: number; // Unix timestamp in milliseconds
}
```

## Project Structure

```
src/
├── components/        # Reusable UI components (Auth, ProtectedRoute, etc.)
├── contexts/          # React context providers (AuthContext)
├── hooks/             # Custom React hooks (useAuth, useAuthContext)
├── lib/               # Utilities and configurations
│   ├── app/           # App constants
│   ├── firebase/      # Firebase configuration
│   └── types/         # TypeScript type definitions
├── routes/            # Router configuration
├── screens/           # Page/route components
├── ui/                # Layout and core UI components
└── styles/            # Additional CSS/styling files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run fbdeploy` - Build and deploy to Firebase Hosting

## License

MIT
