# MERN Mail Marketing Application

## 🚧 Under Development

This project is currently under active development. Features and functionalities may change as improvements are made.

## 📌 Overview

The MERN Mail Marketing App is a full-stack application that allows users to create and schedule email campaigns using their preferred templates. Users can visually design email sequences with React Flow, ensuring an intuitive workflow experience. The backend manages email scheduling and sending using Nodemailer and Agenda, while Zustand is used for efficient state management on the frontend.

## 🚀 Features

Visual Flow-Based Email Scheduling with React Flow.

Template Selection for users to choose their liked email designs.

State Management using Zustand.

Type Safety with TypeScript.

Scheduled Email Sending using Nodemailer and Agenda.

Authentication & Authorization for secure user access.

Full MERN Stack Implementation with MongoDB, Express, React, and Node.js.

Scalable and Efficient architecture for handling multiple email campaigns.

## 🛠️ Tech Stack

Frontend:

React.js with TypeScript

React Flow (for email sequence visualization)

Zustand (state management)

Tailwind CSS / ShadCn (for UI components)

Axios (for API requests)

Backend:

Node.js & Express.js (server)

MongoDB (database)

Agenda.js (job scheduling for email sending)

Nodemailer (email sending service)

JWT Authentication

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/jithu5/email-marketting.git
cd email-marketting

### 2️⃣ Install Dependencies

server

cd server
npm install

Frontend

cd frontend
npm install

### 3️⃣ Environment Variables

Create a .env file in the backend directory and configure:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

### 4️⃣ Run the Application

Start server

cd server
npm start

Start Frontend

cd frontend
npm run dev

## 🖼️ How It Works

Users create an email sequence using a drag-and-drop UI powered by React Flow.

They choose email templates from the available options.

Emails are scheduled using Agenda.js, which stores jobs in MongoDB.

Nodemailer sends emails based on the schedule.

Users can monitor and edit scheduled emails in the dashboard.

## 📂 Project Structure

``` bash
mern-mail-marketing/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── jobs/    # Agenda Jobs for scheduling
│   ├── index.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── store/  # Zustand State Management
│   │   ├── App.tsx
│   ├── public/
│   ├── tsconfig.json
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🔥 Future Enhancements

User analytics to track email performance.

Webhook integration for real-time updates.

Multi-Tenant Support for managing multiple businesses.

## 🤝 Contributing

Contributions are welcome! Feel free to submit a PR or open an issue.

🚀 Start automating your email marketing today!
