const express = require('express');
const cors = require('cors');
const connectDB = require('./db/ConnectDB');
const userRoutes = require('./routes/UserRoutes.js');
const { notFoundHandler,errorHandler } = require('./middleware/HandlingError.js');

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // important for parsing JSON bodies

app.get('/', (req, res) => {
  res.send('App is running successfully');
});

// Mount routes
app.use('/api/user', userRoutes);
app.use(notFoundHandler); // Handle 404 errors
app.use(errorHandler); // Handle other errors

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
