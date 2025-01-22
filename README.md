# Rentify

This repository contains the source code for **Rentify**, a **House Rent Website** built using **NestJS**, **PostgreSQL**, and **TypeORM**. The application provides a platform for property owners to list their properties for rent and for users to search and book available houses.

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

### Properties

- `GET /properties`: Get a list of available properties.
- `GET /properties/:id`: Get property details.
- `POST /properties`: Add a new property (requires authentication).
- `PUT /properties/:id`: Update an property (requires authentication).
- `DELETE /properties/:id`: Delete a property (requires authentication).
- `POST /properties/:id/favorites`: Add property to favorite list of logged in user.
- `PATCH /properties/:id/status`: Update property status (requires authentication).

### User ( requires authentication)

- `GET /user/properties`: Get a list of user ACTIVE properties.
- `POST /user/appointments`: Get a list of user appointments.
- `PUT /user/favorite-properties`: Get a list of user favorite properties.
- `DELETE /properties/:id`: Delete a property (requires authentication).

### Appointments

- `POST /appointments`: Create new appointment.
- `GET /appointments`: Get User appointments (requires authentication).

### Facilities

- `GET /facilities`: Get a list of available facilities.
- `POST /facilities`: Add a new facilities (requires authentication).
- `GET /facilities/:propertyId`: Retrieve property facilities (requires authentication).

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
