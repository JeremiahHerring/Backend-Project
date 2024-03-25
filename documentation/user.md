# All User Endpoints

## Register New User
- URL: `/api/register`
- Method: `POST`
- Description: Register a new user.
- Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@email.com",
    "password": "password123"
  }

Response:
- Success: 200 OK with success message
- Error: 
    - 400 Bad Request if invalid request body or duplicate email
    - 500 Internal Server Error

## Login
- URL: `/api/login`
- Method: `POST`
- Description: Authenticate a user and generate a JWT token.
- Request Body:
  ```json
  {
  "email": "john@email.com",
  "password": "password123"
  }

Response:
- Success: 200 OK with JWT token
- Error: 
    - 401 Unauthorized if login credentials are invalid
    - 500 Internal Server Error

## Get All User Details
- URL: `/api`
- Method: `GET`
- Description: Get all user's details.
- Authentication: Admin access token required.

Response:
- Success: 200 OK with array of user's details.
- Error:
    - 403 Forbidden if unauthorized
    - 500 Internal Server Error

## Get User Details
- URL: `/api/:id`
- Method: `GET`
- Description: Get user's details.
- Authentication: User access token required.

Response:
- Success: 200 OK with user object
- Error:
    - 404 Not Found if user id is not found
    - 500 Internal Server Error

## Update User Details
- URL: `/api/:id`
- Method" `PATCH`
- Description: Update user details.
- Authentication: User access token requireed.
- Request Body:
  ```json
  {
  "name": "Updated Name",
  "email": "updated@email.com",
  "password": "updatedPassword123"
  }

Response: 
- Success: 200 OK with updated user detail.
- Error:
    - 403 Forbidden if unauthorized
    - 404 Not Found if user id not found
    - 500 Internal Server Error

## Delete a User
- URL: `/api/:id`
- Method: `DELETE`
- Description: Delete a user.
- Authentication: User access token required.

Response
- Success: 200 OK with success message
- Error: 
    - 403 Forbidden if unauthorized
    - 404 Not Found if user id not found