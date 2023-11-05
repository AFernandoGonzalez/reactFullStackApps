const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
// const expressJwt = require('express-jwt');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is connected");
}).catch(err => {
    console.log(`Can not connect to the database ${err}`);
    process.exit();
});




app.use('/', userRoutes);
app.use('/', authRoutes);
// app.use((err, req, res, next) => {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).json({ error: "Unauthorized!" });
//     }
// });

app.listen(config.PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server is running on port : ${config.PORT}`);
});

