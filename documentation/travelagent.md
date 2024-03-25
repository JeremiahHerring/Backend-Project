# All Travel Agent Endpoints

## Register New Travel Agent
- URL: `/api/travelAgent/register`
- Method: `POST`
- Description: Register a new travel agent and assign them to a booking.
- Authentication: None.
- Request Body:
  ```json
  {
    "name": "Travel Agent Name",
    "email": "travelagent@example.com",
    "password": "password",
    "specializations": ["Specialization 1", "Specialization 2"],
    "managed_bookings": "Booking ID"
  }

Response:
- Success: 200 OK with success message
- Error: 500 Internal Server Error

## Authenticate a Travel Agent
- URL: `/api/travelAgent/login`
- Method: `POST`
- Description: Authenticate a travel agent and generate a JWT token. 
- Authentication: None. 
- Request Body:
  ```json
  {
  "email": "travelagent@example.com",
  "password": "password"
  }

Response: 
- Success: 200 OK with travel agent JWT token.
- Error: 
    - 401 Unauthorized if invalid credentials
    - 500 Internal Server Error

## Get Travel Agent Details
- URL: `/api/travelAgent/:id`
- Method: `GET`
- Description: Get details of a specific travel agent.
- Authentication: Travel agent access token required.

Response: 
- Success: 200 OK with travel agent details.
- Error: 
    - 401 Unauthorized if invalid token
    - 403 Forbidden if invalid token
    - 404 Not Found if travel agent id not found
    - 500 Internal Server Error

## Update Travel Agent Details 
- URL: `/api/travelAgent/:id`
- Method: `PATCH`
- Description: Update details of a specific travel agent.
- Authentication: Travel agent access token required.
- Request Body:
  ```json
  {
  "email": "updatedemail@example.com",
  "password": "newpassword"
  }

Response:
- Success: 200 OK with updated travel agent details.
- Error: 
    - 401 Unauthorized if invalid token
    - 403 Forbidden if invalid token
    - 404 Not Found if travel agent id not found
    - 500 Internal Server Error

## Delete a Travel Agent
- URL: `/api/travelAgent/:id`
- Method: `DELETE`
- Description: Delete a specific travel agent. 
- Authentication: Travel agent access token required.

Response:
- Success: 200 OK with deleted travel agent details/
- Error: 
    - 401 Unauthorized if invalid token
    - 403 Forbidden if invalid token
    - 404 Not Found if travel agent id not found
    - 500 Internal Server Error
