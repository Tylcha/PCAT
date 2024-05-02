import express from 'express';
import ejs from 'ejs';
import 'dotenv/config';

import fileUpload from 'express-fileupload';
import methodOverride from 'method-override';

import pageRoute from './routes/pageRoute.js';
import photoRoute from './routes/photoRoute.js';

import conn from './models/connect.js';

const app = express();

//connect db
conn();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLAWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

//Routes
app.use('/', pageRoute);
app.use('/photo', photoRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
});
