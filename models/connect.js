import e from 'express';
import mongoose from 'mongoose';

const conn = () => {
    mongoose.connect('mongodb://localhost/pcat-test-db');
};

export default conn