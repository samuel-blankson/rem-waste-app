# Skip Booking App

## Overview

This is a React-based skip booking application that allows users to select skip sizes, filter options, and proceed through multiple booking stages such as postcode entry, waste type selection, permit checks, date selection, and payment.

The app uses React Context API for state management of the current booking stage, and Framer Motion for smooth animations in the skip details drawer.

## Features

- Multi-stage booking flow with stages:
  - Postcode input
  - Waste type selection
  - Skip size selection with filtering options
  - Permit check
  - Date selection
  - Payment
- Skip size selection with detailed drawer displaying pricing and options
- Filters for skip size, price range, road allowance, and heavy waste acceptance
- Local caching of skip data to minimize API calls and improve performance
- Responsive UI with Tailwind CSS styling
- Animated drawer using Framer Motion
- Icon usage via React Icons for intuitive UI elements

## Technologies Used

- React (functional components & hooks)
- React Context API for stage management
- Framer Motion for animation
- Tailwind CSS for styling
- React Icons for UI icons
- Fetch API for data retrieval
- LocalStorage for data caching

## Project Structure

src/
├── components/
│ ├── Navbar.jsx
│ ├── SkipCard.jsx
│ ├── SkipDrawer.jsx
├── context/
│ └── SkipContext.jsx
├── constants/
│ └── stageKeys.js
├── hooks/
│ └── useStageNavigation.jsx
├── pages/
│ ├── Skips.jsx
│ ├── Postcode.jsx
│ ├── WasteType.jsx
│ ├── PermitCheck.jsx
│ ├── ChooseDate.jsx
│ ├── Payment.jsx
├── App.jsx
├── index.jsx
└── index.css

bash
Copy
Edit

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/skip-booking-app.git
cd skip-booking-app
Install dependencies:

bash
Copy
Edit
npm install
# or
yarn install
Run the app locally:

bash
Copy
Edit
npm start
# or
yarn start
Open your browser and navigate to http://localhost:3000

Usage
Navigate through the stages by selecting options and clicking "Continue" or "Back."

On the "Select Skip" stage, filter skips by size, price, road allowance, or heavy waste.

Click on a skip card to view more details in the drawer.

Proceed through to payment once all required stages are completed.

Notes
The skip data is fetched from https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft and cached for 10 minutes in localStorage.

Some UI components use icons from React Icons for enhanced UX.

The app’s multi-stage navigation uses React Context for global state management.

License


Developed by Samuel Blankson
```
