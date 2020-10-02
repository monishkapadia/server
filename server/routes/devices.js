const router = require("express").Router();
let Device = require("../models/device.model");

// var mqtt = require('mqtt')
// var client = mqtt.connect('mqtt://localhost:1883')
// var topic = 'Monish'
// var message = 'Hello World!'

router.route("/").get((req, res) => {
  Device.find()
    .then((devices) => res.json(devices))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const UUID = req.body.UUID;
  const DeviceNumber = req.body.DeviceNumber;
  const IPAddress = req.body.IPAddress;
  const dataInterval = req.body.dataInterval;
  const reboot = req.body.reboot;
  const tempUnit = req.body.tempUnit;
  const minTemp = req.body.minTemp;
  const maxTemp = req.body.maxTemp;
  const minHum = req.body.minHum;
  const maxHum = req.body.maxHum;

  const newDevice = new Device({
    UUID,
    DeviceNumber,
    IPAddress,
    dataInterval,
    reboot,
    tempUnit,
    minTemp,
    maxTemp,
    minHum,
    maxHum,
  });

  newDevice
    .save()
    .then(() => res.json("Device added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:uuid").get((req, res) => {
  Device.findOne({ UUID: req.params.uuid })
    .then((device) => res.json(device))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:uuid").delete((req, res) => {
  Device.findOneAndDelete({ UUID: req.params.uuid })
    .then(() => res.json("Device deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update").post((req, res) => {
  Device.findOne({ UUID: req.body.UUID })
    .then((device) => {
      device.UUID = req.body.UUID;
      device.DeviceNumber = req.body.DeviceNumber;
      device.IPAddress = req.body.IPAddress;
      device.dataInterval = req.body.dataInterval;
      device.reboot = req.body.reboot;
      device.tempUnit = req.body.tempUnit;
      device.minTemp = req.body.minTemp;
      device.maxTemp = req.body.maxTemp;
      device.minHum = req.body.minHum;
      device.maxHum = req.body.maxHum;
      // client.publish(topic, JSON.stringify(device))
      // console.log('Message sent!', JSON.stringify(device))
      device
        .save()
        .then(() => res.json("Device updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
