var mongoose = require("mongoose");

var other_data_sources_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    // custom content archiving
    custom_content_archiving: {
        need_custom_archive: {
            type: String,
            default: ""
        },
        diagram: {
            type: String,
            default: ""
        },
        daily_volume: {
            type: String,
            default: ""
        },
        avg_message_size: {
            type: String,
            default: ""
        },
        systems: {
            type: String,
            default: ""
        }
    },

    // public social media archiving
    public_social_archiving: {
        need_social_media_content: {
            type: String,
            default: ""
        },
        need_to_capture: {
            type: String,
            default: ""
        },
        number_of_each_account: {
            type: String,
            default: ""
        },
        using_what_to_archive: {
            type: String,
            default: ""
        },
        digital_risk_agent: {
            type: String,
            default: ""
        }
    },

    // Enterprise collaborative archiving
    enterprise_collaboration_archiving: {
        general: {
            users_per_platform: {
                type: String,
                default: ""
            },
            number_of_users_to_archive: {
                type: String,
                default: ""
            },
            capture_user_activity: {
                type: String,
                default: ""
            },
            avg_daily_message_volume: {
                type: String,
                default: ""
            },
            most_active_profile: {
                type: String,
                default: ""
            },
            retention_policy: {
                type: String,
                default: ""
            },
            is_archiving_customer: {
                type: String,
                default: ""
            },
            which_archive: {
                type: String,
                default: ""
            }
        },

        // files archiving
        files: {
            need: {
                type: String,
                default: ""
            },
            storage_usage: {
                type: String,
                default: ""
            },
            files_desc: {
                type: String,
                default: ""
            },
            fill_rate: {
                type: String,
                default: ""
            },
            need_original_or_extracted: {
                type: String,
                default: ""
            },
            is_archiving_customer: {
                type: String,
                default: ""
            }
        },

        // skype business archiving
        skype_business: {
            need: {
                type: String,
                default: ""
            },
            deployment: {
                type: String,
                default: ""
            },
            license_level: {
                type: String,
                default: ""
            },
            use_holds_or_searches: {
                type: String,
                default: ""
            },
            how_active: {
                type: String,
                default: ""
            }
        },

        // skype on prem and lync
        skype_on_prem: {
            need_skype_on_prem: {
                type: String,
                default: ""
            },
            need_lync: {
                type: String,
                default: ""
            },
            deployment: {
                type: String,
                default: ""
            },
            number_of_lync_servers: {
                type: String,
                default: ""
            },
            retention_policy: {
                type: String,
                default: ""
            }
        },

        // OneDrive
        one_drive: {
            need: {
                type: String,
                default: ""
            },
            storage_usage: {
                type: String,
                default: ""
            },
            files_desc: {
                type: String,
                default: ""
            },
            fill_rate: {
                type: String,
                default: ""
            },
            need_original_or_extracted: {
                type: String,
                default: ""
            },
            is_archiving_customer: {
                type: String,
                default: ""
            },
            auth: {
                type: String,
                default: ""
            }
        },

        // Box
        box: {
            need: {
                type: String,
                default: ""
            },
            storage_usage: {
                type: String,
                default: ""
            },
            files_desc: {
                type: String,
                default: ""
            },
            fill_rate: {
                type: String,
                default: ""
            },
            need_original_or_extracted: {
                type: String,
                default: ""
            },
            is_archiving_customer: {
                type: String,
                default: ""
            }
        },

        // Bloomberg
        bloomberg: {
            need: {
                type: String,
                default: ""
            },
            users_per_platform: {
                type: String,
                default: ""
            },
            number_of_users_to_archive: {
                type: String,
                default: ""
            },
            capture_user_activity: {
                type: String,
                default: ""
            },
            avg_daily_message_volume: {
                type: String,
                default: ""
            },
            most_active_profile: {
                type: String,
                default: ""
            },
            retention_policy: {
                type: String,
                default: ""
            },
            is_archiving_customer: {
                type: String,
                default: ""
            },
            which_archive: {
                type: String,
                default: ""
            }
        },

        // yammer
        yammer: {
            need: {
                type: String,
                default: ""
            },
            users_per_platform: {
                type: String,
                default: ""
            },
            number_of_users_to_archive: {
                type: String,
                default: ""
            },
            capture_user_activity: {
                type: String,
                default: ""
            },
            avg_daily_message_volume: {
                type: String,
                default: ""
            },
            most_active_profile: {
                type: String,
                default: ""
            },
            retention_policy: {
                type: String,
                default: ""
            },
            is_archiving_customer: {
                type: String,
                default: ""
            },
            which_archive: {
                type: String,
                default: ""
            }
        },

        // Jive
        jive: {
            need: {
                type: String,
                default: ""
            },
            users_per_platform: {
                type: String,
                default: ""
            },
            number_of_users_to_archive: {
                type: String,
                default: ""
            },
            capture_user_activity: {
                type: String,
                default: ""
            },
            avg_daily_message_volume: {
                type: String,
                default: ""
            },
            most_active_profile: {
                type: String,
                default: ""
            },
            retention_policy: {
                type: String,
                default: ""
            },
            is_archiving_customer: {
                type: String,
                default: ""
            },
            which_archive: {
                type: String,
                default: ""
            }
        },

        // Chatter
        chatter: {
            need: {
                type: String,
                default: ""
            },
            number_of_groups: {
                type: String,
                default: ""
            },
            multi_journal: {
                type: String,
                default: ""
            },
            over_3MB: {
                type: String,
                default: ""
            },
            requirement: {
                type: String,
                default: ""
            }
        },

        //Slack, not found so assuming general
        slack: {
            need: {
                type: String,
                default: ""
            },
            users_per_platform: {
                type: String,
                default: ""
            },
            number_of_users_to_archive: {
                type: String,
                default: ""
            },
            capture_user_activity: {
                type: String,
                default: ""
            },
            avg_daily_message_volume: {
                type: String,
                default: ""
            },
            most_active_profile: {
                type: String,
                default: ""
            },
            retention_policy: {
                type: String,
                default: ""
            },
            is_archiving_customer: {
                type: String,
                default: ""
            },
            which_archive: {
                type: String,
                default: ""
            }
        },

        // Symphony
        symphony: {
            need: {
                type: String,
                default: ""
            },
            license: {
                type: String,
                default: ""
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