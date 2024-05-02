import express from 'express';
import * as photoControllers from '../controllers/photoControllers.js';


const router = express.Router();

router.route('/').post(photoControllers.UploadPhoto);
router.route('/:id').get(photoControllers.getDetailPhoto);
router.route('/edit/:id').get(photoControllers.EditPhoto);
router.route('/edit/:id').put(photoControllers.putEditPhoto);
router.route('/edit/:id').delete(photoControllers.DeletePhoto);

export default router;
