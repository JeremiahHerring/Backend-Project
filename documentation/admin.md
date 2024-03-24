##All Admin Endpoints

## Register a New Admin
- URL: `/api/admin/register`
- Method: `POST`
- Description: Register a new admin.
- Request Body:
  ```json
  {
    "name": "Admin Name",
    "email": "admin@email.com",
    "password": "adminPassword123"
  }

Response:
- Success: 200 OK with success message
- Error:
    - 400 Bad Request if invalid request body or duplicate email
    - 500 Internal Server Error

## Login
- URL: `/api/admin/login`
- Method: `POST`
- Description: Authenticate an admin and generate a JWT token.
- Request Body:
  ```json
  {
  "email": "admin@email.com",
  "password": "adminPassword123"
  }

Response: 
- Success: 200 OK with JWT token
- Error:
    - 401 Unauthorized if invalid login credentials
    - 500 Internal Server Error

## Get Admin Details
- URL: `api/admin/:id`
- Method: `GET`
- Description: Get admin details.
- Authentication: Admin access token required.

Response:
- Success: 200 OK with admin details.
- Error: 
    - 404 Not Found if admin id not found
    - 500 Internal Server Error

## Update Admin Details
- URL: `/api/admin/:id`
- Method: `PATCH`
- Description: Update admin details.
- Authentication: Admin access token required.
- Request Body:
  ```json
  {
  "name": "Updated Admin Name",
  "email": "updatedadmin@email.com",
  "password": "updatedAdminPassword123"
  }

Response:
- Success: 200 OK with updated admin object
- Error: 
    - 403 Forbidden if unauthorized
    - 404 Not Found if admin id not found
    - 500 Internal Server Error

## Delete an Admin
- URL: `/api/admin/:id`
- Method: `DELETE`
- Description: Delete an admin.
- Authentication: Admin access token required.

Response:
- Success: 200 OK with success message
- Error: 
    - 403 Forbidden if unauthorized
    - 404 Not Found if admin id not found
    - 500 Internal Server Error
