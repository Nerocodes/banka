import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// routes
import userRoutes from './routes/user.route';
import accountRoutes from './routes/account.route';
import transactionRoutes from './routes/transaction.route';
import swaggerRoutes from './utils/swaggerDoc';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.send('Welcome to Banka web app! Documentation path: /api-docs'));

// handle routes
app.use('/api/v1', userRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api-docs', swaggerRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
