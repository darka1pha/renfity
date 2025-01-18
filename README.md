# Rentify

This repository contains the source code for **Rentify**, a **House Rent Website** built using **NestJS**, **PostgreSQL**, and **TypeORM**. The application provides a platform for property owners to list their properties for rent and for users to search and book available houses.

## Features

- **Authentication**: User registration and login with secure JWT-based authentication.
- **Advertisement Management**:
  - List advertisements for rent.
  - Update or delete advertisement listings.
- **Search and Filter**: Search advertisement by location, price range, and other filters.
- **Booking System**: Renters can book advertisement directly through the platform.
- **Admin Panel**: Manage users and advertisement listings.

## Technologies Used

- **Backend Framework**: [NestJS](https://nestjs.com/) - A progressive Node.js framework.
- **Database**: [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source relational database.
- **ORM**: [TypeORM](https://typeorm.io/) - An ORM for TypeScript and JavaScript.

## Prerequisites

- Node.js (v16 or later)
- PostgreSQL (v12 or later)
- npm or yarn package manager

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/darka1pha/rentify.git
   cd rentify
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    JWT_SECRET=your_jwt_secret
   ```

4. Run database sync:

   ```bash
   npm run data:sync
   ```

5. Start the application:

   ```bash
   npm run start:dev
   ```

## API Endpoints

### Authentication

- `POST /auth/signup`: Sign Up a new user.
- `POST /auth/signin`: Sign In and get a JWT token.

### Advertisements

- `GET /advertisements`: Get a list of available advertisements.
- `POST /advertisements`: Add a new advertisement (requires authentication).
- `PUT /advertisements/:id`: Update an advertisement (requires authentication).
- `DELETE /advertisements/:id`: Delete a property (requires authentication).

### Facilities

- `GET /facilities`: Get a list of available facilities.
- `POST /facilities`: Add a new facilities (requires authentication).
- `GET /advertisements/:id/facilities`: Retrieve advertisement facilities (requires authentication).

### States

- `GET /states`: Get a list of states.

### Cities

- `GET /cities`: Get a list of cities (pass the state parameter to filter by state).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Commit your changes.
4. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
