
import express = require('express') ;

const app = express();
const PORT = 3333;

app.get('/', (req, res) => res.send("Express + TypeSscript Server"));

app.listen(PORT, () => {
    console.log(`[Server]: Server is running at http://localhost:${PORT}`);
})