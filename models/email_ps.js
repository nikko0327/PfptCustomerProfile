var mongoose = require("mongoose");
//var Schema = mongoose.Schema;

var email_ps_schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    // On prem exchange w/ on prem appliances
    prem_exchange: {
        // is_using_DAG: {
        //     type: String,
        //     default: ""
        // },
        number_of_inboxes: {
            type: String,
            default: ""
        },
        journal_rules: {
            type: String,
            default: ""
        },
        is_journal_in_own_DB: {
            type: String,
            default: ""
        },
        number_of_extra_storage: {
            type: String,
            default: ""
        },
        is_using_RMS: {
            type: String,
            default: ""
        },
        is_journal_decryption_enabled: {
            type: String,
            default: ""
        }
    },

    // O365 (Hosted appliance)
    hosted_O365: {
        is_using_azure_rms: {
            type: String,
            default: ""
        },
        is_using_IRM: {
            type: String,
            default: ""
        },
        is_journal_decryption_enabled: {
            type: String,
            default: ""
        },
        is_using_message_encryption: {
            type: String,
            default: ""
        }
    },

    // On-prem exchange + O365 (on prem appliance)
    prem_exchange_prem_O365: {
        // Exchange details
        // is_using_DAG: {
        //     type: String,
        //     default: ""
        // },
        number_of_inboxes: {
            type: String,
            default: ""
        },
        journal_rules: {
            type: String,
            default: ""
        },
        is_journal_in_own_DB: {
            type: String,
            default: ""
        },
        number_of_extra_storage: {
            type: String,
            default: ""
        },
        is_using_RMS: {
            type: String,
            default: ""
        },
        is_journal_decryption_enabled: {
            type: String,
            default: ""
        },

        // O365 details
        is_using_azure_rms: {
            type: String,
            default: ""
        },
        is_using_IRM: {
            type: String,
            default: ""
        },
        is_O365_journal_decryption_enabled: {
            type: String,
            default: ""
        },
        is_using_message_encryption: {
            type: String,
            default: ""
        }
    },

    prem_exchange_hosted_O365: {
        exchange_version: {
            type: String,
            default: ""
        },
        mailbox_server_locations: {
            type: String,
            default: ""
        },
        has_enterprise_CAL: {
            type: String,
            default: ""
        },
        // describe_env: {
        //     type: String,
        //     default: ""
        // },
        // diagram: {
        //     type: String,
        //     default: ""
        // },
        // is_using_DAG: {
        //     type: String,
        //     default: ""
        // },
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
    comments: {
        type: String,
        default: ""
    }
});

var EmailPSQuestions = mongoose.model("EmailPSQuestions", email_ps_schema);

// var newCustomer = new EmailPSQuestions({
//     _id: "Tesla"
// });
//
// newCustomer.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Successfully created PS email questions for customer: " + result["_id"]);
//     }
// });

module.exports = EmailPSQuestions;