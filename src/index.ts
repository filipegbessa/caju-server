import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import serviceRoutes from './routes/registrationRoutes';
import userRoutes from './routes/userRoutes';

const PORT = process.env.PORT || 9000;

connectDB();

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', serviceRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
