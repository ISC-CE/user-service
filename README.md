# User Service API

## Description

User Service is a microservice that is part of an e-commerce project created during the Inspiring Bootcamp. This service is responsible for handling user-related operations such as registration, authentication, and profile management.

## Features

- User Registration
- User Login
- Profile Management
- Token-based Authentication
- Password Encryption

## Technologies Used

- Node.js
- Express.js
- MySQL (via Sequelize ORM)
- JSON Web Tokens (JWT)
- Bcrypt.js
- Docker

## Getting Started

### Prerequisites

- Node.js
- npm
- MySQL Database
- Docker

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-service.git
   ```
   ```bash
   cd user-service
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the project root and add the required environment variables:
   * when you face error with localhost you can try using 127.0.0.1 instead.
   ```bash
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```
5. Run the sql file from the sql folder to create a base database.
6. Start docker to setup the database:
   ```bash
   docker-compose up -d
   ```
7. Run the application in development mode:
   ```bash
   npm run dev
   ```
8. Run the application in production mode:
   ```bash
   npm start
   ```

## Author

Ashwin Raam Sethuram
