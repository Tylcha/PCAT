import express from 'express';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { Photo } from './models/Photo.js';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
mongoose.connect('mongodb://localhost/pcat-test-db');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLAWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
// app.get('/', (req, res) => {
//     res.render('index');
// });
app.get('/', async (req, res) => {
    const photos = await Photo.find({});
    res.render('index', { photos });
    // console.log(photos);
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/add', (req, res) => {
    res.render('add');
});
// app.post('/photos', (req,res) =>{
//     console.dir(req.ip);
//     console.log(req.body);
//     res.redirect('/')
// })
app.post('/photos', async (req, res) => {
    await Photo.create(req.body);
    res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
