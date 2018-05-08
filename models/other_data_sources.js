var mongoose = require("mongoose");

var other_data_sources_schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    // custom content archiving
    custom_content_archiving: {
        need_custom_archive: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        diagram: {
            type: String,
            default: null
        },
        daily_volume: {
            type: String,
            default: null
        },
        avg_message_size: {
            type: String,
            default: null
        },
        systems: {
            type: String,
            default: null
        }
    },

    // public social media archiving
    public_social_archiving: {
        need_social_media_content: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        need_to_capture: {
            type: [String],
            default: null
        },
        number_of_each_account: {
            type: [String],
            default: null
        },
        using_what_to_archive: {
            type: String,
            default: null
        },
        digital_risk_agent: {
            type: String,
            default: null
        }
    },

    // Enterprise collaborative archiving
    enterprise_collaboration_archiving: {
        general: {
            users_per_platform: {
                type: String,
                default: null
            },
            number_of_users_to_archive: {
                type: String,
                default: null
            },
            capture_user_activity: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            avg_daily_message_volume: {
                type: String,
                default: null
            },
            most_active_profile: {
                type: String,
                default: null
            },
            retention_policy: {
                type: String,
                default: null
            },
            is_archiving_customer: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            which_archive: {
                type: String,
                default: null
            }
        },

        // files archiving
        files: {
            need: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            storage_usage: {
                type: String,
                default: null
            },
            files_desc: {
                type: String,
                default: null
            },
            fill_rate: {
                type: String,
                default: null
            },
            need_original_or_extracted: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            is_archiving_customer: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            }
        },

        // skype business archiving
        skype_business: {
            need: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            deployment: {
                type: String,
                enum: [null, "Hybrid", "Cloud"],
                default: null
            },
            license_level: {
                type: String,
                default: null
            },
            use_holds_or_searches: {
                type: String,
                default: null
            },
            how_active: {
                type: String,
                default: null
            }
        },

        // skype on prem and lync
        skype_on_prem: {
            need_skype_on_prem: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            need_lync: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            deployment: {
                type: String,
                enum: [null, "Hybrid", "Cloud"],
                default: null
            },
            number_of_lync_servers: {
                type: String,
                default: null
            },
            retention_policy: {
                type: String,
                default: null
            }
        },

        // OneDrive
        one_drive: {
            need: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            storage_usage: {
                type: String,
                default: null
            },
            files_desc: {
                type: String,
                default: null
            },
            fill_rate: {
                type: String,
                default: null
            },
            need_original_or_extracted: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            is_archiving_customer: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            auth: {
                type: String,
                enum: [null, "ADFS", "Azure AD"],
                default: null
            }
        },

        // Box
        box: {
            need: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            storage_usage: {
                type: String,
                default: null
            },
            files_desc: {
                type: String,
                default: null
            },
            fill_rate: {
                type: String,
                default: null
            },
            need_original_or_extracted: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            is_archiving_customer: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            }
        },

        // Bloomberg
        bloomberg: {
            need: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            users_per_platform: {
                type: String,
                default: null
            },
            number_of_users_to_archive: {
                type: String,
                default: null
            },
            capture_user_activity: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            avg_daily_message_volume: {
                type: String,
                default: null
            },
            most_active_profile: {
                type: String,
                default: null
            },
            retention_policy: {
                type: String,
                default: null
            },
            is_archiving_customer: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            which_archive: {
                type: String,
                default: null
            }
        },

        // yammer
        yammer: {
            need: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            users_per_platform: {
                type: String,
                default: null
            },
            number_of_users_to_archive: {
                type: String,
                default: null
            },
            capture_user_activity: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            avg_daily_message_volume: {
                type: String,
                default: null
            },
            most_active_profile: {
                type: String,
                default: null
            },
            retention_policy: {
                type: String,
                default: null
            },
            is_archiving_customer: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            which_archive: {
                type: String,
                default: null
            }
        },

        // Jive
        jive: {
            need: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            users_per_platform: {
                type: String,
                default: null
            },
            number_of_users_to_archive: {
                type: String,
                default: null
            },
            capture_user_activity: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            avg_daily_message_volume: {
                type: String,
                default: null
            },
            most_active_profile: {
                type: String,
                default: null
            },
            retention_policy: {
                type: String,
                default: null
            },
            is_archiving_customer: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            which_archive: {
                type: String,
                default: null
            }
        },

        // Chatter
        chatter: {
            need: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            number_of_groups: {
                type: String,
                default: null
            },
            multi_journal: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            over_3MB: {
                type: String,
                default: null
            },
            requirement: {
                type: String,
                default: null
            }
        },

        //Slack, not found so assuming general
        slack: {
            need: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            users_per_platform: {
                type: String,
                default: null
            },
            number_of_users_to_archive: {
                type: String,
                default: null
            },
            capture_user_activity: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            avg_daily_message_volume: {
                type: String,
                default: null
            },
            most_active_profile: {
                type: String,
                default: null
            },
            retention_policy: {
                type: String,
                default: null
            },
            is_archiving_customer: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            which_archive: {
                type: String,
                default: null
            }
        },

        // Symphony
        symphony: {
            need: {
                type: String,
                enum: [null, "Yes", "No"],
                default: null
            },
            license: {
                type: String,
                default: null
            }
        }
    }
});

var OtherDataSourcesQuestions = mongoose.model("otherDataSourcesQuestions", other_data_sources_schema);

// var sample = new OtherDataSourcesQuestions({
//     _id: "Tesla"
// });
//
// sample.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Inserted other data source questions for customer: " + result["_id"]);
//     }
// });


module.exports = OtherDataSourcesQuestions;