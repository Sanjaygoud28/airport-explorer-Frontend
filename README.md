# ✈️ Airport Explorer

A modern, responsive aviation intelligence platform for discovering and exploring airports around the world.

Airport Explorer allows users to search airports by name or IATA code, browse airport information, filter results, explore airport locations using interactive maps, and view detailed airport information.

---

## 🌟 Overview

**Airport Explorer** is a full-stack web application designed to provide an interactive directory of airports worldwide.

The frontend is built with **React and Vite**, styled using **Tailwind CSS**, and uses **React Leaflet** for interactive geographic visualization.

The project is being developed incrementally through multiple phases, starting with the public airport experience and progressing toward authentication and administrator functionality.

---

## ✨ Features

### 🌍 Airport Directory

- Browse airports from around the world
- Search airports by:
  - Airport name
  - IATA code
  - City
- Filter airports by:
  - Country
  - Airport type
- Paginated airport results
- Responsive airport cards

### 🔍 Airport Search

- Search directly from the home page
- Quick access to popular airport hubs
- Navigate directly to airport details

### ✈️ Airport Details

View detailed information including:

- Airport name
- IATA code
- ICAO code
- City
- Country
- Country code
- Airport type
- Elevation
- Geographic coordinates

### 🗺️ Interactive Maps

- Interactive maps powered by Leaflet
- Airport markers
- Airport popups
- Geographic airport visualization
- Map view inside the airport directory
- Responsive map layout

### 🔐 Authentication

Planned functionality:

- User login
- User signup
- User profile
- Authentication state
- Protected routes
- Role-based access control

### 👨‍💼 Administrator Dashboard

Planned functionality:

- Admin dashboard
- Airport statistics
- Airport management
- Add airport
- Edit airport
- Delete airport
- Protected administrator routes

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development & build tool |
| Tailwind CSS | Styling & responsive design |
| React Router | Client-side routing |
| TanStack Query | Server-state management & data fetching |
| React Leaflet | Interactive maps |
| Leaflet | Map rendering |
| OpenStreetMap | Map tiles |
| Lucide React | Icons |
| Zustand | Client-side state management |
| JavaScript | Application logic |

---

## 📁 Project Structure

```text
src/
│
├── components/
│   ├── airport/
│   │   ├── AirportCard.jsx
│   │   ├── AirportMap.jsx
│   │   ├── FilterPanel.jsx
│   │   └── Pagination.jsx
│   │
│   ├── common/
│   │   ├── Loading.jsx
│   │   ├── EmptyState.jsx
│   │   └── ErrorMessage.jsx
│   │
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PageContainer.jsx
│   │
│   └── ui/
│
├── data/
│   └── mockData.js
│
├── hooks/
│   ├── useAirportsQuery.js
│   └── useDebounce.js
│
├── lib/
│   └── queryClient.js
│
├── pages/
│   ├── Home.jsx
│   ├── BrowseAirports.jsx
│   ├── AirportDetails.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Profile.jsx
│   └── AdminDashboard.jsx
│
├── routes/
│   ├── ProtectedRoute.jsx
│   └── AdminRoute.jsx
│
└── stores/
    └── authStore.js