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

## Routes Documentation (method, path, request body, response example)

### POST /api/auth/sign-up
- Description: Create an admin user. Protected — requires an authenticated admin.
- Headers: `authorization: <token>`
- Body:
```json
{
	"username": "adminuser",
	"email": "admin@example.com",
	"password": "Password@123"
}
```
- Success (201):
```json
{ "message": "signup Successfully" }
```

### POST /api/auth/login
- Description: Authenticate a user and return JWT.
- Body:
```json
{
	"email": "admin@example.com",
	"password": "Password@123"
}
```
- Success (200/201 in code):
```json
{
	"message": "login Successfully",
	"data": { "accessToken": "<token>" }
}
```

Example curl:
```bash
curl -X POST http://localhost:5000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"admin@example.com","password":"Password@123"}'
```

### POST /api/auth/logout
- Description: In-code placeholder — protected route to end session (no implementation details stored).
- Headers: `authorization: <token>`

### POST /api/user
- Description: Admin-only: create a non-admin user.
- Headers: `authorization: <token>`
- Body: same as sign-up example.
- Success (201):
```json
{ "message": "User added successfully" }
```

Example curl (admin token required):
```bash
curl -X POST http://localhost:5000/api/user \
	-H "Content-Type: application/json" \
	-H "authorization: <admin-token>" \
	-d '{"username":"newuser","email":"user@example.com","password":"Password@123"}'
```

### GET /api/ticket
- Description: Admin-only; returns all tickets with `createdBy` and `assignedTo` populated.
- Headers: `authorization: <token>`
- Success (200):
```json
{ "tickets": [ { "title": "...", "status": "open", "createdBy": {"username":"...","email":"..."} } ] }
```

### POST /api/ticket
- Description: Admin-only; create a ticket.
- Headers: `authorization: <token>`
- Body:
```json
{ "title": "Printer is not working", "description": "...", "assignedTo": "507f1f77bcf86cd799439011" }
```
- Success (201): returns created ticket with populated `createdBy`/`assignedTo`.

### PUT /api/ticket/:id
- Description: Admin-only; update ticket fields (title, description, status, assignedTo).
- Headers: `authorization: <token>`
- Body examples: see Update Ticket above.
- Success (200): returns updated ticket.

### PUT /api/ticket/:id/assign
- Description: Admin-only; set or change `assignedTo` on a ticket.
- Headers: `authorization: <token>`
- Body:
```json
{ "assignedTo": "507f1f77bcf86cd799439011" }
```

## File upload details
- Current status: image/file upload is not implemented in the codebase.
- Recommendation if you add uploads:
	- Accepted types: `image/png`, `image/jpeg`, `image/webp`.
	- Max size: 5MB by default (adjustable via middleware like `multer`).
	- Storage: for small projects use local `uploads/` folder (serve statically), for production use S3 or similar.
	- Validation: enforce MIME type and size in upload middleware and reject invalid files with `422`.

## Email flow
- Current status: no email sending code found in the repository.
- Suggested flow when implemented:
	- Trigger: when a new user is created (admin adds a user) or when certain ticket events occur.
	- Contents: welcome email (for user creation) with temporary login instructions OR ticket notifications with ticket id, title, status, and link to the ticket.
	- Implementation: use `nodemailer` for SMTP or a transactional API (SendGrid/Mailgun). Store SMTP credentials in env vars.

## Error handling (common responses)
- `401 Invalid Token`: returned by `authenticate` middleware when no token or invalid token is provided.
- `403 Invalid Rights`: returned when a non-admin accesses admin-only routes.
- `409 User already exists`: returned by `checkUserExists` when email or username already exists.
- `422` Validation error: when required fields are missing or invalid (middleware returns `422` in some checks).
- `404 Ticket not found`: when ticket id is invalid or not present.
- `500 Internal server error`: unexpected server errors; controllers log the error and return `500`.

## Scripts and recommended commands
- `npm run start:dev`: start the server with `node --watch index.js` (development).
- `npm test`: currently placeholder; add test runner (e.g., `jest` or `mocha`) and update this script.
- Recommended additions:
	- `seed` script to populate initial admin and test data.
	- `lint` and `format` scripts for code quality.

## Project structure (short folder map)
- `index.js` — application entry and DB connection.
- `controllers/` — `auth.controller.js`, `ticket.controller.js`, `user.controller.js`.
- `routes/` — route definitions wired to controllers.
- `models/` — `user.model.js`, `ticket.model.js` (Mongoose schemas).
- `validation/` — Joi schemas for request validation.
- `middlewares/` — `authorization.middleware.js`, `validation.middleware.js`.
- `services/` — `auth.service.js` (hashing + JWT helpers).
- `shared/` — constants and regex patterns.

---

If you'd like, I can also:
- add a `.env.example` file,
- add curl examples for every endpoint into the README,
- implement an `/api/ticket/assigned` route for users to fetch their tickets, or
- scaffold file upload handling with `multer` and a basic example endpoint.