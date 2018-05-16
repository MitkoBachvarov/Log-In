const express = require('express');

let app = express();
let loginController = require('./controller/loginController.js');

app.set('view engine', 'ejs');
app.use(express.static('./public'));
loginController(app);
app.listen(3000, () => {
    console.log('Starting');
});