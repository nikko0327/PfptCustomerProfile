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
        is_using_DAG: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        number_of_inboxes: {
            type: String,
            default: null
        },
        journal_rules: {
            type: String,
            enum: [null, "Hub transport", "Database"],
            default: null
        },
        is_journal_in_own_DB: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        number_of_extra_storage: {
            type: String,
            default: null
        },
        is_using_RMS: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_journal_decryption_enabled: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        }
    },

    // O365 (Hosted appliance)
    hosted_O365: {
        is_using_azure_rms: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_using_IRM: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_journal_decryption_enabled: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_using_message_decryption: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        }
    },

    // On-prem exchange + O365 (on prem appliance)
    prem_exchange_prem_O365: {
        // Exchange details
        is_using_DAG: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        number_of_inboxes: {
            type: String,
            default: null
        },
        journal_rules: {
            type: String,
            enum: [null, "Hub transport", "Database"],
            default: null
        },
        is_journal_in_own_DB: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        number_of_extra_storage: {
            type: String,
            default: null
        },
        is_using_RMS: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_journal_decryption_enabled: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },

        // O365 details
        is_using_azure_rms: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_using_IRM: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_O365_journal_decryption_enabled: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_using_message_decryption: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        }
    },

    prem_exchange_hosted_O365: {
        // Exchange details
        is_using_DAG: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        number_of_inboxes: {
            type: String,
            default: null
        },
        journal_rules: {
            type: String,
            enum: [null, "Hub transport", "Database"],
            default: null
        },
        is_journal_in_own_DB: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        number_of_extra_storage: {
            type: String,
            default: null
        },
        is_using_RMS: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_journal_decryption_enabled: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },

        // O365 details
        is_using_azure_rms: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_using_IRM: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        // is_journal_decryption_enabled: {
        //     type: String,
        //     enum: [null, "Yes", "No"],
        //     default: null
        // },
        is_using_message_decryption: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        }
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