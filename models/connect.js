import mongoose from 'mongoose';
import 'dotenv/config';

const conn = () => {
    mongoose.connect(process.env.DBI_URL);
};

export default conn;
