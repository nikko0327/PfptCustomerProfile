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
        exchange_version: {
            type: String,
            default: ""
        },
        number_of_mail_servers: {
            type: String,
            default: ""
        },
        has_enterprise_CAL: { // checkbox
            type: Boolean,
            default: null
        },
        // !!!
        is_replicating_exchange_and_AD: {
            type: Boolean,
            default: null
        },
        diagram: { // Fileupload???
            type: String,
            default: ""
        },
        is_multi_forest: {
            type: Boolean,
            default: null
        },
        exists_trusts: {
            type: Boolean,
            default: null
        },
        is_resource_forest_arrangement: {
            type: Boolean,
            default: null
        },
        is_using_multi_domains: {
            type: Boolean,
            default: null
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
            type: Boolean,
            default: null
        },
        is_maintaining_azure: {
            type: Boolean,
            default: null
        },
        is_admin_in_AD_or_azure: {
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
            type: Boolean,
            default: null
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
            type: Boolean,
            default: null
        },

        // AD details
        is_multi_forest: {
            type: Boolean,
            default: null
        },
        number_of_forests: {
            type: String,
            default: ""
        },
        exists_trusts: {
            type: Boolean,
            default: null
        },
        is_resource_forest_arrangement: {
            type: Boolean,
            default: null
        },
        is_using_multi_domains:: {
            type: Boolean,
            default: null
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
            type: Boolean,
            default: null
        },

        // O365 details
        O365_version: {
            type: String,
            default: ""
        },
        is_maintaining_on_prem_AD: {
            type: Boolean,
            default: null
        },
        is_maintaining_azure: {
            type: Boolean,
            default: null
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
            type: Boolean,
            default: null
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
            type: Boolean,
            default: null
        },

        // AD details
        is_multi_forest: {
            type: Boolean,
            default: null
        },
        number_of_forests: {
            type: String,
            default: ""
        },
        exists_trusts: {
            type: Boolean,
            default: null
        },
        is_resource_forest_arrangement: {
            type: Boolean,
            default: null
        },
        is_using_multi_domains: {
            type: Boolean,
            default: null
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
            type: Boolean,
            default: null
        },

        // O365 details
        O365_version: {
            type: String,
            default: ""
        },
        is_maintaining_on_prem_AD: {
            type: Boolean,
            default: null
        },
        is_maintaining_azure: {
            type: Boolean,
            default: null
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