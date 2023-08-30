const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbconfig = require('./config/dbconfig');
const cors = require('cors');
const tabara3Routes = require('./routes/tabara3Routes');
const ApiError = require('./utils/apiError');
const globalErrorhandling = require('./middlewares/errorMiddleware');

dotenv.config({ path: 'config.env' })

dbconfig();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/tabara3', tabara3Routes);

//route not found error
app.all("*", (req, res, next) => {
    next(new ApiError(`Cant find this route : ${req.originalUrl}`, 400))
});

// global error handling midleware
app.use(globalErrorhandling);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT} `)
});
process.on('unhandledRejection', (err) => {
    console.log(`unhandledRejection error : ${err.name}|${err.message}`);
    server.close(() => {
        console.log('Shutting down server ...')
        process.exit(1);
    });
});
