var mongoose = require('mongoose');

var usage_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    supervision: {
        compliance_divisions: {
            type: String,
            default: ""
        },
        supervision_system: {
            type: String,
            default: ""
        },
        pain_points: {
            type: String,
            default: ""
        },
        deficiencies: {
            type: String,
            default: ""
        },
        business_supervision_requirements: {
            type: String,
            default: ""
        },
        review: {
            type: String,
            default: ""
        },
        escalation_process: {
            type: String,
            default: ""
        },
        system_record: {
            subject_for_review: {
                type: String,
                default: ""
            },
            responsible: {
                type: String,
                default: ""
            },
            how_is_data_loaded: {
                type: String,
                default: ""
            }
        },
        evaluation_criteria: {
            type: String,
            default: ""
        },
        need_to_migrate_policies: {
            type: String,
            default: ""
        },
        whitelists: {
            type: String,
            default: ""
        },
        random_sampling: {
            has_rules: {
                type: String,
                default: ""
            }
            ,
            multi_sampling: {
                type: String,
                default: ""
            },
            sampling_intention: {
                type: String,
                default: ""
            },
            notify_violators: {
                type: String,
                default: ""
            }
        },
        report_requirements: {
            types: {
                aging_reviews: {
                    type: Boolean,
                    default: false
                },
                evidence: {
                    type: Boolean,
                    default: false
                },
                flagging_rate: {
                    type: Boolean,
                    default: false
                },
                lexicon: {
                    type: Boolean,
                    default: false
                },
                other: {
                    type: String,
                    default: ""
                }
            },
            move_supervision: {
                type: String,
                default: ""
            },
            not_haves: {
                type: String,
                default: ""
            },
            existing_reports: {
                type: String,
                default: ""
            },
            decisions: {
                type: String,
                default: ""
            },
            roll_out_reports: {
                type: String,
                default: ""
            },
            future_reports: {
                type: String,
                default: ""
            }
        }
    },
    stubbing: {
        support: {
            type: String,
            default: ""
        },
        interested_in_stubbing: {
            type: String,
            default: ""
        },
        stubbing_policy: {
            type: String,
            default: ""
        },
        number_of_stubbing_users: { // number
            type: String,
            default: ""
        }
    },
    // Not sure about selective disposition
    selective_disposition: {
        scenarios: {
            type: String,
            default: ""
        },
        messages_to_dispose: {
            type: String,
            default: ""
        }
    },

    content_collector_files: {
        interested_in_CC4Files: {
            type: String,
            default: ""
        },
        files_location: {
            type: String,
            default: ""
        },
        willing_to_install_agent: {
            type: String,
            default: ""
        },
        volume_of_files: { // number
            type: String,
            default: ""
        },
        unusual_file_types: {
            type: String,
            default: ""
        },
        avg_file_size: {
            type: String,
            default: ""
        },
        understand_legal_holds: {
            type: String,
            default: ""
        }
    },
    content_collector_PST: {
        interested_in_CC4FPST: {
            type: String,
            default: ""
        },
        avg_file_size: {
            type: String,
            default: ""
        },
        frequency: {
            type: String,
            default: ""
        },
        use_case: {
            type: String,
            default: ""
        }
    },
    legal_holds: {
        custodian_or_ad_hoc: {
            type: String,
            default: ""
        },
        number_of_legal_holds: {
            type: String,
            default: ""
        },
        number_of_unique_custodians: {
            type: String,
            default: ""
        },
        largest_hold: {
            type: String,
            default: ""
        },
        notification_system: {
            type: String,
            default: ""
        },
        third_party_solutions: {
            type: String,
            default: ""
        },
        api_use_cases: {
            type: String,
            default: ""
        }
    },
    end_user_search: {
        number_of_user_access: {
            type: String,
            default: ""
        },
        need_outlook: {
            type: String,
            default: ""
        },
        need_mobile_apps: {
            type: String,
            default: ""
        }
    },
    transport_agent: {
        type: String,
        default: ""
    },
    folder_sync: {
        interested_in_folder_sync: {
            type: String,
            default: ""
        },
        number_of_users_interested: {
            type: String,
            default: ""
        },
        service_account: {
            type: String,
            default: ""
        }
        // NOT SURE ABOUT THIS ONE
    },
    // Transport agent has no questions

    export: {
        volume: {
            type: String,
            default: ""
        },
        preferred_export_format: {
            type: String,
            default: ""
        },
        where_data_goes: {
            type: String,
            default: ""
        },
        expect_auto_upload: {
            type: String,
            default: ""
        }
    },

    outlook_view_manager: {
        allow_users_access: {
            type: String,
            default: ""
        },
        is_using_OWA: {
            type: String,
            default: ""
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