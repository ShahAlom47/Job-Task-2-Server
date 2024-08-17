# Z-Zone Backend

The **Z-Zone** backend is part of an e-commerce website that handles API requests, user authentication, product management, and other backend operations. It is built using Node.js, Express.js, and MongoDB.

## Features

- RESTful API to manage products, users, and authentication.
- JWT-based authentication for secure login and admin verification.
- Separate controllers and routes for products and users.
- Organized and secure structure using `.env` for environment variables.
- Protected routes for admin-specific functionalities.

## Prerequisites

Before starting, make sure you have the following tools installed:

- **Node.js**: [Download Here](https://nodejs.org/)
- **npm**: Installed automatically with Node.js.
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community)
- **Git**: [Download Here](https://git-scm.com/)

## Environment Variables

To run the project successfully, you'll need to set up a `.env` file with the following values. These environment variables are critical for connecting to your database and securing your API requests.

### Create a `.env` file in the root directory of your project and add the following:

```plaintext
JWT_SECRET=your_jwt_secret_key_here
DB_USER=your_database_user_here
DB_PASS=your_database_password_here
```

## Client Side Code
[Z-Zone](https://github.com/ShahAlom47/Job-Task-2-Client)
