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
    res.send('Data User Berhasil Tersimpan');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get All Place
const getAllPlace = async (req, res) => {
  const placeConts = [];
  const {name} = req.query;
  await dbPlaces.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      placeConts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  }).catch((error) => {
    return res.status(400).send('Data gagal dibaca', error);
  });
  const filterQuery = (placesQ) => ({
    status: 'success',
    data: {
      foods: placesQ.map((place) => ({
        id: place.placeId,
        name: place.placeName,
        lat: place.lat,
        lng: place.lng,
      })),
    },
  });

  // Display Food Place by name
  if (name) {
    const lowerName = name.toLowerCase();
    let filterName = placeConts
        .filter((placeCont) =>
          placeCont.placeName.toLowerCase().includes(lowerName));
    filterName = filterQuery(filterName);
    return res
        .status(200)
        .send({...filterName});
  }

  if (placeConts.length > 0) {
    return res
        .status(200)
        .send({
          status: 'succes',
          data: {
            placeConts: placeConts.map((placeConts) =>({
              id: placeConts.placeId,
              uid: placeConts.uid,
              name: placeConts.placeName,
              lat: placeConts.lat,
              lng: placeConts.lng,
              icon: placeConts.icon,
            })),
          },
        });
  }
  return res
      .status(200)
      .send({
        status: 'succes',
        data: {
          placeConts,
        },
      });
};

const getDetailPlace = async (req, res, next) => {
  const {placeId} = req.params;
  const placeCont = [];
  await dbPlaces.doc(placeId).get().then((doc) => {
    if (doc.exists) {
      placeCont.push({
        id: doc.id,
        ...doc.data(),
      });
      return res
          .status(200)
          .send({
            status: 'success',
            data: {
              placeCont: placeCont.map((placeCont) => ({
                id: placeCont.placeId,
                uid: placeCont.uid,
                placeImage: placeCont.placeImage,
                placeName: placeCont.placeName,
                placeDesc: placeCont.placeDesc,
                placeMenu: placeCont.placeMenu,
                contact: placeCont.contact,
                lat: placeCont.lat,
                lng: placeCont.lng,
                icon: placeCont.icon,
              })),
            },
          });
    } else {
      return res.status(404).send('Makanan yang Dicari Tidak ada !');
    }
  }).catch((error) => {
    return res.status(400).send('Data gagal dibaca', error);
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
  await dbPlaces.doc(placeId).update(updateContent).then((doc) => {
    if (doc.exists) {
      res.status(200).send('data berhasil di update :', updateContent);
    }
  }).catch((error) => {
    return res.status(400).send('Data gagal diupdate', error);
  });
};

// delete all Place for Admin
const deletePlace = async (req, res) => {
  const {placeId} = req.params;
  await dbPlaces.doc(placeId).delete().whe.then((doc) => {
    if (doc.exists) {
      return res.code(200).send('Data berhasil dihapus');
    } else {
      return res.code(404).send('Data tidak ditemukan');
    }
  }).catch((error) => {
    return res.status(400).send('Data gagal dihapus', error);
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
// const editMyPlaceCont = async (req, res) => {

// };

// // delete UserPlace
// const deleteMyPlaceCont = async (req, res) => {
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
  // editMyPlaceCont,
  // deleteMyPlaceCont,
};
