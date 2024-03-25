# All Booking Endpoints

## Create a New Booking
- URL: `/bookings`
- Method: `POST`
- Description: Create a new booking.
- Authentication: User access token required.
- Request Body: 
  ```json
  {
    "destination": "Destination Name",
    "arrival_date": "YYYY-MM-DD",
    "departure_date": "YYYY-MM-DD"
  }

Response:
- Success: 201 Created with booking details
- Error: 
    - 401 Unauthorized if invalid or missing token
    - 500 Internal Server Error

## Get All Bookings
- URL: `/bookings`
- Method: `GET`
- Description: Get all bookings.
- Authentication: Admin access token required.

Response: 
- Success: 200 OK with array of all booking details
- Error: 
    - 401 Unauthorized if invalud or missing token
    - 500 Internal Server Error

## Get Booking Details
- URL: `/bookings/:id`
- Method: `GET`
- Description: Get details of a specific booking
- Authentication: User access token required.

Response:
- Success: 200 OK with booking details.
- Error:
    - 401 Unauthorized if invalid or missing token
    - 404 Not Found if booking id not found.
    - 500 Internal Server Error

## Update Booking Details
- URL: `/bookings/:id`
- Method: `PATCH`
- Description: Update details of a specific booking.
- Authentication: Travel agent access token required.
- Request Body:
  ```json
  {
    "destination": "Updated Destination Name",
  "arrival_date": "YYYY-MM-DD",
  "departure_date": "YYYY-MM-DD"
  }

Response:
- Success: 200 OK with updated booking details.
- Error:
    - 401 Unauthorized if invalid or missing token
    - 404 Not Found if booking id not found
    - 500 Internal Server Error

## Delete a Booking
- URL: `/bookings/:id`
- Method: `DELETE`
- Description: Delete a specific booking.
- Authentication: Travel agent access token required.

Response:
- Success: OK with deleted booking details.
- Error:
    - 401 Unauthorized if invalid or missing token
    - 404 Not Found if booking id not found
    - 500 Internal Server Error

