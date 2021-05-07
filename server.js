const mongoose = require('mongoose');
const dotenv = require('dotenv');

//error catching on start
process.on('uncaughtException', err => {
    console.log(err);
    console.log('Uncaught exception: Shutting down ... ');
    process.exit(1);
});

//setting path for config file
dotenv.config({ path: './config.env' });

const app = require('./app');

//setting up database connection
const DB = process.env.DATABASE;
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true, //avoids depreciation issues
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        console.log('--- DB connection success ---');
    });

////////// Start Server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`API running on port ${port}`);
});

///////// Error catching
process.on('unhandledRejection', err => {
    console.log(err);
    console.log(`Unhandled rejection: Shutting down ... `);
    server.close(() => { //this line gives server time to finish any currently pending req/promises before closing
        process.exit(1); //1 = unhandled exception
    }); 
});