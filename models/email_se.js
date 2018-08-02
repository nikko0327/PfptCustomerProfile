var mongoose = require("mongoose");
// var Schema = mongoose.Schema;

var email_se_schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    // On prem exchange w/ on prem appliances
    prem_exchange: {
        journaling_location: {
            type: String,
            default: ""
        },
        users_per_location: {
            type: String,
            default: ""
        },
        exchange_version: {
            type: String,
            default: ""
        },
        number_of_mail_servers: {
            type: String,
            default: ""
        },
        has_enterprise_CAL: { // checkbox
            type: String,
            default: ""
        },
        // !!!
        is_replicating_exchange_and_AD: {
            type: String,
            default: ""
        },
        diagram: { // Fileupload???
            type: String,
            default: ""
        },
        is_multi_forest: {
            type: String,
            default: ""
        },
        exists_trusts: {
            type: String,
            default: ""
        },
        is_resource_forest_arrangement: {
            type: String,
            default: ""
        },
        is_using_multi_domains: {
            type: String,
            default: ""
        },
        structure: {
            type: String,
            default: ""
        }
    },

    // O365 (Hosted appliance)
    hosted_O365: {
        O365_version: {
            type: String,
            default: ""
        },
        is_maintaining_on_prem_AD: {
            type: String,
            default: ""
        },
        is_maintaining_azure: {
            type: String,
            default: ""
        },
        is_admin_in_AD_or_azure: { //dropdown
            type: String,
            default: ""
        },
        sync_tools: {
            type: String,
            default: ""
        },
        which_O365: { // dropdown
            type: String,
            default: ""
        }
    },

    // On-prem exchange + O365 (on prem appliance)
    prem_exchange_prem_O365: {
        // Exchange details
        exchange_version: {
            type: String,
            default: ""
        },
        number_of_mail_servers: {
            type: String,
            default: ""
        },
        has_enterprise_CAL: {
            type: String,
            default: ""
        },
        describe_exchange_env: {
            type: String,
            default: ""
        },
        diagram: {
            type: String,
            default: ""
        },
        is_using_DAG: {
            type: String,
            default: ""
        },

        // AD details
        is_multi_forest: {
            type: String,
            default: ""
        },
        number_of_forests: {
            type: String,
            default: ""
        },
        exists_trusts: {
            type: String,
            default: ""
        },
        is_resource_forest_arrangement: {
            type: String,
            default: ""
        },
        is_using_multi_domains: {
            type: String,
            default: ""
        },
        multi_domain_structure: {
            type: String,
            default: ""
        },
        resource_forest_deployment: {
            type: String,
            default: ""
        },
        AD_size: {
            type: String,
            default: ""
        },
        require_ldap: {
            type: String,
            default: ""
        },

        // O365 details
        O365_version: {
            type: String,
            default: ""
        },
        is_maintaining_on_prem_AD: {
            type: String,
            default: ""
        },
        is_maintaining_azure: {
            type: String,
            default: ""
        },
        is_admin_in_AD_or_azure: {
            type: String,
            default: ""
        },
        sync_tools: {
            type: String,
            default: ""
        },
        which_O365: {
            type: String,
            default: ""
        }
    },

    prem_exchange_hosted_O365: {
        // Exchange details
        exchange_version: {
            type: String,
            default: ""
        },
        number_of_mail_servers: {
            type: String,
            default: ""
        },
        has_enterprise_CAL: {
            type: String,
            default: ""
        },
        // !!!
        describe_exchange_env: {
            type: String,
            default: ""
        },
        diagram: {
            type: String,
            default: ""
        },
        is_using_DAG: {
            type: String,
            default: ""
        },

        // AD details
        is_multi_forest: {
            type: String,
            default: ""
        },
        number_of_forests: {
            type: String,
            default: ""
        },
        exists_trusts: {
            type: String,
            default: ""
        },
        is_resource_forest_arrangement: {
            type: String,
            default: ""
        },
        is_using_multi_domains: {
            type: String,
            default: ""
        },
        structure: {
            type: String,
            default: ""
        },
        resource_forest_deployment: {
            type: String,
            default: ""
        },
        AD_size: {
            type: String,
            default: ""
        },
        require_ldap: {
            type: String,
            default: ""
        },

        // O365 details
        O365_version: {
            type: String,
            default: ""
        },
        is_maintaining_on_prem_AD: {
            type: String,
            default: ""
        },
        is_maintaining_azure: {
            type: String,
            default: ""
        },
        is_admin_in_AD_or_azure: {
            type: String,
            default: ""
        },
        sync_tools: {
            type: String,
            default: ""
        },
        which_O365: {
            type: String,
            default: ""
        }
    }
});

var EmailSEQuestions = mongoose.model("EmailSEQuestions", email_se_schema);

// var newCustomer = new EmailSEQuestions({
//     _id: "Tesla"
// });
//
// newCustomer.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Successfully created SE email questions for customer: " + result["_id"]);
//     }
// });

module.exports = EmailSEQuestions;