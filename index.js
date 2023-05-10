const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');
const port = process.env.PORT;
const notFoundMiddleware = require('./middleware/not-found');
//Import Route
const authRoute = require('./routes/auth');
const subscriberRoute = require('./routes/subscriberRoute');

//middleware
app.use(express.json());

//Route middleware
app.use('/api/v1/user', authRoute);
app.use('/api/v1/users', subscriberRoute);

app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log('error =>', error);
  }
};
start();
