# Authentication Documentation
## Overview
This document outlines the authentication mechanisms implemented in our application, including user authentication, admin authentication, and travel agent authentication.

## User Authentication
User Model (user.js)
- The User model represents users of our application.
- Each user has a name, email, and password.
- The email field is unique, ensuring that each user has a unique identifier.

User Routes (userRoute.js)
- POST /api/register: Register a new user.
    - Endpoint for user registration.
    - Requires a name, email, and password in the request body.
    - Passwords are securely hashed before storing in the database.
- POST /api/login: Authenticate a user and generate a JWT token.
    - Endpoint for user login.
    - Requires email and password in the request body.
    - Validates the user's credentials and generates a JWT token for authenticated users.
- GET /api/: Get all user details.
    - Endpoint to retrieve details of all users.
    - Accessible only to admins.
    - Requires a valid admin JWT token for authorization.
- GET /api/:id: Get user details.
    - Endpoint to retrieve details of a specific user.
    - Accessible to authenticated users.
    - Requires a valid user JWT token for authorization.
- PATCH /api/:id: Update user details.
    - Endpoint to update user information.
    - Accessible to authenticated users.
    - Requires a valid user JWT token for authorization.
- DELETE /api/:id: Delete a user.
    - Endpoint to delete a user account.
    - Accessible to authenticated users.
    - Requires a valid user JWT token for authorization.

## Admin Authentication
Admin Model (admin.js)
- The Admin model represents administrators of our application.
- Each admin has a name, email, and password.
- The email field is unique, ensuring that each admin has a unique identifier.

Admin Routes (adminRoute.js)
- POST /api/admin/register: Register a new admin.
    - Endpoint for admin registration.
    - Requires a name, email, and password in the request body.
    - Passwords are securely hashed before storing in the database.
- POST /api/admin/login: Authenticate an admin and generate a JWT token.
    - Endpoint for admin login.
    - Requires email and password in the request body.
    - Validates the admin's credentials and generates a JWT token for authenticated admins.
- GET /api/admin/:id: Get admin details.
    - Endpoint to retrieve details of a specific admin.
    - Accessible to authenticated admins.
    - Requires a valid admin JWT token for authorization.
- PATCH /api/admin/:id: Update admin details.
    - Endpoint to update admin information.
    - Accessible to authenticated admins.
    - Requires a valid admin JWT token for authorization.
- DELETE /api/admin/:id: Delete an admin.
    - Endpoint to delete an admin account.
    - Accessible to authenticated admins.
    - Requires a valid admin JWT token for authorization.

## Travel Agent Authentication
Travel Agent Model (travelagent.js)
- The Travel Agent model represents travel agents of our application.
- Each travel agent has a name, email, password, specializations, and managed bookings.

Travel Agent Routes (travelagentRoute.js)
- POST /api/travelAgent/register: Register a new travel agent.
    - Endpoint for travel agent registration.
    - Requires a name, email, password, and specializations in the request body.
    - Passwords are securely hashed before storing in the database.
- POST /api/travelAgent/login: Authenticate a travel agent and generate a JWT token.
    - Endpoint for travel agent login.
    - Requires email and password in the request body.
    - Validates the travel agent's credentials and generates a JWT token for authenticated travel agents.
- GET /api/travelAgent/:id: Get travel agent details.
    - Endpoint to retrieve details of a specific travel agent.
    - Accessible to authenticated travel agents.
    - Requires a valid travel agent JWT token for authorization.
- PATCH /api/travelAgent/:id: Update travel agent details.
    - Endpoint to update travel agent information.
    - Accessible to authenticated travel agents.
    - Requires a valid travel agent JWT token for authorization.
- DELETE /api/travelAgent/:id: Delete a travel agent.
    - Endpoint to delete a travel agent account.
    - Accessible to authenticated travel agents.
    - Requires a valid travel agent JWT token for authorization.