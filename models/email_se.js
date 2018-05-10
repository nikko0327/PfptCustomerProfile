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
            default: "No response set"
        },
        number_of_mail_servers: {
            type: String,
            default: "No response set"
        },
        has_enterprise_CAL: {
            type: String,
            default: "No response set"
        },
        // !!!
        is_replicating_exchange_and_AD: {
            type: String,
            default: "No response set"
        },
        diagram: {
            type: String,
            default: "No response set"
        },
        is_multi_forest: {
            type: String,
            default: "No response set"
        },
        exists_trusts: {
            type: String,
            default: "No response set"
        },
        is_resource_forest_arrangement: {
            type: String,
            default: "No response set"
        },
        is_using_multi_domains: {
            type: String,
            default: "No response set"
        },
        structure: {
            type: String,
            default: "No response set"
        }
    },

    // O365 (Hosted appliance)
    hosted_O365: {
        O365_version: {
            type: String,
            default: "No response set"
        },
        is_maintaining_on_prem_AD: {
            type: String,
            default: "No response set"
        },
        is_maintaining_azure: {
            type: String,
            default: "No response set"
        },
        is_admin_in_AD_or_azure: {
            type: String,
            default: "No response set"
        },
        sync_tools: {
            type: String,
            default: "No response set"
        },
        which_O365: {
            type: String,
            default: "No response set"
        }
    },

    // On-prem exchange + O365 (on prem appliance)
    prem_exchange_prem_O365: {
        // Exchange details
        exchange_version: {
            type: String,
            default: "No response set"
        },
        number_of_mail_servers: {
            type: String,
            default: "No response set"
        },
        has_enterprise_CAL: {
            type: String,
            default: "No response set"
        },
        describe_exchange_env: {
            type: String,
            default: "No response set"
        },
        diagram: {
            type: String,
            default: "No response set"
        },
        is_using_DAG: {
            type: String,
            default: "No response set"
        },

        // AD details
        is_multi_forest: {
            type: String,
            default: "No response set"
        },
        number_of_forests: {
            type: String,
            default: "No response set"
        },
        exists_trusts: {
            type: String,
            default: "No response set"
        },
        is_resource_forest_arrangement: {
            type: String,
            default: "No response set"
        },
        is_using_multi_domains: {
            type: String,
            default: "No response set"
        },
        multi_domain_structure: {
            type: String,
            default: "No response set"
        },
        resource_forest_deployment: {
            type: String,
            default: "No response set"
        },
        AD_size: {
            type: String,
            default: "No response set"
        },
        require_ldap: {
            type: String,
            default: "No response set"
        },

        // O365 details
        O365_version: {
            type: String,
            default: "No response set"
        },
        is_maintaining_on_prem_AD: {
            type: String,
            default: "No response set"
        },
        is_maintaining_azure: {
            type: String,
            default: "No response set"
        },
        is_admin_in_AD_or_azure: {
            type: String,
            default: "No response set"
        },
        sync_tools: {
            type: String,
            default: "No response set"
        },
        which_O365: {
            type: String,
            default: "No response set"
        }
    },

    prem_exchange_hosted_O365: {
        // Exchange details
        exchange_version: {
            type: String,
            default: "No response set"
        },
        number_of_mail_servers: {
            type: String,
            default: "No response set"
        },
        has_enterprise_CAL: {
            type: String,
            default: "No response set"
        },
        // !!!
        describe_exchange_env: {
            type: String,
            default: "No response set"
        },
        diagram: {
            type: String,
            default: "No response set"
        },
        is_using_DAG: {
            type: String,
            default: "No response set"
        },

        // AD details
        is_multi_forest: {
            type: String,
            default: "No response set"
        },
        number_of_forests: {
            type: String,
            default: "No response set"
        },
        exists_trusts: {
            type: String,
            default: "No response set"
        },
        is_resource_forest_arrangement: {
            type: String,
            default: "No response set"
        },
        is_using_multi_domains: {
            type: String,
            default: "No response set"
        },
        structure: {
            type: String,
            default: "No response set"
        },
        resource_forest_deployment: {
            type: String,
            default: "No response set"
        },
        AD_size: {
            type: String,
            default: "No response set"
        },
        require_ldap: {
            type: String,
            default: "No response set"
        },

        // O365 details
        O365_version: {
            type: String,
            default: "No response set"
        },
        is_maintaining_on_prem_AD: {
            type: String,
            default: "No response set"
        },
        is_maintaining_azure: {
            type: String,
            default: "No response set"
        },
        is_admin_in_AD_or_azure: {
            type: String,
            default: "No response set"
        },
        sync_tools: {
            type: String,
            default: "No response set"
        },
        which_O365: {
            type: String,
            default: "No response set"
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