import { Photo } from '../models/Photo.js';

const getAllPhotos = async (req, res) => {
    //take req query /?page= if in req = '/' equal 1
    const page = parseInt(req.query.page) || 1;
    //page photo limit
    const photosLimit = 1;
    //all page
    const allPhotoCount = await Photo.find({}).countDocuments();
    //photos show page per 3
    const photos = await Photo.find({})
        //date last go firs
        .sort({ dateCreated: -1 })
        //skip photo if page 1 = 0 * 3 =0
        .skip((page - 1) * photosLimit)
        //show limit 3
        .limit(photosLimit);
    console.log(allPhotoCount);

    // const photos = await Photo.find({}).sort({ dateCreated: -1 });
    res.render('index', {
        photos,
        currentPage: page,
        //exp: 5/3 ceil
        pages: Math.ceil(allPhotoCount / photosLimit),
    });
};

const getAbout = (req, res) => {
    res.render('about');
};

const getAddPhoto = (req, res) => {
    res.render('add');
};

export { getAllPhotos, getAbout, getAddPhoto };
