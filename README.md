<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Notification Service - Documentation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: 40px auto;
      line-height: 1.6;
      color: #333;
      padding: 0 20px;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
    }
    pre {
      background: #f4f4f4;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    a {
      color: #2980b9;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    ul {
      margin-left: 20px;
    }
    .note {
      background: #fcf8e3;
      padding: 10px;
      border-left: 4px solid #f0ad4e;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>Notification Service</h1>

  <h2>Objective</h2>
  <p>
    This project implements a Notification Service that allows sending notifications to users via multiple channels including Email, SMS, and in-app notifications. Notifications are processed asynchronously using a message queue (RabbitMQ), with retries for failed deliveries.
  </p>

  <h2>Features</h2>
  <ul>
    <li><strong>API Endpoints:</strong>
      <ul>
        <li><code>POST /notifications</code> — Send a new notification</li>
        <li><code>GET /users/{id}/notifications</code> — Retrieve notifications for a user</li>
      </ul>
    </li>
    <li><strong>Notification Types:</strong> Email, SMS, and In-app</li>
    <li><strong>Queue-based processing:</strong> Uses RabbitMQ to handle notification delivery asynchronously</li>
    <li><strong>Retries:</strong> Automatic retries for failed notifications via message re-queuing</li>
  </ul>

  <h2>Prerequisites</h2>
  <ul>
    <li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> (v14+ recommended)</li>
    <li><a href="https://www.npmjs.com/" target="_blank" rel="noopener noreferrer">npm</a></li>
    <li><a href="https://www.docker.com/get-started" target="_blank" rel="noopener noreferrer">Docker</a> (to run RabbitMQ easily)</li>
    <li>RabbitMQ server (can be run via Docker or installed natively)</li>
  </ul>

  <h2>Setup Instructions</h2>

  <h3>1. Clone the repository</h3>
  <pre><code>git clone https://github.com/yourusername/notification-service.git
cd notification-service
  </code></pre>

  <h3>2. Start RabbitMQ server using Docker</h3>
  <p>This project uses RabbitMQ as the message queue. The easiest way to run RabbitMQ locally is via Docker:</p>
  <pre><code>docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
  </code></pre>
  <p>This will start RabbitMQ and expose:</p>
  <ul>
    <li>Port <code>5672</code> for AMQP connections</li>
    <li>Port <code>15672</code> for RabbitMQ management UI (visit <a href="http://localhost:15672" target="_blank" rel="noopener noreferrer">http://localhost:15672</a>, default user/pass: <code>guest</code>/<code>guest</code>)</li>
  </ul>

  <h3>3. Install dependencies</h3>
  <pre><code>npm install
  </code></pre>

  <h3>4. Configure Environment Variables</h3>
  <p>Create a <code>.env</code> file in the project root with the following content:</p>
  <pre><code>RABBITMQ_URL=amqp://localhost
PORT=3000
  </code></pre>
  <p><code>RABBITMQ_URL</code> points to the RabbitMQ instance (default assumes Docker localhost). <code>PORT</code> is the port your Express API server will listen on.</p>

  <h3>5. Run the Notification Worker</h3>
  <p>This worker listens to the RabbitMQ queue and processes notifications asynchronously.</p>
  <pre><code>npm run worker
  </code></pre>

  <h3>6. Start the Express API Server</h3>
  <p>In a new terminal, run:</p>
  <pre><code>npm start
  </code></pre>
  <p>Your API server should now be running at <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a>.</p>

  <h2>API Usage</h2>

  <h3>Send a Notification</h3>
  <pre><code>POST /notifications
Content-Type: application/json

{
  "user": "user-id-123",
  "type": "email",        // "email" | "sms" | "in-app"
  "message": "Your notification message here"
}
  </code></pre>

  <h3>Get User Notifications</h3>
  <pre><code>GET /users/{id}/notifications
  </code></pre>
  <p>Replace <code>{id}</code> with the user identifier.</p>

  <h2>Retry Mechanism</h2>
  <p>Failed notifications will be automatically retried. When a failure occurs, the message is re-queued up to a maximum retry count (defined in the worker). This ensures reliable delivery even if transient errors happen.</p>

  <h2>Assumptions</h2>
  <ul>
    <li>The project uses RabbitMQ for queueing notifications.</li>
    <li>RabbitMQ is accessible at <code>amqp://localhost</code> (adjust <code>RABBITMQ_URL</code> in <code>.env</code> if different).</li>
    <li>Notification sending (email, SMS) logic can be implemented or mocked inside the worker.</li>
    <li>The project currently logs notifications; integration with real email/SMS providers is out of scope.</li>
  </ul>

  <h2>Useful Links</h2>
  <ul>
    <li><a href="http://localhost:15672" target="_blank" rel="noopener noreferrer">RabbitMQ Management UI</a></li>
    <li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a></li>
    <li><a href="https://www.docker.com/get-started" target="_blank" rel="noopener noreferrer">Docker</a></li>
  </ul>

  <h2>Contact</h2>
  <p>For any issues or questions, please contact <strong>Your Name</strong> at <a href="mailto:your.email@example.com">your.email@example.com</a>.</p>

  <hr />
  <p style="text-align:center;">Enjoy using the Notification Service! 🚀</p>
</body>
</html>
