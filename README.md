# Notification Service

## Objective

This project implements a Notification Service that allows sending notifications to users via multiple channels including Email, SMS, and in-app notifications. Notifications are processed asynchronously using a message queue (RabbitMQ), with retries for failed deliveries.

## Features

- **API Endpoints:**
  - `POST /notifications` — Send a new notification
  - `GET /users/{id}/notifications` — Retrieve notifications for a user
- **Notification Types:** Email, SMS, and In-app
- **Queue-based processing:** Uses RabbitMQ to handle notification delivery asynchronously
- **Retries:** Automatic retries for failed notifications via message re-queuing

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/get-started) (to run RabbitMQ easily)
- RabbitMQ server (can be run via Docker or installed natively)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/sanjanaagarwal7/notification-service.git
cd notification-service
```
### 2. Start RabbitMQ server using Docker
```bash
docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```
This will start RabbitMQ and expose:<br>
1. Port 5672 for AMQP connections<br>
2. Port 15672 for RabbitMQ management UI (http://localhost:15672, default user/pass: guest / guest)<br>

### 3. Install dependencies
```bash
npm install
```
### 4. Configure Environment Variables
```bash
RABBITMQ_URL=amqp://guest:guest@localhost:5672/
PORT=3000
```
### 5.Run the Notification Worker
```bash
npm run worker
```
### 6.Start the Express API Server
```bash
npm start
```
## API Usage
  ### Send a Notification 
  ```bash
  POST /notifications
Content-Type: application/json

{
  "user": "user-id-123",
  "type": "Email",        // "Email" | "SMS" | "in-app"
  "message": "Your notification message here"
}
```
### Get User Notifications
```bash
  GET /users/{id}/notifications
```
## Retry Mechanism
Failed notifications will be automatically retried. When a failure occurs, the message is re-queued up to a maximum retry count (defined in the worker). This ensures reliable delivery even if transient errors happen.

## Assumptions
1. The project uses RabbitMQ for queueing notifications.<br>

2. RabbitMQ is accessible at amqp://guest:guest@localhost:5672/.<br>

3. Notification sending (Email, SMS) logic can be implemented or mocked inside the worker.<br><br>
## Here is the link to my API Documentation
 https://documenter.getpostman.com/view/44592909/2sB2qXji4M   <br><br><br><br>































## Sending a Notification (POST Request)
![Screenshot 2025-05-19 025458](https://github.com/user-attachments/assets/2a938d7e-2bd9-40f6-a387-79abbb35bf42)<br>
## Get User Notifications (GET Request)
![Screenshot 2025-05-19 031436](https://github.com/user-attachments/assets/c7dd1eac-2941-4988-a52a-3b808bd4c86d)<br>
## RabbitMQ Queue Usage
![Screenshot 2025-05-19 025354](https://github.com/user-attachments/assets/83f91a45-f93a-4e36-81b4-6d5440b4c6ee)
## Retry Mechanism
![Screenshot 2025-05-19 025433](https://github.com/user-attachments/assets/e7d8f28a-614a-450c-b642-7a165472ce84)
## Handling Invalid Request Types
![Screenshot 2025-05-19 025536](https://github.com/user-attachments/assets/7a33f7b1-6939-41a6-a0af-b8cc35d3260e)



