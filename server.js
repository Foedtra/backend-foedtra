const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
// const cookieParser = require('cookie-parser')();
// const {
//   createUser,
//   listAllUsers,
// } = require('./controllers/userController');
const {
  addFood,
  getAllFood,
  getDetailFood,
  getFoodPredict,
} = require('./controllers/foodController');

// const {auth} = require('./configs/config');

const {
  validateAuthToken,
  // isAuthorized,
} = require('./middlewares/auth.middleware');

// const authMiddleware = require('./middlewares/auth.middleware');


const {
  addPlace,
  getAllPlace,
  getDetailPlace,
  editPlace,
  deletePlace,
  // getMyPlace,
  // editMyPlaceCont,
  // deleteMyPlaceCont,
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

app.use(validateAuthToken);

// app.get('/users',
//     // isAuthorized({option: ['admin']}),
//     listAllUsers,
// ); // Get Users for Only Admins
// app.post('/users',
//     isAuthorized({option: ['admin']}),
//     createUser,
// ); // Create Users for Only Admins
// app.get('/users/:id',
//     isAuthorized({option: ['admin']}),
// ); // admin and user with same id have access
// app.patch('/users/:id',
//     isAuthorized({option: ['admin']}),
// ); // admin and user with same id have access
// app.delete('/users/:id',
//     isAuthorized({option: ['admin']}),
// ); // admin and user with same id have access

// Food
app.post('/predict', getFoodPredict); // admin and user have access
app.post('/foods',
    addFood,
    // isAuthorized({option: ['admin']}),
); // Only Admins
app.get('/foods', getAllFood); // admin and user have access
app.get('/foods/:foodId', getDetailFood); // admin and user have access
// Auth

// Food Place
app.post('/placeConts',
    addPlace); // admin and user have access
app.get('/placeConts',
    getAllPlace); // admin and user have access
app.get('/placeConts/:placeId',
    getDetailPlace); // admin & user have access
app.patch('/placeConts/:placeId',
    editPlace); // for Only Admins
app.delete('/placeConts/:placeId',
    deletePlace); // for Only Admins

// MyPlace
// admin & user with same id have access
// app.get('/myPlace/:uid', getMyPlace);
// app.patch('/myPlace/:uid', editMyPlaceCont);
// app.delete('/myPlaces/:uid', deleteMyPlaceCont);

// app.post('/idToken', getToken);
// app.use(cookieParser);
app.get('/hello', (req, res) => {
  // @ts-ignore
  res.send(`Hello ${req.user.name}`);
});

// server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});

