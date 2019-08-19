var mongoose = require("mongoose");

var sizing_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    messages_per_day: {
        type: String,
        default: ""
    },
    avg_message_size: {
        type: String,
        default: ""
    },
    number_of_mailboxes: {
        type: String,
        default: ""
    },
    exports_per_month: {
        type: String,
        default: ""
    },
    avg_export_size: {
        type: String,
        default: ""
    },
    appliance_preference: {
        type: String,
        default: ""
    },
    has_vmware_env: {
        type: String,
        default: ""
    },
    number_of_appliance_recommended: {
        type: String,
        default: ""
    },
    mail_system_HA_DR_footprint: {
        type: String,
        default: ""
    },
    comments: {
        type: String,
        default: ""
    }
});
var sizing_versions_schema = new mongoose.Schema({
  refId: mongoose.Schema.Types.ObjectId,
  versions: [sizing_schema]
});

var SizingQuestions = mongoose.model("SizingQuestions", sizing_schema);
var SizingQuestionsVersions = mongoose.model("SizingQuestionsVersions", sizing_versions_schema);

// var sample = new ApplianceQuestions({
//     _id: "Tesla"
// });
//
// sample.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Successfully created appliance questions for customer: " + result["_id"]);
//     }
// });

module.exports = {SizingQuestions, SizingQuestionsVersions};
