# Speedcubing Finland - Frontend

React-based frontend application for Speedcubing Finland website.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## 📋 Features

- **Public Pages**
  - Home - Organization overview and meeting invitations
  - Competitions - Upcoming WCA competitions in Finland
  - Join - Member registration form
  - Info - Organization information
  - Contact - Contact information

- **Admin Panel**
  - JWT-based authentication
  - Review pending membership applications
  - Approve/reject applications
  - CSV comparison tool for WCA competition participants

## 🛠️ Tech Stack

- React 18.3.1
- Vite 6.0.5 - Build tool
- React Router DOM 7.1.1 - Routing
- Tailwind CSS 3.4.17 - Styling
- Papa Parse 5.5.3 - CSV parsing

## ⚙️ Environment Variables

Create `.env` file:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
```

For production, change to your deployed backend URL.

## 🏗️ Build

```bash
npm run build
```

Output in `dist/` folder ready for deployment.

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Button.jsx
│   ├── CompetitionTable.jsx
│   ├── EventList.jsx
│   ├── Footer.jsx
│   ├── JoinForm.jsx
│   ├── Layout.jsx
│   ├── LoginForm.jsx
│   ├── MemberCsvChecker.jsx
│   ├── MeetingInvitation.jsx
│   └── Navbar.jsx
├── pages/            # Route pages
│   ├── Admin.jsx
│   ├── Competitions.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Info.jsx
│   └── Join.jsx
├── utilities/        # Helper functions
│   ├── api.js       # JWT-enabled API client
│   └── wcaApi.js    # WCA API integration
├── data/            # Static data
│   └── wcaEvents.js
└── assets/          # Images and static files
```

## 🔐 API Integration

The frontend uses a centralized API utility (`src/utilities/api.js`) that automatically:
- Adds JWT tokens to authenticated requests
- Handles token expiration and auto-logout
- Provides helper methods (get, post, put, delete)

### Usage Example

```javascript
import { api, login, logout } from '../utilities/api';

// Login
const { token } = await login('admin', 'password');

// Make authenticated request
const submissions = await api.get('/api/admin/submissions');

// Logout
logout();
```

## 🎨 Styling

- Tailwind CSS for utility classes
- Custom CSS in `index.css`
- Brand color: `#2969ff` (blue)
- Responsive design with mobile-first approach

## 📦 Dependencies

See `package.json` for complete list.

Key dependencies:
- `react` & `react-dom` - UI framework
- `react-router-dom` - Client-side routing
- `papaparse` - CSV file parsing
- `prop-types` - Runtime type checking

## 🚀 Deployment

1. Update `.env` with production API URL
2. Build: `npm run build`
3. Upload `dist/` folder to hosting provider

## 📝 Notes

- Finnish language UI
- WCA API integration for competition data
- Optimized images in WebP format where possible

---

For backend setup and deployment, see main [README.md](../README.md)
