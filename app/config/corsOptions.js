const allowedOrigins = require('./allowedOrigins.config');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // methods: ['GET', 'POST'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true, 
    optionsSuccessStatus: 200
}



module.exports = corsOptions;