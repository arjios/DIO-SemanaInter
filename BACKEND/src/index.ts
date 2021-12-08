// import express = require('express') ;
import express from 'express';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import { GlobalErrors } from './middlewares/globalErrors';
import routes from './routes';

createConnection().then(connection => {

    const app = express();

    const PORT = 3333;

    app.use(express.json);

    app.use(routes);

    app.use(GlobalErrors);

    app.listen(PORT, () => {

    console.log(`[Server]: Server is running at http://localhost:${PORT}`);

    });

}).catch((error) => {

    console.log("Unable to connect", error);

});
