# EventSphere Backend

This repository contains the backend code for the EventSphere project.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

EventSphere is a platform designed to manage and organize events seamlessly. This backend service provides APIs to handle event creation, user management, and other core functionalities.

## Features

- User authentication and authorization
- Event creation and management
- Attendee Submissions
- Organizer portal

## Installation

To get started with the backend service, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/eventsphere-backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd eventsphere-backend
   ```
3. Install dependencies:
   ```sh
   pnpm install
   ```

## Usage

To start the development server, run:

```sh
pnpm start
```

The server will start on `http://localhost:3000`.

## Docs

### **User Signup**

**Endpoint:**  
`POST /users/signup`  
**Description:**  
Registers a new user.  
**Request Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "userId": "string"
}
```

### **User Login**

**Endpoint:**  
`POST /users/login`  
**Description:**  
Authenticates a user and returns a token.  
**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "string"
}
```

---

## **Events**

### **Get All Events**

**Endpoint:**  
`GET /users/events`  
**Description:**  
Fetches a list of all available events.  
**Response:**

```json
[
  {
    "eventId": "string",
    "eventName": "string",
    "date": "string",
    "location": "string"
  }
]
```

### **Create an Event**

**Endpoint:**  
`POST /users/events`  
**Description:**  
Creates a new event.  
**Request Body:**

```json
{
  "eventName": "string",
  "date": "string",
  "location": "string"
}
```

**Response:**

```json
{
  "message": "Event created successfully",
  "eventId": "string"
}
```

### **Update an Event**

**Endpoint:**  
`PUT /users/events`  
**Description:**  
Updates an existing event.  
**Request Body:**

```json
{
  "eventId": "string",
  "eventName": "string",
  "date": "string",
  "location": "string"
}
```

**Response:**

```json
{
  "message": "Event updated successfully"
}
```

### **Delete an Event**

**Endpoint:**  
`DELETE /users/events`  
**Description:**  
Deletes an event.  
**Request Body:**

```json
{
  "eventId": "string"
}
```

**Response:**

```json
{
  "message": "Event deleted successfully"
}
```

---

## **Event Registration**

### **Register for an Event**

**Endpoint:**  
`POST /users/events/:id/register`  
**Description:**  
Registers a user for a specific event.  
**Response:**

```json
{
  "message": "User registered for event successfully"
}
```

### **View Event Details**

**Endpoint:**  
`GET /users/events/:id/view`  
**Description:**  
Fetches details of a specific event.  
**Response:**

```json
{
  "eventId": "string",
  "eventName": "string",
  "date": "string",
  "location": "string",
  "attendees": ["user1", "user2"]
}
```

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
