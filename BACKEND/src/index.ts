
import express = require('express') ;
import userRouter from './routes/user.routes';

const app = express();
const PORT = 3333;

app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`[Server]: Server is running at http://localhost:${PORT}`);
})