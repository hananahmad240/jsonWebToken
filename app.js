const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
// create app
const app = express();
app.use(express.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

// database
mongoose
	.connect(process.env.DB_CONNECTED, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => {
		console.log('data base is connected');
	})
	.catch((err) => {
		console.log(err);
	});

// all routes
app.use('/api/user', require('./routes/auth'));
app.use('/api', require('./routes/posts'));

// create port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`app is running on localhost ${PORT}`);
});