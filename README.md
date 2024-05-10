


<!-- ABOUT THE PROJECT -->
<div align="center">
  <a href="https://playmaker-vintage.vercel.app">
    <img src="https://github.com/mjbramich/playmaker-vintage/blob/main/public/playmaker-name-small.png" alt='Playmaker Vintage logo' />
  </a>
</div>

<img src="https://github.com/mjbramich/playmaker-vintage/blob/main/public/home-screenshot.png" alt='Landing page screenshot' />


## Overview 📄
Playmaker Vintage is an e-commerce platform that specialises in selling vintage sports clothing. This also includes an admin section(CMS) where shop owners can manage their products directly. Playmaker Vintage aims to provide a seamless shopping experience for users interested in purchasing unique items from various sports eras.

#### Live: [Playmaker Vintage](https://playmaker-vintage.vercel.app/)

## Built with 🛠️

The project is built using Next.js as a full-stack framework, leveraging its capabilities for both frontend and backend development. Utilising Next.js's built-in App router allows for easy project directory structure.  

- [TypeScript](https://www.typescript.com) - Statically typed superset of JavaScript
- [React](https://react.dev) - JavaScript library for building user interfaces.
- [NextJs](https://nextjs.org/) - React framework for building full-stack web applications
- [TailwindCSS](https://tailwindcss.com) - A utility-first CSS framework.
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) - A state management library
- [PostgresSQL](https://www.postgresql.org/) - A relational DBMS
- [Prisma](https://prisma.io) - Open-source ORM simplifying database interactions
- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [React Testing Library](https://testing-library.com/) - Platform for testing React components 
- [Vercel](https://vercel.com/) - Hosting Platform

### APIs
- [Stripe](https://stripe.com/) - Payment processing platform
- [Clerk](https://clerk.com/) - Authentication Provider
- [Cloudinary](https://cloudinary.com/is) - Asset management platform

## Getting Started 🚀 

### Local Development
```
git clone https://github.com/mjbramich/playmaker-vintage.git
cd playmaker-vintage
npm install
Complete and store .env file in the root folder
npm run dev
```

### Build

```
git clone https://github.com/mjbramich/playmaker-vintage.git
cd playmaker-vintage
npm install
Complete and store .env file in the root folder
npm run build
```


## Optimisations ⚙️

- While Clerk authentication offers simplicity and ease of setup compared to past authentication methods i've implemented previously, its restrictive scaling plans may pose limitations as the project grows. Already limiting the number of admins a store can have without switching to the paid plan.

- Separate the CMS(Admin) functionality into a standalone microservice to enhance the  platform's flexibility and scalability. This architectural optimisation would enable the reuse of the CMS across multiple stores or frontends, promoting consistency and efficiency in content management and user administration. 

- Write more tests to better achieve test coverage across the application, and add E2E tests to tests the application as a whole.

- Further enhance user experience by continuing to implement suspense and loading states where necessary, ensuring smoother transitions and reduced waiting times.

- Explore opportunities to refactor certain server components into client components, optimising the application's responsiveness and fluidity for an improved user experience.

- ~~Migrate MySQL DB (Planetscale) to postgreSQL~~

## Lessons Learned 🧠

Throughout this project i've continued to develop and expand my skill set. Here are some of the main skills i've developed. 

- Delving into server components marked a new and enjoyable experience, granting me direct access to database interactions and other server side functionalities, despite encountering initial hydration errors that have since been overcome. 
 
- Leveraging query parameters for URL manipulation streamlined data management, facilitating efficient pagination, sorting, and filtering of lists. 

- Engaging with SQL databases, through Prisma, deepened my understanding of database operations and equivalent methods to raw SQL queries. 

- Implementing loading states and suspense mechanisms in components significantly improved user experience, particularly for components with prolonged loading times.

- Continuing to build out REST APIs has bolstered confidence in this area, enabling seamless integration with the frontend. Additionally, utlising webhooks to listen to Stripe events has expanded functionality and provided valuable experience in real-time event handling.

- Testing knowledge has seen significant growth, particularly in the area of mocking. The use of mocks, especially with Next.js navigation context, has sharpened testing skills, ensuring robust and more reliable components.

## Roadmap 🗺️
- ~~Add product descriptions to each product~~
- Implement the admin dashboard, displaying analytics about store performance
- Add breadcrumb component to enable forward/back between products
- Enhance user experience by adding suspense to avatar loading in the navbar
- Implement a search filter to enable users to quickly find products based on specific criteria.
- Enhance error handling by implementing better mechanisms for capturing and handling Prisma errors, HTTP errors, and form validation errors.
- Implement a "sold out" property in the product schema to inform users when items are no longer available.
- Optimise performance by implementing caching strategies for static assets, API responses, and database queries.
- Improve transitions between pages

