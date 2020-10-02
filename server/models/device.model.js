const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deviceSchema = new Schema(
  {
    UUID: { type: String, required: true, unique: true },
    DeviceNumber: { type: String, required: true, unique: true },
    IPAddress: { type: String, required: true, match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ },
    dataInterval: { type: String, required: true },
    reboot: { type: String, required: true, enum: ["0", "1"] },
    tempUnit: { type: String, required: true, enum: ["C", "F"], uppercase: true },
    minTemp: { type: String, required: true },
    maxTemp: { type: String, required: true },
    minHum: { type: String, required: true },
    maxHum: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
