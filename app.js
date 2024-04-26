import express from 'express';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { Photo } from './models/Photo.js';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import methodOverride from 'method-override';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
mongoose.connect('mongodb://localhost/pcat-test-db');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLAWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));

//ROUTES
// app.get('/', (req, res) => {
//     res.render('index');
// });
app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort({ dateCreated: -1 });
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
    let sampleFile;
    let uploadPath;
    sampleFile = req.files.image;
    uploadPath = __dirname + '/public/uploads/' + sampleFile.name;
    sampleFile.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + sampleFile.name,
        });
    });

    res.redirect('/');
});
app.get('/photo/:id', async (req, res) => {
    const photoid = await Photo.findById(req.params.id);
    res.render('photo', { photoid });
});
app.get('/photos/edit/:id', async (req, res) => {
    const photoid = await Photo.findById(req.params.id);
    res.render('edit', { photoid });
}).put('/photos/edit/:id', async (req, res) => {
    const photoid = await Photo.findById(req.params.id);
    photoid.title = req.body.title;
    photoid.description = req.body.description;
    await photoid.save();
    res.redirect(`/photo/${req.params.id}`);
});

const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
