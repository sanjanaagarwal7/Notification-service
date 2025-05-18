const express = require('express');
const notificationRoutes = require('./routes/notificationRouter');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());


app.use('/', notificationRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
