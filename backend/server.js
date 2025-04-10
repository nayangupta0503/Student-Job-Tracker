const express = require('express');
const connectDB = require('./config/db');
const applicationRoute = require('./routes/applicationRoute');

const cors = require('cors');
const dotenv = require('dotenv'); 

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.use('/api/applications', applicationRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});