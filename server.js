const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
// const cookieParser = require('cookie-parser')();
const {
  userSignUp,
} = require('./controllers/userController');
const {
  getAllFood,
  getDetailFoodParams,
  getFoodPredict,
} = require('./controllers/foodController');

// const {auth} = require('./configs/config');

const {validateAuthToken} = require('./middlewares/auth.middleware');

// const {authMiddleware} = require('./middlewares/auth.middleware');


const {
  addPlaceCont,
  getAllPlaceCont,
  getDetailPlaceCont,
  editPlaceCont,
  deletePlaceCont,
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

// auth.onAuthStateChanged((user) => {
//   if (user) {
//     console.log('user logged in: ', user);
//   } else {
//     console.log('user logged out');
//   }
// });
// User
// app.post('user/signup', );
// app.post('user/signin', userSignIn);
// app.post('user/signout', userSignOut);

app.get('/users' ); // List All Users for Only Admins
app.post('/users',
    // validateAuthToken,
    // isAuthorized({option: ['admin', 'manager']}),
    userSignUp,
); // Create Users for Only Admins
app.get('/users/:id' ); // admin and user with same id have access
app.patch('/users/:id'); // admin and user with same id have access
app.delete('/users/:id'); // admin and user with same id have access

// Food
app.post('/predict', getFoodPredict);
app.get('/foods', getAllFood);
app.get('/foods/:foodId', getDetailFoodParams);
// Auth
// Place
app.post('/placeConts', addPlaceCont);
app.get('/placeConts', getAllPlaceCont);
app.get('/placeConts/:placeId', getDetailPlaceCont);
app.patch('/placeConts/:placeId', editPlaceCont);
app.delete('/placeConts/:placeId', deletePlaceCont);

// app.post('/idToken', getToken);
// app.use(cookieParser);
// app.use(validateFirebaseIdToken);
app.get('/hello', (req, res) => {
  // @ts-ignore
  res.send(`Hello ${req.user.name}`);
});

// server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});

