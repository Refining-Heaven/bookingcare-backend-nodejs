import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/routes';
import connectDB from './config/connectDB'
require('dotenv').config();

const app = express();

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

const port = process.env.PORT || 6969;
// port === undefined => port = 6969

app.listen(port, () => {
  console.log(`Backend is running on the port: http://localhost:${port}`);
});
