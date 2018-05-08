var mongoose = require("mongoose");

var appliance_schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    messages_per_day: {
        type: String,
        default: null
    },
    avg_message_size: {
        type: String,
        default: null
    },
    number_of_mailboxes: {
        type: String,
        default: null
    },
    searches_per_day: {
        type: String,
        default: null
    },
    ui_logins_per_day: {
        type: String,
        default: null
    },
    exports_per_day: {
        type: String,
        default: null
    },
    avg_export_size: {
        type: String,
        default: null
    },
    AD_size: {
        type: String,
        default: null
    },
    appliance_preference: {
        type: String,
        enum: [null, "Virtual", "Hardware"],
        default: null
    },
    has_vmware_env: {
        type: String,
        enum: [null, "Yes", "No"],
        default: null
    },
    number_of_appliance_recommended: {
        type: String,
        default: null
    },
    DR_footprint: {
        type: String,
        default: null
    },
    purposes: {
        type: [String],
        default: null
    },
    has_archive_proxy: {
        type: String,
        enum: [null, "Yes", "No"],
        default: null
    },
    transport_agent: {
        type: String,
        default: null
    },
    outlook_view_manager: {
        type: String,
        default: null
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