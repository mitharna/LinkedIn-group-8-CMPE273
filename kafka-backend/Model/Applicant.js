var mongoose = require("mongoose");
var utility = require("../utility");

var applicantSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  lastName: {
    type: String,
    required: true,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  email: {
    type: String,
    // set: utility.toLower,
    lowercase: true,
    required: true,
    default: ""
  },
  password: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: Number,
    required: false,
    get: v => Math.round(v),
    default: ""
  },
  address: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  city: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  state: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  zipcode: {
    type: Number,
    required: false,
    get: v => Math.round(v),
    default: ""
  },
  experience: [
    {
      title: { type: String, required: false, default: "" },
      company: { type: String, required: false, default: "" },
      location: { type: String, required: false, default: "" },
      description: { type: String, required: false, default: "" },
      from: { type: Date, required: false, default: "" },
      to: { type: Date, required: false, default: "" }
    }
  ],
  education: [
    {
      school: { type: String, required: false, default: "" },
      degreeLevel: { type: String, required: false, default: "" },
      location: { type: String, required: false, default: "" },
      from: { type: Date, required: false, default: "" },
      to: { type: Date, required: false, default: "" }
    }
  ],
  skills: {
    type: Array,
    required: false,
    default: []
  },
  profileSummary: {
    type: String,
    required: false,
    default: ""
  },
  profileimage: {
    type: String,
    required: false,
    default: ""
  },
  resume: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  gender: {
    type: String,
    required: false,
    set: utility.capitalizeFirstLetter,
    default: ""
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  isRecruiter: {
    type: Boolean,
    default: false
  },

  //job id is saved
  savedJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Jobs"
    }
  ],

  connectionsRequests: {
    type: Array,
    required: false,
    defuaut: []
  },
  connections: {
    type: Array,
    required: false,
    defuaut: []
  }
});

module.exports = mongoose.model("Applicants", applicantSchema);