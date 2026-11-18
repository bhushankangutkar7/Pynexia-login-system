# Login System Backend

A REST API for user registration, login, and authenticated profile management. Built with Node.js, Express, MongoDB, and Mongoose.

## Features

- Register users with validated email, name, and password fields
- Hash passwords with bcrypt
- Authenticate login requests and issue JWTs
- Read and update the authenticated user's profile
- Apply security headers and request rate limiting

## Requirements

- Node.js 20 or later
- MongoDB running locally or available through a connection URI

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env` and set the values:

   ```env
   ENV=development
   PORT=8000
   MONGO_URL=mongodb://127.0.0.1:27017/login_system
   SALT_ROUNDS=12
   JWT_SECRET=replace-with-a-long-random-secret
   JWT_EXPIRES_IN=1h
   ```

   Use a strong, private JWT secret and do not commit `.env`.

3. Start the development server:

   ```sh
   npm run dev
   ```

The server listens on the configured port. MongoDB must be available for registration, login, and profile operations.

## API

All request bodies should be JSON. Passwords must be 8–16 characters and include at least one lowercase letter, one uppercase letter, and one character from `@#$%&!`.

### Health check

`GET /health`

### Register

`POST /api/auth/register`

```json
{
  "email": "person@example.com",
  "firstName": "Taylor",
  "lastName": "Morgan",
  "password": "Example@123"
}
```

Returns the created user's ID, email, and name. Registration does not return a token; log in to receive one.

### Log in

`POST /api/auth/login`

```json
{
  "email": "person@example.com",
  "password": "Example@123"
}
```

Returns the user profile and a JWT.

### Get your profile

`GET /api/users/me`

Requires the JWT from login:

```http
Authorization: Bearer <token>
```

Returns the profile belonging to the authenticated user.

### Update your profile

`PATCH /api/users/me`

Requires the same bearer token. Send one or more profile fields to update:

```json
{
  "firstName": "Jordan"
}
```

Supported fields are `email`, `firstName`, `lastName`, and `password`. Password updates are hashed before being stored. The user ID is taken from the verified token, not from the request body.

## Responses and errors

Successful requests return a JSON response with a `success` status and relevant `data`. Validation errors return HTTP 400; invalid credentials or missing/invalid authentication return HTTP 401; duplicate email addresses return HTTP 409.
