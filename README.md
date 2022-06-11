# Backend Foedtra

This Repository conatains a Backend Documenation for Foedtra App
# 
![Backend Image](https://github.com/Foedtra/PROFILE-C22-PS209-Product-Based-Capstone/blob/main/CC/Google%20Cloud%20Foedtra%20Final%201%20_%20For%20Backend.png?raw=true)
## 

## Documentation for Developing this Backend
- javascript : https://www.javascript.com/
- Node JS : https://nodejs.org/
- Express JS : https://expressjs.com/
- Firebase SDK : https://firebase.google.com/docs/admin/setup
- Firebase Auth : https://firebase.google.com/docs/auth
- Cloud Firestore Native : https://firebase.google.com/docs/firestore
- Google Maps API : https://developers.google.com/maps
- Google Secret Manager : https://cloud.google.com/secret-manager
- Google Cloud Build : https://cloud.google.com/build
- Google Cloud Run : https://cloud.google.com/run
- Terraform : https://www.terraform.io/

## Configure Firestore

## Deploy

## Verify Token Firebase Auth

## Header : 
### ```Authorization : Bearer {tokenId}```

 # HTTP request methods & URL PATH
## Place

### ```POST   /places```
 #### Content-Type: application/json
 ```
 ```
  #### Result:
```
{
 food place stored successfully
}
```
### ```GET   /places```
 #### Result:
 ```
```
### ```GET   /places?name=```
 #### Result:
 ```
```
### ```GET   /places/:placeId```
 #### Result:
 ```
```
### ```PATCH   /places/:placeId```
 #### Content-Type: application/json
 ```
 ```
 #### Result:
 ```
```
### ```DELETE   /places/:placeId```

## Food
### ```POST   /foods```
 #### Content-Type: application/json
 ```
 ```
#### Result:
 ```
```
### ```GET   /foods```
#### Result:
 ```

 {
    "status": "success",
    "data": {
        "foods": [
         {
          "asalProvinsi": "Jawa Tengah",
          "deskripsi": "Minuman khas Jawa yang terbuat dari tepung beras ataupun tepung beras ketan, disajikan dengan es parut serta gula merah cair dan santan. Rasa minuman ini manis dan gurih.",
          "linkArtikel": "https://id.wikipedia.org/wiki/Dawet",
          "namaMakanan": "Es Dawet"
         }
        ]
    },
    ...
}
```
### ```GET   /foods?name=```
#### Result:
 ```
```
### ```GET   /foods?from=```
#### Result:
 ```
```
### ```GET   /foods/:foodId```
#### Result:
 ```

```
## Predict
### ```POST   /predict```
 #### Content-Type: application/json
 ```
 {
  "image" : "{image in base64 format}",
  "lat" : "{latitude}",
  "lng" : "{longtitude}"
 }
 ```
#### Result:
 ```
{
    "asalProvinsi": "Jawa Tengah",
    "deskripsi": "Jamu Kunyit asam adalah jamu yang berbahan dasar kunyit, dan asam jawa yang konon berkhasiat untuk menyegarkan tubuh atau dapat membuat tubuh menjadi dingin.",
    "keyword": "kunyit_asam",
    "linkArtikel": "https://id.wikipedia.org/wiki/Kunir_asem",
    "namaMakanan": "Kunyit Asam",
    "restaurants": [
        {
            "name": "Pecel Pincuk Bu Ida",
            "geometry": {
                "location": {
                    "lat": -6.352490899999999,
                    "lng": 106.9639982
                },
                "viewport": {
                    "northeast": {
                        "lat": -6.351092720107277,
                        "lng": 106.9653892298927
                    },
                    "southwest": {
                        "lat": -6.353792379892721,
                        "lng": 106.9626895701073
                    }
                }
            },
            "place_id": "ChIJ-3ANa6GTaS4R8pAVkcM6z5k",
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            "distance": 3.6
        },
        {
            "name": "Pawon Jawa Timuran",
            "geometry": {
                "location": {
                    "lat": -6.3946662,
                    "lng": 106.9349105
                },
                "viewport": {
                    "northeast": {
                        "lat": -6.393255820107277,
                        "lng": 106.9362566298927
                    },
                    "southwest": {
                        "lat": -6.395955479892721,
                        "lng": 106.9335569701073
                    }
                }
            },
            "place_id": "ChIJdTMps0-VaS4Rpbh-LKksJIA",
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            "distance": 4.5
        },
    ]
}
```

