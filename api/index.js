require('dotenv').config();
const express = require('express');
const cors = require('cors');
const appRouter = require('../app/routes/index');
const  corsOptions = require('../app/config/corsOptions');

const PORT = process.env.PORT || 5000
const app = express();

//cors options
app.use(cors(corsOptions));
app.use(express.json());
//app.use(bodyParser.json());
app.use('/api', appRouter);
app.listen(PORT, ()=> console.log(`app is running on ${PORT}`));
