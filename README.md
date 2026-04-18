# 💰 Personal Finance & Expense Tracker - Backend API

A professional, production-ready RESTful API built with Node.js and Express.js. This system provides a complete solution for personal finance management, including transaction tracking, automated budgeting, and deep financial analytics.

---

| 🎬 Demo                                                                                   |
| ----------------------------------------------------------------------------------------- |
| 👉 [https://drive.google.com/drive/folders/1J9qHLmwUh8Mf3Obb74nT6m1GPHjDacob?usp=sharing] |

---

| 👤 Member             | 🎯 Responsibility                        | 📌 Details                                                                                                                                                                                                                      |
| --------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Abdulrahman Nagah** | Categories & API Documentation           | - Developed categories module (CRUD operations)<br>- Linked categories with transactions<br>- Created Swagger/OpenAPI documentation<br>- Documented endpoints, requests, and responses<br>- Ensured documentation consistency   |
| **Mahmoud Mostafa**   | Transactions, Budgets & API Features     | - Implemented transactions module (CRUD)<br>- Developed budget management system<br>- Implemented API features _(Pagination, Filtering, Search, Sorting, Rate Limiting)_<br>- Optimized query performance                       |
| **Marwa Ashraf**      | Backend Infrastructure & Admin Analytics | - Set up project structure and environment<br>- Configured server, middleware, and logging<br>- Implemented admin analytics (dashboard & stats)<br>- Developed reporting endpoints<br>- Handled error logging                   |
| **Mohamed Wael**      | Recurring Transactions & Notifications   | - Implemented recurring transactions system<br>- Built scheduling logic for repeated entries<br>- Developed notifications system (CRUD)<br>- Added read/unread functionality<br>- Integrated notifications with recurring logic |
| **Mohanad Tarek**     | User Management, Auth & Admin Control    | - Implemented user CRUD operations<br>- Built authentication system (JWT)<br>- Developed password reset/update features<br>- Handled role-based authorization<br>- Contributed to admin user management                         |

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
