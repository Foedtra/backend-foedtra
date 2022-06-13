const {
  dbPlaces,
} = require('../configs/config');

// Add Place Cont
const addPlace = async (req, res) => {
  const {
    placeName,
    placeImage,
    placeDesc,
    placeMenu,
    contact,
    lat,
    lng,
  } = req.body;

  const uid = res.locals.uid;
  // example image marker
  const icon = 'https://firebasestorage.googleapis.com/v0/b/foedtra-app.appspot.com/o/Location.png?alt=media&token=8ba1d63e-a698-4f39-87cf-4c8b7bd1c01a';

  const newPlace = {
    uid,
    placeName,
    placeImage,
    placeDesc,
    placeMenu,
    contact,
    lat,
    lng,
    icon,
  };
  // const uid = ;

  try {
    await dbPlaces.doc().set(newPlace);
    res.send({
      status: 'success',
      message: 'Food place stored successfully',
      data: {
        place: newPlace,
      },
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get All Place
const getAllPlace = async (req, res) => {
  const places = [];
  const {name} = req.query;
  await dbPlaces.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      places.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  }).catch((error) => {
    return res.status(400).send({
      status: 'failed',
      message: 'Failed to read data', error,
    });
  });
  const filterQuery = (placesQ) => ({
    status: 'success',
    data: {
      foods: placesQ.map((place) => ({
        id: place.id,
        name: place.placeName,
        lat: place.lat,
        lng: place.lng,
      })),
    },
  });

  // Display Food Place by name
  if (name) {
    const lowerName = name.toLowerCase();
    let filterName = places
        .filter((place) =>
          place.placeName.toLowerCase().includes(lowerName));
    filterName = filterQuery(filterName);
    return res
        .status(200)
        .send({...filterName});
  }

  if (places.length > 0) {
    return res
        .status(200)
        .send({
          status: 'succes',
          data: {
            places: places.map((places) =>({
              id: places.id,
              uid: places.uid,
              placeName: places.placeName,
              lat: places.lat,
              lng: places.lng,
              icon: places.icon,
            })),
          },
        });
  }
  return res
      .status(200)
      .send({
        status: 'succes',
        data: {
          places,
        },
      });
};

const getDetailPlace = async (req, res, next) => {
  const {placeId} = req.params;
  const place = [];
  await dbPlaces.doc(placeId).get().then((doc) => {
    if (doc.exists) {
      place.push({
        id: doc.id,
        ...doc.data(),
      });
      return res
          .status(200)
          .send({
            status: 'success',
            data: {
              place: place.map((place) => ({
                id: place.id,
                uid: place.uid,
                placeImage: place.placeImage,
                placeName: place.placeName,
                placeDesc: place.placeDesc,
                placeMenu: place.placeMenu,
                contact: place.contact,
                lat: place.lat,
                lng: place.lng,
                icon: place.icon,
              })),
            },
          });
    } else {
      return res.code(404).send({
        status: 'failed',
        message: 'Place not found',
      });
    }
  }).catch((error) => {
    return res.status(400).send(error.message);
  });
};

// edit all Place for Admin, manager
const editPlace = async (req, res) => {
  const {placeId} = req.params;
  const {
    placeName,
    placeImage,
    placeDesc,
    placeMenu,
    contact,
    lat,
    lng,
  } = req.body;
  const updateContent = {
    placeName,
    placeImage,
    placeDesc,
    placeMenu,
    contact,
    lat,
    lng,
  };
  // .where('uid', '==', res.locals.uid)
  await dbPlaces
      .doc(placeId)
      .update(updateContent)
      .then((doc) => {
        if (doc.data() == updateContent) {
          res
              .status(200)
              .send({
                status: 'success',
                message: 'place has been updated',
              });
        } else {
          return res.status(404).send({
            status: 'failed',
            message: 'Place not found !',
          });
        }
      }).catch((error) => {
        return res.status(400).send(error.message);
      });
};

// delete all Place for Admin
const deletePlace = async (req, res) => {
  const {placeId} = req.params;
  await dbPlaces
      .doc(placeId)
      .delete()
      .where('uid', '==', res.locals.uid)
      .then((doc) => {
        if (doc.exists) {
          return res.code(200).send({
            status: 'success',
            message: 'Place has been deleted',
          });
        } else {
          return res.code(404).send({
            status: 'failed',
            message: 'Place not found',
          });
        }
      }).catch((error) => {
        return res.status(400).send(error.message);
      });
};

// // delete UserPlace
// const addMyPlace = async (req, res) => {
//   const {
//     uid,
//     placeName,
//     placeImage,
//     placeDesc,
//     placeMenu,
//     contact,
//     lat,
//     lng,
//   } = req.body;

//   const myPlace = {
//     uid,
//     placeName,
//     placeImage,
//     placeDesc,
//     placeMenu,
//     contact,
//     lat,
//     lng,
//     icon,
//   };
// };

// // get UserPlace
// const getMyPlace = async (req, res) => {
// const {placeId} = req.params;
// await dbPlaces.doc()
// };

// // edit UserPlace
// const editMyplace = async (req, res) => {

// };

// // delete UserPlace
// const deleteMyplace = async (req, res) => {
//   await dbPlaces.doc(placeId).delete();
//   return res.code(200).send('Data berhasil dihapus');
// };


module.exports = {
  addPlace,
  getAllPlace,
  getDetailPlace,
  editPlace,
  deletePlace,
  // addMyPlace,
  // getMyPlace,
  // editMyplace,
  // deleteMyplace,
};
