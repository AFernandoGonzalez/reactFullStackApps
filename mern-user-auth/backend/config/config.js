const config = {
    ENV : process.env.NODE_ENV || 'development',
    PORT : process.env.PORT || 8000,
    JWT_SECRET : process.env.JWT_SECRET || "secret_key",
    MONGO_URI : process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mernproject'
}


module.exports = config;