# Vila Management App - Frontend Code Documentation

## Welcome

Welcome to the documentation for the **Vila Management App**. This document serves as a guide to understanding the structure, technologies, and functionality of the frontend code.

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Scripts](#scripts)
4. [Application Architecture](#application-architecture)
5. [Folder Structure](#folder-structure)
6. [Important Modules and Components](#important-modules-and-components)
7. [API Communication](#api-communication)
8. [Frequently Asked Questions](#frequently-asked-questions)

---

## 1. Introduction

The **Vila Management App** is designed for managing villa-related activities, such as bookings, finances, and customer management. The frontend is built using React, a powerful JavaScript library for building user interfaces, and is integrated with several key technologies to deliver a smooth user experience.

## 2. Technologies Used

Here is a breakdown of the core technologies and libraries used in this project:

- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: Enables routing within the app.
- **React Hook Form**: Simplifies form handling in React.
- **Styled Components**: A library for writing CSS inside JavaScript.
- **Tanstack React Query**: Data fetching and state management library.
- **Supabase**: A backend as a service (BaaS) that simplifies database integration.
- **Recharts**: A charting library for visualizing data.
- **Date-fns**: A library for working with date objects in JavaScript.
- **React Icons**: A library for integrating icons into React projects.
- **React Error Boundary**: Helps manage errors in React components.
- **React Hot Toast**: Provides notification messages within the app.

## 3. Scripts

The app includes several scripts for development, building, and linting the codebase:

- `dev`: Starts the development server using Vite.
- `build`: Builds the project for production.
- `lint`: Runs ESLint to check the code for errors and ensure coding standards.
- `preview`: Previews the built production version of the app.

## 4. Application Architecture

The app is built using a modular and component-driven architecture. Key concepts include:

1. **Components**: Small, reusable UI elements that make up the building blocks of the application.
2. **Hooks**: Custom hooks for managing state and side effects within the app, especially for data fetching and form handling.
3. **Pages**: Top-level components representing different views (such as Dashboard, Booking Page, etc.).
4. **Styled Components**: The UI is styled using Styled Components, which allows writing CSS directly in JavaScript files.

## 7. Important Modules and Components

### 7.1 Supabase Integration

The app uses Supabase for database and authentication. The `supabaseClient.js` file is responsible for setting up the client connection to Supabase.

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = 'public-anon-key';
export const supabase = createClient(supabaseUrl, supabaseKey);
```

### 7.2 React Query for Data Fetching

The app uses React Query to fetch and manage server state for bookings, customers, and financial data. The `useBookingData` hook is an example of how data is fetched using React Query:

```js
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabaseClient';

export function useBookingData() {
  return useQuery(['bookings'], async () => {
    const { data, error } = await supabase.from('bookings').select('*');
    if (error) throw new Error(error.message);
    return data;
  });
}
```

## 8. API Communication

API communication is handled through Supabase, which acts as both the database and authentication service. The app sends HTTP requests to fetch, create, update, and delete data, which is done through React Query to ensure optimized data fetching and caching.

## 8. Frequently Asked Questions

**Q1: How do I start the development server?**
- Run `npm run dev` in the project directory to start the development server.

**Q2: How do I fetch data from Supabase?**
- Use the Supabase client set up in `supabaseClient.js` and use it in a hook, such as `useBookingData`.

**Q3: How do I add a new component?**
- Create a new component file in the `components` directory and import it into the relevant page or parent component.

---

Once you provide more code or specific modules, I can expand this documentation further based on the details of each module, component, or service integration.
