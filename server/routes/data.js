const router = require("express").Router();
let Data = require("../models/data.model");

router.route("/").get((req, res) => {
  Data.find().sort({ 'time': 'desc' })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/distinct").get((req, res) => {
  Data.aggregate([
    {
      $group: {
        _id: '$UUID',
        "IPAddress": { "$last": "$IPAddress" },
        "temp": { "$last": "$temp" },
        "temp_unit": { "$last": "$temp_unit" },
        "humidity": { "$last": "$humidity" },
        "lat": { "$last": "$lat" },
        "lon": { "$last": "$lon" },
        "time": { "$last": "$time" }
      }
    },
    { $sort: { "_id": -1 } }
  ]).exec((err, data) => {
    if (err) res.status(400).json("Error: " + err);
    res.json(data);
  })
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
  Data.find({ UUID: req.params.uuid }).sort({ 'time': 'desc' })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/charts/:uuid").get((req, res) => {
  var newTime = new Date();
  newTime.setDate(newTime.getDate() - parseInt(req.query.time));

  Data.find({ UUID: req.params.uuid, time: { $gte: newTime } })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
