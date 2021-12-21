import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'})

const app = express();

//db connection
db.authenticate()
  .then(() => console.log('DB is connected succesfully'))
  .catch(error => console.log(error));


app.set('view engine', 'pug');

app.use((req,res,next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = 'Agencia de Viajes';
  next();
})

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));

app.use('/', router);

const host = process.env.HOST || '0.0.0.0';
const port = process.env.POST || 4000

app.listen(port,host, () => {
  console.log(`Server running`);
});