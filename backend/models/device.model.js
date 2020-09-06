const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deviceSchema = new Schema(
  {
    DeviceNumber: { type: Number, required: true, unique: true },
    IPAddress: { type: String, required: true },
    dataInterval: { type: Number, required: true },
    reboot: { type: Number, required: true, minimum: 0, maximum: 1 },
    tempUnit: { type: String, required: true, maxlength: 1 },
    minTemp: { type: Number, required: true },
    maxTemp: { type: Number, required: true },
    minHum: { type: Number, required: true },
    maxHum: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
