const {
  dbPlaceConts,
} = require('../configs/config');

// Add Place Cont
const addPlaceCont = async (req, res) => {
  const {
    placeId,
    placeName,
    placeImage,
    placeDesc,
    placeMenu,
    contact,
    lat,
    lng,
    icon,
  } = req.body;

  const newPlaceCont = {
    placeId,
    placeName,
    placeImage,
    placeDesc,
    placeMenu,
    contact,
    lat,
    lng,
    icon,
  };

  data.push(newPlaceCont);
  // const uid = ;

  try {
    await dbPlaceConts.doc().set(data);
    res.send('Data User Berhasil Tersimpan');
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const getAllPlaceCont = async (req, res) => {
  const {name} = req.query;
  await dbPlaceConts.get().then((querySnapshot) => {
    const placeConts = [];
    querySnapshot.forEach((doc) => {
      placeConts.push({
        id: doc.id,
        ...doc.data(),
      });
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

    // Display Food by name
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
  }).catch((error) => {
    return res.status(400).send('Data gagal dibaca', error);
  });
};

const getDetailPlaceCont = async (req, res, next) => {
  const {placeId} = req.params;
  const placeCont = [];
  await dbPlaceConts.doc(placeId).get().then((doc) => {
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


const editPlaceCont = async (req, res) => {

};

const deletePlaceCont = async (req, res) => {

};

const myPlace = async (req, res) => {

};

module.exports = {
  addPlaceCont,
  getAllPlaceCont,
  getDetailPlaceCont,
  editPlaceCont,
  deletePlaceCont,
  myPlace,
};
