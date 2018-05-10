var mongoose = require("mongoose");
// var Schema = mongoose.Schema;

var desktop_network_schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    network_security: {
        allow_outside_access: {
            type: String,
            default: "No response set"
        },
        DMZ: {
            type: String,
            default: "No response set"
        },
        firewalls: {
            type: String,
            default: "No response set"
        },
        require_vpn: {
            type: String,
            default: "No response set"
        },
        load_balancer_VIP: {
            type: String,
            default: "No response set"
        },
        nat_IP_list: {
            type: String,
            default: "No response set"
        },
        proxy_servers: {
            type: String,
            default: "No response set"
        }
    },
    end_user_desktop_env: {
        browsers: { // One or more strings, Chrome/Firefox/IE/Edge
            type: String,
            default: "No response set"
        },
        browser_versions: {
            type: String,
            default: "No response set"
        },
        ie11: {
            type: String,
            default: "No response set"
        },
        ie11_compatibility: {
            type: String,
            default: "No response set"
        },
        is_ie11_enterprise: {
            type: String,
            default: "No response set"
        },
        is_popups_enabled: {
            type: String,
            default: "No response set"
        },
        is_OWA_used: {
            type: String,
            default: "No response set"
        },
        browsers_access: { // One or more strings, Chrome/Firefox/IE/Edge
            type: String,
            default: "No response set"
        }
    },
    disaster_recovery: {
        is_replicating_exchange_and_AD: {
            type: String,
            default: "No response set"
        },
        config_description: {
            type: String,
            default: "No response set"
        },
        diagram: {
            type: String,
            default: "No response set"
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