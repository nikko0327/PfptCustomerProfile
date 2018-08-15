var mongoose = require("mongoose");

var appliance_schema = new mongoose.Schema({
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
    // ui_logins_per_day: {
    //     type: String,
    //     default: ""
    // },
    exports_per_month: {
        type: String,
        default: ""
    },
    avg_export_size: {
        type: String,
        default: ""
    },
    AD_size: {
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
    DR_footprint: {
        type: String,
        default: ""
    },
    // purposes: {
    //     type: String,
    //     default: ""
    // },
    purposes: {
        ui: {
            type: String,
            default: ""
        },
        export: {
            type: String,
            default: ""
        },
        archiving: {
            type: String,
            default: ""
        },
        stubbing: {
            type: String,
            default: ""
        }
    },
    archive_proxy: {
        type: String,
        default: ""
    },
    transport_agent: {
        type: String,
        default: ""
    },
    outlook_view_manager: {
        type: String,
        default: ""
    },
    comments: {
        type: String,
        default: ""
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