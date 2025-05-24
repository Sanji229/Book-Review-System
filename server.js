const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("MongoDB connected");
});

app.use('/books', require('./routes/books'));
app.use('/reviews', require('./routes/reviews'));
app.use('/users', require('./routes/users'));

app.listen(5000, () => console.log("Server started on port 5000"));
axios.get('http://localhost:5000/books') // Example: get books
