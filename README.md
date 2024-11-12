# Web Banking Application

## Overview
This is a web banking application where users can sign up, sign in, validate their phone number using a one-time passcode sent by SMS/Email, view their balance and transaction history, and transfer money to other users. The application will be built with **React** for the frontend, **Node.js** for the server, and **MongoDB** as the database. **Twilio** will be used for SMS-based phone number validation, and the project will be hosted on a platform of your choice.

## Features

### 1. Sign Up
- The user can sign up by entering their email address, password, and phone number.
- Email and phone number formats are validated.
- Users cannot register with an already used email address. If the email is taken, an error message is displayed.
- Upon successful sign-up, a one-time passcode (OTP) is sent via SMS to the provided phone number.
  
### 2. Phone Validation
- The user must enter the OTP sent to their phone to validate their number.
- If the OTP is correct, the user is successfully registered and redirected to the dashboard.
- If the OTP is incorrect, an error message is shown.

### 3. Dashboard
- The dashboard is protected and can only be accessed after sign-in.
- A random account balance is set for the user upon registration.
- The user can view their current balance and recent transactions.
- The user can sign out, which redirects them to the login page.

### 4. Login
- The user can log in by entering the correct email and password.
- If validated, the user is redirected to the dashboard. Otherwise, an error message is shown.

### 5. Transaction
- Users can send money to another registered user by providing the recipient's email and the amount.
- If the user doesn't have enough balance or the recipient's email doesn't exist, an error message is shown.
- Upon successful transaction:
  - The sender’s transaction history is updated with the receiver’s email and the sent amount (with a negative sign).
  - The receiver’s transaction history is updated with the sender’s email and the received amount (with a positive sign).

## Technologies Used
- **Frontend**: React, HTML, CSS, JavaScript, Material UI
- **Backend**: Node.js, Express, JWT, Swagger
- **Database**: MongoDB, Mongoose
- **SMS**: Twilio (for phone number validation)
- **Real-time Communication**: Socket.IO (for money transfer notifications)
- **Video Call**: Jitsi
- **Containerization**: Docker
- **UI/UX Design**: Figma

## Installation

### Prerequisites
- Docker

### Clone the repository
```bash
git clone https://github.com/your-username/banking-app.git
cd banking-app
```

### Set enviromental variables

### Run with Docker
```bash
docker compose up
```
