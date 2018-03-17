# Image recognition

# Team members
Fabian Bächli, Igor Cetkovic, Yvo Keller


# Project 
Create a program on the raspberry pi, that takes every second a picture and evaluates what it is, with the help of the tensorflow api.

## Creating a request to the Vision API

Request-address: https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY

POST Content with link to image:

```json
{
  "requests": [
    {
      "image": {
        "source": {
          "imageUri": "https://storage.googleapis.com/mybucket9751234/demo-image.jpg"
        }
      },
      "features": [
        {
          "type": "LABEL_DETECTION",
          "maxResults": 5
        }
      ]
    }
  ]
}
```

POST Content with 64base coded image string:

```json
{
  "requests":[
    {
      "image":{
        "content":"/9j/7QBEUGhvdG9zaG9...image contents...fXNWzvDEeYxxxzj/Coa6Bax//Z"
      },
      "features":[
        {
          "type":"LABEL_DETECTION",
          "maxResults":5
        }
      ]
    }
  ]
}
```

## Switching Consoles in Raspbian

To be able to run the node Server in the background we used the following:

Press ctrl+f1-f12

It will open a new console where you can start a application and let it run in the background while you are working on Panel F1.




