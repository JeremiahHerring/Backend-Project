# Travel Booking System

This repository contains the backend implementation of a travel booking system, featuring a RESTful API with CRUD operations for different user roles. The backend is built using Node.js and utilizes MongoDB as the database. 

## Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account (for creating a free cluster)
- Postman or similar API testing tool

## Setup Instructions
1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd travel-booking-system-backend
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
- **POST /users/register**: Register a new user.
- **POST /users/login**: Authenticate a user and generate a JWT token.
- **GET /users/:id**: Get user details.
- **PUT /users/:id**: Update user details.
- **DELETE /users/:id**: Delete a user.
- **GET /bookings**: Get all bookings.
- **GET /bookings/:id**: Get booking details.
- **POST /bookings**: Create a new booking.
- **PUT /bookings/:id**: Update booking details.
- **DELETE /bookings/:id**: Delete a booking.

## Authentication
Different endpoints may require different levels of authentication. Ensure you're providing the required authentication tokens in the request headers.

## Testing
You can use Postman or any other API testing tool to test the API endpoints. Ensure you provide the necessary request parameters and authentication tokens.

## Disclaimer
This application is for demonstration purposes only. Always ensure proper security measures are implemented before deploying any application to a production environment.

## Contributors
- [Your Name](https://github.com/yourusername)

## License
This project is licensed under the [MIT License](LICENSE).
