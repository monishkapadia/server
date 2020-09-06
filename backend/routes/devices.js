const router = require("express").Router();
let Device = require("../models/device.model");

router.route("/").get((req, res) => {
  Device.find()
    .then((devices) => res.json(devices))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const DeviceNumber = Number(req.body.DeviceNumber);
  const IPAddress = req.body.IPAddress;
  const dataInterval = Number(req.body.dataInterval);
  const reboot = Number(req.body.reboot);
  const tempUnit = req.body.tempUnit;
  const minTemp = Number(req.body.minTemp);
  const maxTemp = Number(req.body.maxTemp);
  const minHum = Number(req.body.minHum);
  const maxHum = Number(req.body.maxHum);

  const newDevice = new Device({
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

router.route("/:id").get((req, res) => {
  Device.findById(req.params.id)
    .then((device) => res.json(device))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Device.findByIdAndDelete(req.params.id)
    .then(() => res.json("Device deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Device.findById(req.params.id)
    .then((device) => {
      device.DeviceNumber = Number(req.body.DeviceNumber);
      device.IPAddress = req.body.IPAddress;
      device.dataInterval = Number(req.body.dataInterval);
      device.reboot = Number(req.body.reboot);
      device.tempUnit = req.body.tempUnit;
      device.minTemp = Number(req.body.minTemp);
      device.maxTemp = Number(req.body.maxTemp);
      device.minHum = Number(req.body.minHum);
      device.maxHum = Number(req.body.maxHum);

      device
        .save()
        .then(() => res.json("Device updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
