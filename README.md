# image recognition

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
