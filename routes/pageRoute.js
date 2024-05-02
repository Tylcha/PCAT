import express from 'express';
import * as pageControllers from '../controllers/pageControllers.js'

const router = express.Router();

router.route('/').get(pageControllers.getAllPhotos);
router.route('/about').get(pageControllers.getAbout);
router.route('/add').get(pageControllers.getAddPhoto);

export default router;
