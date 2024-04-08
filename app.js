import express from 'express';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLAWARES
app.use(express.static('public'));

//ROUTES
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/add', (req, res) => {
    res.render('add');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
