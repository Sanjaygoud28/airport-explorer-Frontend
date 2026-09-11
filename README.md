# ✈️ Airport Explorer

A global aviation intelligence platform and interactive directory. Look up any airport, city, country, runway, or geographic location worldwide.

![Airport Explorer Banner](https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop)

## 🌟 Overview

**Airport Explorer** is a modern, responsive web application that allows users to discover detailed information about airports around the globe. Whether you're an aviation enthusiast, a pilot, or a data researcher, this platform provides interactive mapping, comprehensive directories, and rich data visualizations for thousands of airports.

### Key Features
- **🌍 Global Directory:** Browse and filter through an extensive list of international and regional airports.
- **🗺️ Interactive Maps:** Visualize airport locations and details dynamically using Leaflet.
- **🔍 Advanced Search:** Instantly find hubs by their IATA codes, names, or locations.
- **📱 Responsive Design:** A mobile-first, seamless user experience built with Tailwind CSS.
- **🔐 Role-Based Access Control:** Configured access for Guests, Authenticated Explorers, and Administrators (In Development).

## 🛠️ Technology Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management & Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) & Zustand
- **Mapping:** [React Leaflet](https://react-leaflet.js.org/) & OpenStreetMap
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** React Router

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sanjaygoud28/airport-explorer-Frontend.git
   cd airport-explorer-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 🏗️ Project Structure

```text
src/
├── components/     # Reusable UI components (airport cards, maps, navigation)
├── data/           # Mock data and constants
├── hooks/          # Custom React hooks (e.g., useAirportsQuery)
├── lib/            # Utility functions and library configurations
├── pages/          # Full page layouts (Home, Browse, Admin, etc.)
├── routes/         # Routing logic and protected route wrappers
└── stores/         # Zustand state management (authStore)
```

## 🛣️ Roadmap
- [x] Phase 1: Core Layout & Navigation
- [x] Phase 2: Airport Directory & Data Fetching
- [x] Phase 3: Interactive Maps Integration
- [ ] Phase 4: Authentication & User Profiles
- [ ] Phase 5: Administrator Dashboard

## 📝 License
This project is currently in active development.

---
*Built with ❤️ for aviation enthusiasts.*
