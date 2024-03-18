# Travel Booking System

This repository contains the backend implementation of a travel booking system, featuring a RESTful API with CRUD operations for different user roles. The backend is built using Node.js and utilizes MongoDB as the database. 

## Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account (for creating a free cluster)
- Postman or similar API testing tool

## Setup Instructions
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/JeremiahHerring/Travel-Booking-System.git
   ```
2. Navigate into the project directory:
   ```bash
   cd travel-booking-system
   ```
3. Create a `.env` file in the root directory and add your MongoDB connection URL:
   ```plaintext
   DB_URL=your_mongodb_connection_url_here
   ```
   You can obtain your MongoDB connection URL from MongoDB Atlas after setting up a free cluster.
   
4. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application
1. Start the server:
   ```bash
   npm start
   ```
   Upon successful connection to the database, you should see a message indicating "connected to DB listening on port 3000".

2. You can now test the API endpoints using Postman or any other API testing tool.

## API Endpoints
- **POST /api/register**: Register a new user.
- **POST /api/login**: Authenticate a user and generate a JWT token.
- **GET /api/**: Get all user details.
- **GET /api/:id**: Get user details.
- **PATCH /api/:id**: Update user details.
- **DELETE /api/:id**: Delete a user.
- **POST /bookings**: Create a new booking.
- **GET /bookings**: Get all bookings.
- **GET /bookings/:id**: Get booking details.
- **PUT /bookings/:id**: Update booking details.
- **DELETE /bookings/:id**: Delete a booking.
- **POST /api/admin/register**: Register a new admin.
- **POST /api/admin/login**: Authenticate an admin and generate a JWT token.
- **GET /api/admin/:id**: Get admin details.
- **PATCH api/admin/:id**: Update admin details.
- **DELETE /api/admin/:id**: Delete an admin.
- **POST /api/travelAgent/register**: Register a new travel agent.
- **POST /api/travelAgent/login**: Authenticate an travel agent and generate a JWT token.
- **GET /api/travelAgent/:id**: Get travel agent details.
- **PATCH api/travelAgent/:id**: Update travel agent details.
- **DELETE /api/travelAgent/:id**: Delete an travel agent.


## Authentication
Different endpoints may require different levels of authentication. Ensure you're providing the required authentication tokens in the request headers.

## Testing
You can use Postman or any other API testing tool to test the API endpoints. Ensure you provide the necessary request parameters and authentication tokens.

## License
This project is licensed under the [MIT License](LICENSE).
