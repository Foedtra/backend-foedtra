const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const {
  addFood,
  getAllFood,
  getDetailFood,
  getFoodPredict,
} = require('./controllers/foodController');


const {
  validateAuthToken,
} = require('./middlewares/auth.middleware');


const {
  addPlace,
  getAllPlace,
  getDetailPlace,
  editPlace,
  deletePlace,
} = require('./controllers/placeController');


const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 1000000,
  extended: true,
}));

// Auth
app.use(validateAuthToken);
// Food
app.post('/predict', getFoodPredict);
app.post('/foods', addFood);
app.get('/foods', getAllFood);
app.get('/foods/:foodId', getDetailFood);


// Food Place
app.post('/places',
    addPlace);
app.get('/places',
    getAllPlace);
app.get('/places/:placeId',
    getDetailPlace);
app.patch('/places/:placeId',
    editPlace);
app.delete('/places/:placeId',
    deletePlace);

app.get('/hello', (req, res) => {
  res.send(`Hello ${res.locals.name}`);
});

// server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});

