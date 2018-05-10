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
            default: "No response set"
        },
        pain_points: {
            type: String,
            default: "No response set"
        },
        deficiencies: {
            type: String,
            default: "No response set"
        },
        businesses_supervision_requirements: {
            type: String,
            default: "No response set"
        },
        review: {
            type: String,
            default: "No response set"
        },
        escalation_process: {
            type: String,
            default: "No response set"
        },
        system_record: {
            subject_for_review: {
                type: String,
                default: "No response set"
            },
            responsible: {
                type: String,
                default: "No response set"
            },
            how_is_data_loaded: {
                type: String,
                default: "No response set"
            }
        },
        evaluation_criteria: {
            type: String,
            default: "No response set"
        },
        need_to_migrate_policies: {
            type: String,
            default: "No response set"
        },
        random_sampling: {
            has_rules: {
                type: String,
                default: "No response set"
            }
            ,
            multi_sampling: {
                type: String,
                default: "No response set"
            },
            sampling_intention: {
                type: String,
                enum: ["No response set", "Top up", "Not top up"], // ????
                default: "No response set"
            },
            notify_violators: {
                type: String,
                default: "No response set"
            }
        },
        report_requirements: {
            existing_reports: {
                type: String,
                default: "No response set"
            },
            decisions: {
                type: String,
                default: "No response set"
            },
            roll_out_reports: {
                type: String,
                default: "No response set"
            },
            future_reports: {
                type: String,
                default: "No response set"
            }
        }
    },
    stubbing: {
        support: {
            type: String,
            default: "No response set"
        },
        interested_in_subbing: {
            type: String,
            default: "No response set"
        },
        stubbing_policy: {
            type: String,
            default: "No response set"
        },
        number_of_stubbing_users: { // number
            type: String,
            default: "No response set"
        }
    },
    // Not sure about selective disposition

    content_collector_files: {
        interested_in_CC4Files: {
            type: String,
            default: "No response set"
        },
        files_location: {
            type: String,
            default: "No response set"
        },
        willing_to_install_agent: {
            type: String,
            default: "No response set"
        },
        volume_of_files: { // number
            type: String,
            default: "No response set"
        },
        unusual_file_types: {
            type: String,
            default: "No response set"
        },
        avg_file_size: {
            type: String,
            default: "No response set"
        },
        understand_legal_holds: {
            type: String,
            default: "No response set"
        }
    },
    content_collector_PST: {
        interested_in_CC4FPST: {
            type: String,
            default: "No response set"
        },
        avg_file_size: {
            type: String,
            default: "No response set"
        },
        frequency: {
            type: String,
            default: "No response set"
        },
        use_case: {
            type: String,
            default: "No response set"
        }
    },
    legal_holds: {
        custodian_or_ad_hoc: {
            type: String,
            default: "No response set"
        },
        number_of_legal_holds: {
            type: String,
            default: "No response set"
        },
        number_of_unique_custodians: {
            type: String,
            default: "No response set"
        },
        largest_hold: {
            type: String,
            default: "No response set"
        },
        notification_system: {
            type: String,
            default: "No response set"
        },
        third_party_solutions: {
            type: String,
            default: "No response set"
        },
        api_use_cases: {
            type: String,
            default: "No response set"
        }
    },
    end_user_search: {
        number_of_user_access: {
            type: String,
            default: "No response set"
        },
        need_outlook: {
            type: String,
            default: "No response set"
        },
        need_mobile_apps: {
            type: String,
            default: "No response set"
        }
    },
    folder_sync: {
        interested_in_folder_sync: {
            type: String,
            default: "No response set"
        },
        number_of_users_interested: {
            type: String,
            default: "No response set"
        },
        // NOT SURE ABOUT THIS ONE
    },
    // Transport agent has no questions

    export: {
        volume: {
            type: String,
            default: "No response set"
        },
        preferred_export_format: {
            type: String,
            default: "No response set"
        },
        where_data_goes: {
            type: String,
            default: "No response set"
        },
        expect_auto_upload: {
            type: String,
            default: "No response set"
        }
    },

    outlook_view_manager: {
        allow_users_access: {
            type: String,
            default: "No response set"
        },
        is_using_OWA: {
            type: String,
            default: "No response set"
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