import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// routes
import userRoutes from './routes/user.route';
import accountRoutes from './routes/account.route';
import transactionRoutes from './routes/transaction.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('The api is working'));

// handle routes
app.use('/api/v1', userRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/transactions', transactionRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
