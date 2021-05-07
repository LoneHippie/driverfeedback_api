# Driver Feedback API v1

A simple MongoDB/Express CRUD API with routes for getting and creating entries for drivers by liscense plate number.
Each entry has a license plate number and a country/state. Comments, warnings and general feedback can be created for drivers by anyone.

## Overview

This API makes use of basic model/controller/router architecture with the entry point being **server.js.** Configurations, global middlewares and routes are implimented in **app.js.**

> server.js <-- app.js <-- Error handling (AppError.js, errorController.js) and routers (commentRouter.js, driverRouter.js)

## Documentation

__Get all drivers__

> https://driverfeedback.herokuapp.com/api/v1/drivers

Results can also be filtered according to country or state:

> https://driverfeedback.herokuapp.com/api/v1/drivers?country=USA
> https://driverfeedback.herokuapp.com/api/v1/drivers?state=MI

__Get all comments__

> https://driverfeedback.herokuapp.com/api/v1/comments

__Get driver or comment by id__

> https://driverfeedback.herokuapp.com/api/v1/drivers/6094dc7cae0a9718413deb1d
> https://driverfeedback.herokuapp.com/api/v1/comments/6094dd84ae0a9718413deb1f

__Get all comments for driver by driver id__

> https://driverfeedback.herokuapp.com/api/v1/drivers/6094dc7cae0a9718413deb1d/comments

## Data response examples

__GET all drivers__

```
{
  "status": "success",
  "results": 5,
  "data": {
    "data": [
      {
        "_id": "6094dc7cae0a9718413deb1d",
        "plateNumber": "YKH 156",
        "country": "USA",
        "state": "LA",
        "id": "6094dc7cae0a9718413deb1d"
      },
      {
        "_id": "6094dbd059cdee17b2035526",
        "plateNumber": "SBL-214",
        "country": "USA",
        "state": "OR",
        "id": "6094dbd059cdee17b2035526"
      },
      {
        "_id": "6094dbf459cdee17b2035527",
        "plateNumber": "18-2714F",
        "country": "USA",
        "state": "MT",
        "id": "6094dbf459cdee17b2035527"
      },
      {
        "_id": "6094dc2d59cdee17b2035528",
        "plateNumber": "VGU E4151",
        "country": "USA",
        "state": "MI",
        "id": "6094dc2d59cdee17b2035528"
      },
      {
        "_id": "6094dc3959cdee17b2035529",
        "plateNumber": "SXX A7781",
        "country": "USA",
        "state": "MI",
        "id": "6094dc3959cdee17b2035529"
      }
    ]
  }
}
```

__GET driver by id__

```
{
  "status": "success",
  "data": {
    "data": {
      "_id": "6094dc7cae0a9718413deb1d",
      "plateNumber": "YKH 156",
      "country": "USA",
      "state": "LA",
      "__v": 0,
      "comments": [
        {
          "_id": "6094dd84ae0a9718413deb1f",
          "comment": "Break light not working",
          "commentType": "car issue",
          "driver": "6094dc7cae0a9718413deb1d",
          "__v": 0,
          "id": "6094dd84ae0a9718413deb1f"
        },
        {
          "_id": "6094de2fae0a9718413deb20",
          "comment": "Blocked entrance to parking lot",
          "commentType": "parking",
          "driver": "6094dc7cae0a9718413deb1d",
          "__v": 0,
          "id": "6094de2fae0a9718413deb20"
        },
        {
          "_id": "6094e19def43e91b22a0728a",
          "comment": "merged lanes without signaling",
          "commentType": "driver issue",
          "driver": "6094dc7cae0a9718413deb1d",
          "__v": 0,
          "id": "6094e19def43e91b22a0728a"
        }
      ],
      "id": "6094dc7cae0a9718413deb1d"
    }
  }
}
```