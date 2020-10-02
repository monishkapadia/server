const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    DeviceNumber: {type: Number, required: true},
    UUID: {type: String, required: true},
    IPAddress: { type: String, required: true, match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ },
    temp: {type: Number, required: true},
    temp_unit: { type: String, required: true, enum: ["C", "F"], uppercase: true },
    humidity: {type: Number, required: true},
    humidity_unit: { type: String, required: true, enum: ["%"]},
    lat: {type: Number, required: true},
    lon: {type: Number, required: true},
    time: {type: Date, required: true},
  }
);

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
