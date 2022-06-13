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
![Backend Image](https://github.com/Foedtra/PROFILE-C22-PS209-Product-Based-Capstone/blob/main/CC/Frame%2021%20(1).png?raw=true)
terraform init
trraform plan
terraform apply


## Verify Token Firebase Auth


 # HTTP request methods & URL PATH
## Header : 
### ```Authorization : Bearer {tokenId}```
 ## Predict
### ```POST   /predict```
 #### Content-Type: application/json
 #### Body :
 ```
 {
  "image" : "{{image in base64 format}}",
  "lat" : "{{latitude}}",
  "lng" : "{{longtitude}}"
 }
 ```
#### Response :
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
## Food
### ```POST   /foods```
 #### Content-Type: application/json
 #### Body :
 ```
 {
    "namaMakanan": "{{namaMakanan}}",
    "asalProvinsi": "{{asalProvinsi}}",
    "deskripsi": "{{deskripsi}}",
    "linkArtikel": "{{linkArtike}}"
}
 ```
#### Response :
 ```
{
    "status": "success",
    "message": "Food stored successfully"
}
```
### ```GET   /foods```
#### Response :
 ```
 {
    "status": "success",
    "data": {
        "foods": [
            ...
            {
                "id": "4",
                "name": "Bika Ambon",
                "from": "Sumatera Utara"
            },
            {
                "id": "5",
                "name": "Bir Pletok",
                "from": "DKI Jakarta"
            },
            {
                "id": "6",
                "name": "Bubur Manado",
                "from": "Sulawesi Utara"
            },
            ...
        ]
    }
}
```
### ```GET   /foods?name=```
#### Response :
 ```
 {
    "status": "success",
    "data": {
        "foods": [
            {
                "id": "17",
                "name": "Kunyit Asam",
                "from": "Jawa Tengah"
            }
        ]
    }
}
```
### ```GET   /foods?from=```
#### Response :
 ```
 {
    "status": "success",
    "data": {
        "foods": [
            {
                "id": "17",
                "name": "Kunyit Asam",
                "from": "Jawa Tengah"
            },
            {
                "id": "19",
                "name": "Lumpia Semarang",
                "from": "Jawa Timur"
            },
            {
                "id": "8",
                "name": "Es Dawet",
                "from": "Jawa Tengah"
            },
            ...
        ]
    }
}
```
### ```GET   /foods/:foodId```
#### Response :
 ```
{
    "status": "success",
    "data": {
        "food": [
            {
                "id": "8",
                "name": "Es Dawet",
                "from": "Jawa Tengah",
                "desc": "Minuman khas Jawa yang terbuat dari tepung beras ataupun tepung beras ketan, disajikan dengan es parut serta gula merah cair dan santan. Rasa minuman ini manis dan gurih.",
                "source": "https://id.wikipedia.org/wiki/Dawet"
            }
        ]
    }
}
```
## Place

### ```POST   /places```
 #### Content-Type: application/json
 #### Body :
 ```
{
    "placeName": "{{placeName}}",
    "placeImage": "{{placeImage}}",
    "placeDesc": "{{placeDesc}}",
    "placeMenu": [
        {
            "menuName": "2 Pcs Ayam Betutu + Rice",
            "menuPrice": "35000"
        },
        {
            "menuName": "2 Pcs Ayam Betutu",
            "menuPrice": "30000"
        },
        {
            "menuName": "1 Ayam Betutu",
            "menuPrice": "100000"
        }
    ],
    "contact": "{{contact}}",
    "lat": "{{lat}}",
    "lng": "{{lng}}"
}
 ```
  #### Response :
```
{
    "status" : "success"
    "message" : "food place stored successfully"
}
```
### ```GET   /places```
 #### Response :
 ```
 {
    "status": "success",
    "data": {
        "places": [
            {
                "id": "QGzk95ufekaZojUoSyW6",
                "uid": "4pLM3IMRYVgbaZm9giQYrORuXBT2",
                "placeName": "Ayam Betutu Pak dadang",
                "lat": "-6.383480",
                "lng": "106.974036",
                "icon": "https://firebasestorage.googleapis.com/v0/b/foedtra-app.appspot.com/o/Location.png?alt=media&token=8ba1d63e-a698-4f39-87cf-4c8b7bd1c01a"
            }
        ]
    }
}
```
### ```GET   /places?name=```
 #### Response :
 ```
 {
    "status": "success",
    "data": {
        "foods": [
            {
                "id": "QGzk95ufekaZojUoSyW6",
                "placeName": "Ayam Betutu Pak dadang",
                "lat": "-6.383480",
                "lng": "106.974036"
            }
        ]
    }
}
```
### ```GET   /places/:placeId```
 #### Response :
 ```
 {
    "status": "success",
    "data": {
        "place": [
            {
                "id": "QGzk95ufekaZojUoSyW6",
                "uid": "4pLM3IMRYVgbaZm9giQYrORuXBT2",
                "placeImage": "https://firebasestorage.googleapis.com/v0/b/foedtra-app.appspot.com/o/Location.png?alt=media&token=8ba1d63e-a698-4f39-87cf-4c8b7bd1c01a",
                "placeName": "Ayam Betutu Pak dadang",
                "placeDesc": "Menjual berbagai olahan ayam",
                "placeMenu": "",
                "contact"
                "lat": "-6.383480",
                "lng": "106.974036"
            }
        ]
    }
}
```
### ```PATCH   /places/:placeId```
 #### Content-Type: application/json
 #### Body :
 ```
 ```
 #### Response :
 ```
```
### ```DELETE   /places/:placeId```

