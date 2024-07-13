const express = require('express');
const mongoose = require('mongoose');
const sinhVienRouters = require('./routes/sinhVienRoutes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/sinhvien', sinhVienRouters);

mongoose.connect('mongodb://localhost:27017/API_Test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connect Success!');
}).catch((err) => {
    console.log('Error', err);
});

app.listen(PORT, () => {
    console.log(`Server in Port ${PORT}`);
});
