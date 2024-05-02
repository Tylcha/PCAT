import { Photo } from '../models/Photo.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const UploadPhoto = async (req, res) => {
    let sampleFile;
    let uploadPath;
    sampleFile = req.files.image;
    uploadPath = __dirname + '/../public/uploads/' + sampleFile.name;
    sampleFile.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + sampleFile.name,
        });
    });

    res.redirect('/');
};

const getDetailPhoto = async (req, res) => {
    const photoid = await Photo.findById(req.params.id);
    res.render('photo', { photoid });
};

const EditPhoto = async (req, res) => {
    const photoid = await Photo.findById(req.params.id);
    res.render('edit', { photoid });
};

const putEditPhoto = async (req, res) => {
    const photoid = await Photo.findById(req.params.id);
    photoid.title = req.body.title;
    photoid.description = req.body.description;
    await photoid.save();
    res.redirect(`/photo/${req.params.id}`);
};

const DeletePhoto = async (req, res) => {
    const photoid = await Photo.findById(req.params.id);
    let file = __dirname + '/../public' + photoid.image;

    fs.unlinkSync(file);
    await Photo.findByIdAndDelete(req.params.id);
    res.redirect('/');
};

export { UploadPhoto, getDetailPhoto, EditPhoto, putEditPhoto, DeletePhoto };
