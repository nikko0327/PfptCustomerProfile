var mongoose = require("mongoose");
// var Schema = mongoose.Schema;

var desktop_network_schema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    network_security: {
        allow_outside_access: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        DMZ: {
            type: String,
            default: null
        },
        firewalls: {
            type: String,
            default: null
        },
        require_vpn: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        load_balancer_VIP: {
            type: String,
            default: null
        },
        nat_IP_list: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        proxy_servers: {
            type: String,
            default: null
        }
    },
    end_user_desktop_env: {
        browsers: { // One or more strings, Chrome/Firefox/IE/Edge
            type: [String],
            default: null
        },
        browser_versions: {
            type: [String],
            default: null
        },
        ie11: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        ie11_compatibility: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_ie11_enterprise: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_popups_enabled: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_OWA_used: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        }
        // browsers_access: { // One or more strings, Chrome/Firefox/IE/Edge
        //     type: [String],
        //     default: null
        // },
    },
    disaster_recovery: {
        is_replicating_exchange_and_AD: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        config_description: {
            type: String,
            default: null
        },
        diagram: {
            type: String,
            default: null
        }
    }
    // Authentication (SAML & Remote Auth) not shown in page
});

var DesktopNetworkQuestions = mongoose.model("DesktopNetworkQuestions", desktop_network_schema);

// var newCustomer = new DesktopNetworkQuestions({
//     _id: "Tesla"
// });
//
// newCustomer.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Successfully created desktop network questions for customer: " + result["_id"]);
//     }
// });

module.exports = DesktopNetworkQuestions;