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
            enum: [null, "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
            default: null
        },
        number_of_mail_servers: {
            type: String,
            default: null
        },
        has_enterprise_CAL: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        // !!!
        is_replicating_exchange_and_AD: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        diagram: {
            type: String,
            default: null
        },
        is_multi_forest: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        exists_trusts: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_resource_forest_arrangement: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_using_multi_domains: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        structure: {
            type: String,
            default: null
        }
    },

    // O365 (Hosted appliance)
    hosted_O365: {
        O365_version: {
            type: String,
            default: null
        },
        is_maintaining_on_prem_AD: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_maintaining_azure: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_admin_in_AD_or_azure: {
            type: String,
            enum: [null, "On-prem AD", "Azure"],
            default: null
        },
        sync_tools: {
            type: String,
            default: null
        },
        which_O365: {
            type: String,
            enum: [null, "Shared", "Dedicated", "BPOS-D", "iTAR"],
            default: null
        }
    },

    // On-prem exchange + O365 (on prem appliance)
    prem_exchange_prem_O365: {
        // Exchange details
        exchange_version: {
            type: String,
            enum: [null, "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
            default: null
        },
        number_of_mail_servers: {
            type: String,
            default: null
        },
        has_enterprise_CAL: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        describe_exchange_env: {
            type: String,
            default: null
        },
        diagram: {
            type: String,
            default: null
        },
        is_using_DAG: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },

        // AD details
        is_multi_forest: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        number_of_forests: {
            type: String,
            default: null
        },
        exists_trusts: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_resource_forest_arrangement: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_using_multi_domains: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        resource_forest_deployment: {
            type: String,
            default: null
        },
        AD_size: {
            type: String,
            default: null
        },
        require_ldap: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },

        // O365 details
        O365_version: {
            type: String,
            default: null
        },
        is_maintaining_on_prem_AD: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_maintaining_azure: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_admin_in_AD_or_azure: {
            type: String,
            enum: [null, "On-prem AD", "Azure"],
            default: null
        },
        sync_tools: {
            type: String,
            default: null
        },
        which_O365: {
            type: String,
            enum: [null, "Shared", "Dedicated", "BPOS-D", "iTAR"],
            default: null
        }
    },

    prem_exchange_hosted_O365: {
        // Exchange details
        exchange_version: {
            type: String,
            enum: [null, "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
            default: null
        },
        number_of_mail_servers: {
            type: String,
            default: null
        },
        has_enterprise_CAL: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        // !!!
        describe_exchange_env: {
            type: String,
            default: null
        },
        diagram: {
            type: String,
            default: null
        },
        is_using_DAG: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },

        // AD details
        is_multi_forest: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        number_of_forests: {
            type: String,
            default: null
        },
        exists_trusts: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_resource_forest_arrangement: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_using_multi_domains: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        structure: {
            type: String,
            default: null
        },
        resource_forest_deployment: {
            type: String,
            default: null
        },
        AD_size: {
            type: String,
            default: null
        },
        require_ldap: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },

        // O365 details
        O365_version: {
            type: String,
            default: null
        },
        is_maintaining_on_prem_AD: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_maintaining_azure: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_admin_in_AD_or_azure: {
            type: String,
            enum: [null, "On-prem AD", "Azure"],
            default: null
        },
        sync_tools: {
            type: String,
            default: null
        },
        which_O365: {
            type: String,
            enum: [null, "Shared", "Dedicated", "BPOS-D", "iTAR"],
            default: null
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