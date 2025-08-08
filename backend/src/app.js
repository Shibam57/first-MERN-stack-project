const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path");

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// These are for JSON/URL-encoded, not for multipart
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb'  }));
app.use(express.static('public'));
app.use(cookieParser());



//  ROUTES SHOULD COME AFTER MIDDLEWARES
const userRouter = require('./routes/userRoute.js');
app.use('/v1/users', userRouter); 


app.use(express.static(path.join(__dirname, '/dist')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname,  '/dist/', 'index.html'));
});

module.exports = app;
