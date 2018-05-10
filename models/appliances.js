var mongoose = require("mongoose");

var appliance_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    messages_per_day: {
        type: String,
        default: "No response set"
    },
    avg_message_size: {
        type: String,
        default: "No response set"
    },
    number_of_mailboxes: {
        type: String,
        default: "No response set"
    },
    searches_per_day: {
        type: String,
        default: "No response set"
    },
    ui_logins_per_day: {
        type: String,
        default: "No response set"
    },
    exports_per_day: {
        type: String,
        default: "No response set"
    },
    avg_export_size: {
        type: String,
        default: "No response set"
    },
    AD_size: {
        type: String,
        default: "No response set"
    },
    appliance_preference: {
        type: String,
        default: "No response set"
    },
    has_vmware_env: {
        type: String,
        default: "No response set"
    },
    number_of_appliance_recommended: {
        type: String,
        default: "No response set"
    },
    DR_footprint: {
        type: String,
        default: "No response set"
    },
    purposes: {
        type: String,
        default: "No response set"
    },
    has_archive_proxy: {
        type: String,
        default: "No response set"
    },
    transport_agent: {
        type: String,
        default: "No response set"
    },
    outlook_view_manager: {
        type: String,
        default: "No response set"
    }
});

var ApplianceQuestions = mongoose.model("ApplianceQuestions", appliance_schema);

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

module.exports = ApplianceQuestions;