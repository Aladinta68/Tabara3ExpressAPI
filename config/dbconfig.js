const mongoose = require('mongoose');
const dbconfig = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then(() => {
            console.log('Database connected:', process.env.DB_URL);

        });
}

module.exports = dbconfig;







