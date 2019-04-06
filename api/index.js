import express from 'express';
import bodyParser from 'body-parser';

// routes
import userRoutes from './routes/user.route';

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('The api is working'));

// handle routes
app.use('/api/v1/auth', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
