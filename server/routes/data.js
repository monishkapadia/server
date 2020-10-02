const router = require("express").Router();
let Data = require("../models/data.model");

router.route("/").get((req, res) => {
  Data.find().sort({ 'time': 'desc' })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const DeviceNumber = req.body.DeviceNumber;
  const UUID = req.body.UUID;
  const IPAddress = req.body.IPAddress;
  const temp = req.body.temp;
  const temp_unit = req.body.temp_unit;
  const humidity = req.body.humidity;
  const humidity_unit = req.body.humidity_unit;
  const lat = req.body.lat;
  const lon = req.body.lon;
  const time = req.body.time;

  const newData = new Data({
    DeviceNumber,
    UUID,
    IPAddress,
    temp,
    temp_unit,
    humidity,
    humidity_unit,
    lat,
    lon,
    time,
  });
  req.io.emit(UUID, JSON.stringify(newData));
  newData
    .save()
    .then(() => res.json("Data added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:uuid").get((req, res) => {
  Data.find({ UUID: req.params.uuid })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
