const axios = require('axios');
const dotenv = require('dotenv');
const {dbFoods} = require('../configs/config');
dotenv.config();

const addFood = async (req, res) => {
  const {
    namaMakanan,
    asalProvinsi,
    deskripsi,
    linkArtikel,
  } = req.body;
  const newFood= {
    namaMakanan,
    asalProvinsi,
    deskripsi,
    linkArtikel,
  };
  try {
    await dbFoods.doc('33').set(newFood);
    res.send('Data User Berhasil Tersimpan');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// getAllFood
const getAllFood = async (req, res) => {
  const {name, from} = req.query;
  const foods = [];
  await dbFoods.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) =>{
      foods.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  }).catch((error) => {
    return res
        .status(400)
        .send('Data gagal di baca', error);
  });

  const filterQuery = (foodsQ) => ({
    status: 'success',
    data: {
      foods: foodsQ.map((food) => ({
        id: food.id,
        name: food.namaMakanan,
        from: food.asalProvinsi,
      })),
    },
  });
  // Display Food by name
  if (name) {
    const lowerName = name.toLowerCase();
    let filterName = foods
        .filter((food) => food.namaMakanan.toLowerCase().includes(lowerName));
    filterName = filterQuery(filterName);
    return res
        .status(200)
        .send({...filterName});
  }

  // Display Food by from
  if (from) {
    const lowerFrom = from.toLowerCase();
    let filterFrom = foods
        .filter((food) => food.asalProvinsi.toLowerCase().includes(lowerFrom));
    filterFrom = filterQuery(filterFrom);
    return res
        .status(200)
        .send({...filterFrom});
  }
  // Display ALL with only id, namaMakanan, and asalProvinsi
  if (foods.length > 0) {
    return res
        .status(200)
        .send({
          status: 'success',
          data: {
            foods: foods.map((food) => ({
              id: food.id,
              name: food.namaMakanan,
              from: food.asalProvinsi,
            })),
          },
        });
  }
  // Display Food
  return res
      .status(200)
      .send({
        status: 'success',
        data: {
          foods,
        },
      });
};

// getting food detail using request parameters
const getDetailFood= async (req, res) => {
  const {foodId} = req.params;
  const food = [];
  await dbFoods.doc(foodId).get().then((doc) => {
    if (doc.exists) {
      food.push({
        id: doc.id,
        ...doc.data(),
      });
      return res
          .status(200)
          .send({
            status: 'success',
            data: {
              food: food.map((food) => ({
                id: food.id,
                name: food.namaMakanan,
                from: food.asalProvinsi,
                desc: food.deskripsi,
                source: food.linkArtikel,
              })),
            },
          });
    } else {
      return res.status(404).send('Makanan yang Dicari Tidak ada !');
    }
  }).catch((error) => {
    return res.status(400).send('Data gagal di baca', error);
  });
};

// getting Food Predict and Map using Image and location
const getFoodPredict = async (req, res) => {
  const {image} = req.body;
  const {lat} = req.body;
  const {lng} = req.body;
  const apiKey = process.env.API_KEY_MAPS;
  const apiPredict = {
    method: 'post',
    url: `${process.env.URL_PREDICT}/predict`, // our ML API
    data: {
      image: image,
    },
  };
  await axios(apiPredict).then((response) => {
    let allIn = {};
    const jsonResult = response.data;
    const foods = jsonResult.prediction;
    const keyword = foods['keyword'];
    const mapConfig = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&keyword=${keyword}&opennow=true&radius=8000&type=restaurant&key=${apiKey}`,
    };
    axios(mapConfig).then((responseMaps) => {
      allIn = foods;
      jsonMaps = responseMaps.data.results;
      restaurants = [];
      jsonMaps.forEach((resto) => {
        allResto = {};
        allResto['name'] = resto.name;
        allResto['geometry'] = resto.geometry;
        allResto['place_id'] = resto.place_id;
        allResto['icon'] = resto.icon;
        const lat2 = allResto['geometry']['location']['lat'];
        const lng2 = allResto['geometry']['location']['lng'];

        allResto['distance'] = parseFloat(
            getDistance(lat, lng, lat2, lng2),
        );
        // console.log(distance);
        restaurants.push(allResto);
      });
      restaurants.sort((a, b) => {
        return a.distance - b.distance;
      });
      allIn['restaurants'] = restaurants;
      res.send(JSON.stringify(allIn));
    }).catch((error) => {
      res.send(error);
    });
  }).catch((error)=>{
    res.send(error);
  });
};


const getDistance = (lat1, lng1, lat2, lng2) => {
  const earthR = 6371; // Earth radius KM
  const RLat = degToRadius(lat2 - lat1);
  const RLgn = degToRadius(lng2 - lng1);
  const d =
  Math.sin(RLat / 2) *
  Math.sin(RLat / 2) +
  Math.cos(degToRadius(lat1)) *
  Math.cos(degToRadius(lat2)) *
  Math.sin(RLgn / 2) *
  Math.sin(RLgn / 2);
  const distance = earthR * (2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d)));
  return distance.toFixed(1);
};

const degToRadius = (degree) =>{
  return degree * (Math.PI / 180);
};

module.exports = {
  getAllFood,
  getDetailFood,
  getFoodPredict,
  addFood,
};
