# FitPath - Fitness Tracker Platform

## Project Overview
FitPath is a cutting-edge fitness tracker platform that empowers individuals to lead healthier, more active lifestyles. This platform combines modern technology with fitness solutions, allowing users to track their progress, set goals, and engage with a vibrant community of like-minded individuals. Whether you're a beginner or an advanced fitness enthusiast, FitPath provides an immersive experience to help you achieve your wellness journey.

## Live Website
You can explore the live version of the FitPath platform here: [FitPath - Fitness Tracker](https://fit-path-client.netlify.app/)

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Vite, React Router, React Hook Form, React Toastify, SweetAlert2, Recharts, Lottie React, Motion
- **Backend**: Node.js, Express.js, MongoDB, Firebase, JWT Authentication
- **Payment**: Stripe

## Key Features
- **Authentication System**: Firebase authentication with email/password and social login.
- **Stripe Payment Integration**: Secure payments for trainer bookings and membership plans.
- **Admin Dashboard**: Manage newsletter subscribers, trainers, and booking data.
- **Trainer Profiles & Slot Management**: Trainers can add slots, manage availability, and showcase their profiles.
- **Community Forum**: Users can participate in community forums, with a voting system for posts.
- **Featured Classes**: Showcase the most popular classes based on bookings.
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices.
- **User Reviews & Testimonials**: Users can submit reviews for trainers and see feedback from others.

## Features & Functionality

### 1. **Homepage**
- **Banner Section**: A slider/banner with title, description, and CTA to navigate to the classes page.
- **Featured Section**: Cards showcasing the platform's key features (e.g., Trainer profiles, Booking system, etc.).
- **About Section**: Information about the platform and its mission.
- **Featured Classes**: Displays the top 6 most booked classes, sorted by total booking count.
- **Testimonials**: A carousel displaying reviews from platform users.
- **Community Posts**: Displays the latest forum posts with links to read more.

### 2. **Authentication**
- **Registration Page**: Users can register with name, email, password, and profile picture.
- **Login Page**: Secure login system with social login options.
- **Conditional Navbar**: Displays profile and dashboard options if logged in; login/register if not.

### 3. **Trainer & Member Pages**
- **Trainer Profiles**: Detailed information about trainers, their specialties, and available time slots.
- **Trainer Booking**: Users can book a trainer for available slots.
- **Trainer Dashboard**: Trainers can manage slots, view bookings, and add new posts to the community forum.
- **Member Dashboard**: Members can view their activity log, booked trainers, and submit reviews.

### 4. **Admin Pages**
- **All Trainers**: Admin can view and manage trainer profiles, including deleting trainers or confirming/rejecting trainer applications.
- **Financial Overview**: Admin can view total balance, the latest booking transactions, and a chart comparing newsletter subscribers and paid members.
- **Add New Class**: Admin can add new classes to the platform, making them available for users.

### 5. **Forum & Community**
- **Forum Page**: A community section where users can post and vote on forum posts.
- **Upvote/Downvote System**: Users can interact with posts by voting.
- **Trainer Badges**: Admin and trainer badges are displayed next to their posts.

### 6. **Search Functionality**
- **All Classes Search**: A search bar to filter classes by name, implemented using backend queries.

