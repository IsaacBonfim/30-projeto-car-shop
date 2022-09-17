const carMock = {
  "model": "Ford Ka",
  "year": 2017,
  "color": "black",
  "status": false,
  "buyValue": 0,
  "doorsQty": 2,
  "seatsQty": 4,
}

const carMockWithId = {
  "_id": "631edc497e4a75f06d803c77",
  "model": "Ford Ka",
  "year": 2017,
  "color": "black",
  "status": false,
  "buyValue": 0,
  "doorsQty": 2,
  "seatsQty": 4,
  "__v": 0,
}

const carMockUpdate = {
  "_id": "631edc497e4a75f06d803c77",
  "model": "Ford Ka",
  "year": 2017,
  "color": "black",
  "status": true,
  "buyValue": 9000,
  "doorsQty": 2,
  "seatsQty": 4,
  "__v": 0,
}

const carsMock = [
  {
    "_id": "631edc497e4a75f06d803c77",
    "model": "Ford Ka",
    "year": 2017,
    "color": "black",
    "status": false,
    "buyValue": 0,
    "doorsQty": 2,
    "seatsQty": 4,
    "__v": 0
  },
  {
    "_id": "631eddcde6a4b59fde61104e",
    "model": "Nissan Versa",
    "year": 2020,
    "color": "white",
    "status": false,
    "buyValue": 0,
    "doorsQty": 4,
    "seatsQty": 5,
    "__v": 0
  },
  {
    "_id": "631edddee6a4b59fde611050",
    "model": "Prisma",
    "year": 2018,
    "color": "silver",
    "status": false,
    "buyValue": 0,
    "doorsQty": 4,
    "seatsQty": 5,
    "__v": 0
  },
  {
    "_id": "631eddf0e6a4b59fde611052",
    "model": "Bettle",
    "year": 1974,
    "color": "Ocre",
    "status": false,
    "buyValue": 0,
    "doorsQty": 2,
    "seatsQty": 4,
    "__v": 0
  }
]

export {
  carMock,
  carMockWithId,
  carMockUpdate,
  carsMock,
}
