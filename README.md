# Shopping Cart

This is a complete online shopping website project with full frontend and backend functionality. The site includes features like user registration, login, product listing, cart, order placement, and email notification.

## 1. Project Overview

Built using React for frontend and Node.js + Express + MongoDB for backend.
Features an Amazon-style profile, cart, and checkout experience.
Sends email notifications to both customer and admin after a successful order.

## 2. Folder Structure
ecommerce/
  backend/ → Node.js API with MongoDB
  frontend/ → React frontend app
 Each part is independently runnable.

## 3. Technologies Used

Frontend: React.js, React Router, Context API, CSS, Bootstrap
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Email: Nodemailer using Gmail SMTP
## 4. Features

1. User Registration and Login with MongoDB database.
2. User Profile page that shows name, username, email, mobile, age.
3. Editable Profile with logout option.
4. Product listings (50+ items across multiple categories).
5. Product details page with RAM, storage, and feature details.
6. Add to Cart and Buy Now buttons.
7. Quantity increase/decrease in Cart.
8. Search bar with clickable icon.
9. Order sends confirmation email to both user and admin.
10. Responsive design for all devices.

## 5. How to Run the Project Locally

### Backend Setup

1. Go to the `backend` folder in terminal.
2. Install dependencies:
npm install
Create a `.env` file with the following content:
PORT=5000
MONGO_URI=your_mongodb_connection_string
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
4. Start the backend server:
npm run dev

### Frontend Setup

1. Go to the `frontend` folder.
2. Install frontend dependencies:
npm install
3. Start the frontend development server:
npm run dev
