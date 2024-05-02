import { Photo } from '../models/Photo.js';

const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort({ dateCreated: -1 });
    res.render('index', { photos });
    // console.log(photos);
};

const getAbout = (req, res) => {
    res.render('about');
};

const getAddPhoto = (req, res) => {
    res.render('add');
};

export { getAllPhotos, getAbout, getAddPhoto };
