# Ticket Management System

A simple ticket management API built with Express and MongoDB. The current codebase supports admin authentication, user creation, and ticket management workflows.

## Scope Of Work
- Admin signup
- Admin login
- User add
- User email receiving
- User login
- Ticket list for admin
- Ticket creation for admin
- Ticket update for admin
- Ticket assign for admin
- Ticket status for user
- Ticket list assigned to user

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi

## Setup
1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URL=mongodb://127.0.0.1:27017/ticket-management
JWT_SECRET=secret
```

3. Start the app:

```bash
npm run start:dev
```

## Environment Variables
- `PORT`: Server port. Defaults to `5000` if not provided.
- `MONGODB_URL`: MongoDB connection string.
- `JWT_SECRET`: JWT signing secret. The current code uses a hardcoded value, so this should be treated as a planned improvement.

## Base URL
- `http://localhost:5000/api`

## Authentication
- Protected routes expect the token in the `authorization` request header.
- The current middleware reads the token directly from `req.headers.authorization`, so send the raw token value.

Example:

```http
authorization: your-jwt-token
```

## Roles and Permissions

### Admin
- Create users
- Create tickets
- Update tickets
- Assign tickets
- List all tickets

### User
- Log in
- View assigned tickets in a future endpoint if added later

### Notes
- Admin-only routes are protected with authentication and role checks.
- The current API exposes ticket management routes only for admins.
- If you add a user-facing assigned-ticket route later, document it here with the method, path, and response shape.

## API Routes

### Auth
- `POST /api/auth/sign-up`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Users
- `POST /api/user`

### Tickets
- `GET /api/ticket`
- `POST /api/ticket`
- `PUT /api/ticket/:id`
- `PUT /api/ticket/:id/assign`

## Request Bodies

### Sign Up
```json
{
	"username": "adminuser",
	"email": "admin@example.com",
	"password": "Password@123"
}
```

### Login
```json
{
	"email": "admin@example.com",
	"password": "Password@123"
}
```

### Add User
```json
{
	"username": "newuser",
	"email": "user@example.com",
	"password": "Password@123"
}
```

### Create Ticket
```json
{
	"title": "Printer is not working",
	"description": "The office printer shows a paper jam error.",
	"assignedTo": "507f1f77bcf86cd799439011"
}
```

### Update Ticket
```json
{
	"title": "Updated title",
	"description": "Updated description",
	"status": "in_progress",
	"assignedTo": "507f1f77bcf86cd799439011"
}
```

### Assign Ticket
```json
{
	"assignedTo": "507f1f77bcf86cd799439011"
}
```

## Validation Rules
- `username`: required, alphanumeric, 3 to 50 characters.
- `email`: required, valid email format.
- `password`: required, minimum 8 characters, must include at least one uppercase letter, one lowercase letter, one digit, and one special character.
- `title`: required for ticket creation, 3 to 200 characters.
- `description`: optional, up to 2000 characters.
- `status`: must be one of `open`, `in_progress`, or `closed`.
- `assignedTo`: must be a valid MongoDB ObjectId when provided.

## Data Models

### User
- `username`
- `email`
- `password`
- `role`

### Ticket
- `title`
- `description`
- `status`
- `createdBy`
- `assignedTo`
- `createdAt`

## Response Examples

### Login Success
```json
{
	"message": "login Successfully",
	"data": {
		"accessToken": "eyJhbGciOiJIUzI1NiIs..."
	}
}
```

### Ticket Created
```json
{
	"message": "Ticket created successfully",
	"ticket": {
		"title": "Printer is not working",
		"description": "The office printer shows a paper jam error.",
		"status": "open"
	}
}
```

### Common Error Responses
```json
{
	"message": "Invalid Token"
}
```

```json
{
	"message": "Invalid Credentials"
}
```

```json
{
	"message": "Ticket not found"
}
```

## Status Codes
- `200`: Successful read or update response.
- `201`: Resource created successfully.
- `401`: Missing or invalid token, or invalid credentials.
- `403`: Forbidden for non-admin users on admin-only routes.
- `404`: Ticket not found.
- `409`: User already exists.
- `422`: Validation error.
- `500`: Internal server error.

## Project Structure
- `controllers/`: Request handlers.
- `middlewares/`: Authentication, authorization, and validation middleware.
- `models/`: Mongoose models.
- `routes/`: API route definitions.
- `services/`: Auth helpers such as hashing and token generation.
- `shared/`: Shared constants and regex patterns.
- `validation/`: Joi schemas.

## Known Limitations
- JWT signing and verification currently use a hardcoded secret in the code.
- The current API does not yet expose a route for users to list their assigned tickets.
- The login response currently returns a created-style status in the controller implementation, so the README documents the payload rather than enforcing a specific client assumption.