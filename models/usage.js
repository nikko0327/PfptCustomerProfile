var mongoose = require('mongoose');

var usage_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    supervision: {
        supervision_system: {
            type: String,
            default: null
        },
        pain_points: {
            type: String,
            default: null
        },
        deficiencies: {
            type: String,
            default: null
        },
        businesses_supervision_requirements: {
            type: String,
            default: null
        },
        review: {
            type: String,
            enum: [null, "Centralized", "Decentralized"],
            default: null
        },
        escalation_process: {
            type: String,
            default: null
        },
        system_record: {
            subject_for_review: {
                type: String,
                default: null
            },
            responsible: {
                type: String,
                default: null
            },
            how_is_data_loaded: {
                type: String,
                default: null
            }
        },
        evaluation_criteria: {
            type: String,
            default: null
        },
        need_to_migrate_policies: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        random_sampling: {
            has_rules: {
                type: String,
                enum:
                    [null, "Yes", "No"],
                default:
                    null
            }
            ,
            multi_sampling: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            sampling_intention: {
                type: String,
                enum: [null, "Top up", "Not top up"], // ????
                default: null
            },
            notify_violators: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            }
        },
        report_requirements: {
            existing_reports: {
                type: String,
                default: null
            },
            decisions: {
                type: String,
                default: null
            },
            roll_out_reports: {
                type: String,
                default: null
            },
            future_reports: {
                type: String,
                default: null
            }
        }
    },
    stubbing: {
        support: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        interested_in_subbing: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        stubbing_policy: {
            type: String,
            default: null
        },
        number_of_stubbing_users: { // number
            type: String,
            default: null
        }
    },
    // Not sure about selective disposition

    content_collector_files: {
        interested_in_CC4Files: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        files_location: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        willing_to_install_agent: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        volume_of_files: { // number
            type: String,
            default: null
        },
        unusual_file_types: {
            type: String,
            default: null
        },
        avg_file_size: {
            type: String,
            default: null
        },
        understand_legal_holds: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        }
    },
    content_collector_PST: {
        interested_in_CC4FPST: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        avg_file_size: {
            type: String,
            default: null
        },
        frequency: {
            type: String,
            default: null
        },
        use_case: {
            type: String,
            default: null
        }
    },
    legal_holds: {
        custodian_or_ad_hoc: {
            type: String,
            default: null
        },
        number_of_legal_holds: {
            type: String,
            default: null
        },
        number_of_unique_custodians: {
            type: String,
            default: null
        },
        largest_hold: {
            type: String,
            default: null
        },
        notification_system: {
            type: String,
            default: null
        },
        third_party_solutions: {
            type: String,
            default: null
        },
        api_use_cases: {
            type: String,
            default: null
        }
    },
    end_user_search: {
        number_of_user_access: {
            type: String,
            default: null
        },
        need_outlook: {
            type: String,
            default: null
        },
        need_mobile_apps: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        }
    },
    folder_sync: {
        interested_in_folder_sync: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        number_of_users_interested: {
            type: String,
            default: null
        },
        // NOT SURE ABOUT THIS ONE
    },
    // Transport agent has no questions

    export: {
        volume: {
            type: String,
            default: null
        },
        preferred_export_format: {
            type: String,
            default: null
        },
        where_data_goes: {
            type: String,
            default: null
        },
        expect_auto_upload: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        }
    },

    outlook_view_manager: {
        allow_users_access: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_using_OWA: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        }
    }
});

var UsageQuestions = mongoose.model("UsageQuestions", usage_schema);

// var sample = new UsageQuestions({
//     _id: "Tesla"
// });
//
// sample.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Successfully created usage questions for customer: " + result["_id"]);
//     }
// });


module.exports = UsageQuestions;