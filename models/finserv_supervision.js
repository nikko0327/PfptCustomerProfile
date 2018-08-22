var mongoose = require("mongoose");

var finserv_supervision_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    digital_comm_current: {
        type: String,
        default: ""
    },
    pain_points: {
        type: String,
        default: ""
    },
    not_haves: {
        type: String,
        default: ""
    },
    regulator: {
        type: String,
        default: ""
    },
    digital_comm: {
        monitored_users: {
            type: String,
            default: ""
        },
        reviewers: {
            type: String,
            default: ""
        },
        admins: {
            type: String,
            default: ""
        },
        rules_lexicons: {
            type: String,
            default: ""
        },
        whitelist_rules: {
            type: String,
            default: ""
        },
        units_using_supervision: {
            type: String,
            default: ""
        },
        different_reqs: {
            type: String,
            default: ""
        },
        message_sampling_profiles: {
            heightened_supervision: {
                type: Boolean,
                default: false
            },
            flagged_messages: {
                type: Boolean,
                default: false
            },
            clean: {
                type: Boolean,
                default: false
            },
            content_type: {
                type: Boolean,
                default: false
            },
            internal_messages: {
                type: Boolean,
                default: false
            },
            external_messages: {
                type: Boolean,
                default: false
            },
            heightened_supervision_rate: {
                type: String,
                default: ""
            },
            flagged_messages_rate: {
                type: String,
                default: ""
            },
            clean_rate: {
                type: String,
                default: ""
            },
            content_type_rate: {
                type: String,
                default: ""
            },
            internal_messages_rate: {
                type: String,
                default: ""
            },
            external_messages_rate: {
                type: String,
                default: ""
            }
        }
    },
    supervisory_workflow: {
        issue_status: {
            type: String,
            default: ""
        },
        violation_handling: {
            type: String,
            default: ""
        },
        escalation_path: {
            type: String,
            default: ""
        },
        potential_violation_doc: {
            type: String,
            default: ""
        },
        messages_closed: {
            type: String,
            default: ""
        },
        status_used: {
            type: String,
            default: ""
        },
        substantiated_violation_doc: {
            type: String,
            default: ""
        },
        notify_message_violation: {
            type: String,
            default: ""
        }
    },
    administrative_functions: {
        admin_count: {
            type: String,
            default: ""
        },
        admin_oversight: {
            type: String,
            default: ""
        },
        aging_reviews: {
            type: String,
            default: ""
        },
        evidence_of_supervision: {
            type: String,
            default: ""
        },
        quality_review: {
            type: String,
            default: ""
        }
    },
    rule_lexicon_maintenance: {
        update_frequency: {
            type: String,
            default: ""
        },
        whitelist_spam_updating: {
            type: String,
            default: ""
        },
        // lexicon_updating: {
        //     type: String,
        //     default: ""
        // },
        false_positives: {
            type: String,
            default: ""
        },
        new_regulations: {
            type: String,
            default: ""
        },
        new_risks: {
            type: String,
            default: ""
        }
    },
    comments: {
        type: String,
        default: ""
    }
});

var FinservSupervisionQuestions = mongoose.model("FinservSupervisionQuestions", finserv_supervision_schema);

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

async function findOneOrCreate(search_term) {
    let result = await FinservSupervisionQuestions.findOne(search_term);
    if (result) {
        console.log('result exists');
        return result;
    } else {
        console.log('result DNE, making new one');
        return await FinservSupervisionQuestions.create(search_term);
    }
}

module.exports = FinservSupervisionQuestions;
module.exports.findOneOrCreate = findOneOrCreate;