# 💰 Personal Finance & Expense Tracker - Backend API

A professional, production-ready RESTful API built with Node.js and Express.js. This system provides a complete solution for personal finance management, including transaction tracking, automated budgeting, and deep financial analytics.

## 🛠️ Tech Stack & Architecture

- **Runtime**: Node.js (Express.js)
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: Clean MVC (Model-View-Controller) Pattern
- **Security**: JWT, bcrypt hashing, Helmet, and Rate Limiting
- **Testing**: Jest and Supertest

## 📂 Project Structure

```plaintext
src/
├── config/          # DB connection & environment setup
├── controllers/     # Request handling logic
├── models/          # Database schemas
├── routes/          # API endpoint definitions
├── middlewares/     # Auth, Security & Error handling
├── services/        # Business logic & DB queries
└── utils/           # Helper functions & App errors
```

## 🚀 Key Features

### 👤 User & Authentication
- **Secure Auth**: Registration and Login with JWT and bcrypt.
- **Profile Management**: View/Update profile, password changes, and avatar uploads.
- **Role-Based Access**: Regular users vs. Admin permissions.

### 💸 Transactions & Budgets
- **Full CRUD**: Manage income and expenses with detailed filtering (date, category, type).
- **Budgeting**: Monthly and category-based budgets with over-spending alerts.
- **Automated Transactions**: Recurring daily, weekly, or monthly entries via cron jobs.

### 📊 Analytics & Reporting
- **Real-time Insights**: Summary of total balance, income, and category spending.
- **Exports**: Generate financial reports in PDF and CSV formats.

### 👮 Admin Dashboard
- **User Oversight**: Monitor, block/unblock, or delete user accounts.
- **System Health**: View logs and system-wide activity metrics.

## ⚙️ Setup & Installation

### Clone the Repository
```bash
git clone https://github.com/MarwaAshraf1812/finance-tracker-app.git
cd finance-tracker-app
```

### Install Dependencies
```bash
npm install
```

### Configure `.env`
Create a `.env` file in the root directory:
```plaintext
PORT=5000
NODE_ENV=development
DB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### Run the Server
```bash
# Development
npm run dev

# Production
npm start
```

## 🔐 API Security Measures
- **Helmet**: Secure HTTP headers.
- **Rate Limiting**: Prevents brute-force attacks.
- **Data Validation**: Integrated Joi/express-validator.
- **XSS & Injection Protection**: Sanitizing all incoming data.