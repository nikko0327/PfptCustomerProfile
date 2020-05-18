var mongoose = require("mongoose");

var connector_platform_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    facebook: {
        type: Boolean,
        default: false
    },
    facebook_number_of_users: {
      type: String,
      default: ""
    },
    linkedin: {
        type: Boolean,
        default: false
    },
    linkedin_number_of_users: {
      type: String,
      default: ""
    },
    twitter: {
        type: Boolean,
        default: false
    },
    twitter_number_of_users: {
      type: String,
      default: ""
    },
    google: {
        type: Boolean,
        default: false
    },
    google_number_of_users: {
      type: String,
      default: ""
    },
    youtube: {
        type: Boolean,
        default: false
    },
    youtube_number_of_users: {
      type: String,
      default: ""
    },
    files: {
        type: Boolean,
        default: false
    },
    files_number_of_users: {
      type: String,
      default: ""
    },
    skype_in_cloud: {
        type: Boolean,
        default: false
    },
    skype_in_cloud_number_of_users: {
      type: String,
      default: ""
    },
    skype_on_prem: {
        type: Boolean,
        default: false
    },
    skype_on_prem_number_of_users: {
      type: String,
      default: ""
    },
    sharepoint: {
      type: Boolean,
      default: false
    },
    sharepoint_number_of_users: {
      type: String,
      default: ""
    },
    lync_on_prem: {
        type: Boolean,
        default: false
    },
    teams: {
      type: Boolean,
      default: false
    },
    teams_number_of_users: {
      type: String,
      default: ""
    },
    lync_on_prem_number_of_users: {
      type: String,
      default: ""
    },
    one_drive: {
        type: Boolean,
        default: false
    },
    one_drive_number_of_users: {
      type: String,
      default: ""
    },
    box: {
        type: Boolean,
        default: false
    },
    box_number_of_users: {
      type: String,
      default: ""
    },
    bloomberg: {
        type: Boolean,
        default: false
    },
    bloomberg_number_of_users: {
      type: String,
      default: ""
    },
    yammer: {
        type: Boolean,
        default: false
    },
    yammer_number_of_users: {
      type: String,
      default: ""
    },
    jive: {
        type: Boolean,
        default: false
    },
    jive_number_of_users: {
      type: String,
      default: ""
    },
    chatter: {
        type: Boolean,
        default: false
    },
    chatter_number_of_users: {
      type: String,
      default: ""
    },
    slack: {
        type: Boolean,
        default: false
    },
    slack_number_of_users: {
      type: String,
      default: ""
    },
    symphony: {
        type: Boolean,
        default: false
    },
    symphony_number_of_users: {
      type: String,
      default: ""
    },
    zoom: {
      type: Boolean,
      default: false
    },
    zoom_number_of_users: {
      type: String,
      default: ""
    },
    comments: {
        type: String,
        default: ""
    }
});
var connector_platform_versions_schema = new mongoose.Schema({
  refId: mongoose.Schema.Types.ObjectId,
  versions: [connector_platform_schema]
});

var ConnectorPlatformQuestions = mongoose.model("ConnectorPlatformQuestions", connector_platform_schema);
var ConnectorPlatformQuestionsVersions = mongoose.model("ConnectorPlatformQuestionsVersions", connector_platform_versions_schema);

// var sample = new OtherDataSourcesQuestions({
//     _id: "Tesla"
// });
//
// sample.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Inserted other data source questions for customer: " + result["_id"]);
//     }
// });


module.exports = {ConnectorPlatformQuestions, ConnectorPlatformQuestionsVersions};
