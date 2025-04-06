# Paraclimbing Belgium Website

A modern, responsive website for Paraclimbing Belgium, built with React, TypeScript, and Tailwind CSS.

## Overview

This website serves as an information and resource hub for the paraclimbing community in Belgium. It provides information about paraclimbing, upcoming events, ways to support the organization, and contact information.

## Tech Stack

- **Framework**: ReactJS with TypeScript (TSX)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Deployment**: Firebase Hosting

## Features

- Responsive design that works on all device sizes
- Interactive navigation with mobile-friendly menu
- Dynamic event listings with filtering capabilities
- Contact form with validation
- Comprehensive information about paraclimbing in Belgium

## Project Structure

```
paraclimbing_be_website/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components for each route
│   │   ├── HomePage.tsx
│   │   ├── ParaclimbingPage.tsx
│   │   ├── ActivitiesPage.tsx
│   │   ├── SupportUsPage.tsx
│   │   └── ContactPage.tsx
│   ├── App.tsx             # Main app component with routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles and Tailwind imports
├── public/                 # Static assets
│   ├── assets/             # Images and other media
│   └── index.html          # HTML template
├── firebase.json           # Firebase configuration
└── package.json            # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/paraclimbing-be-website.git
   cd paraclimbing-be-website
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

This project is configured for deployment to Firebase Hosting:

1. Build the production version:
   ```
   npm run build
   # or
   yarn build
   ```

2. Deploy to Firebase:
   ```
   firebase deploy
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All the volunteers and supporters of Paraclimbing Belgium
- The paraclimbing community for their inspiration
