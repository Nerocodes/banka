import express from 'express';

const app = express();
const PORT = process.env.PORT || 9000;

app.get('/', (req, res) => {
    return res.send('The api is working');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});