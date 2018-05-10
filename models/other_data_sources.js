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
            default: "No response set"
        },
        diagram: {
            type: String,
            default: "No response set"
        },
        daily_volume: {
            type: String,
            default: "No response set"
        },
        avg_message_size: {
            type: String,
            default: "No response set"
        },
        systems: {
            type: String,
            default: "No response set"
        }
    },

    // public social media archiving
    public_social_archiving: {
        need_social_media_content: {
            type: String,
            default: "No response set"
        },
        need_to_capture: {
            type: String,
            default: "No response set"
        },
        number_of_each_account: {
            type: String,
            default: "No response set"
        },
        using_what_to_archive: {
            type: String,
            default: "No response set"
        },
        digital_risk_agent: {
            type: String,
            default: "No response set"
        }
    },

    // Enterprise collaborative archiving
    enterprise_collaboration_archiving: {
        general: {
            users_per_platform: {
                type: String,
                default: "No response set"
            },
            number_of_users_to_archive: {
                type: String,
                default: "No response set"
            },
            capture_user_activity: {
                type: String,
                default: "No response set"
            },
            avg_daily_message_volume: {
                type: String,
                default: "No response set"
            },
            most_active_profile: {
                type: String,
                default: "No response set"
            },
            retention_policy: {
                type: String,
                default: "No response set"
            },
            is_archiving_customer: {
                type: String,
                default: "No response set"
            },
            which_archive: {
                type: String,
                default: "No response set"
            }
        },

        // files archiving
        files: {
            need: {
                type: String,
                default: "No response set"
            },
            storage_usage: {
                type: String,
                default: "No response set"
            },
            files_desc: {
                type: String,
                default: "No response set"
            },
            fill_rate: {
                type: String,
                default: "No response set"
            },
            need_original_or_extracted: {
                type: String,
                default: "No response set"
            },
            is_archiving_customer: {
                type: String,
                default: "No response set"
            }
        },

        // skype business archiving
        skype_business: {
            need: {
                type: String,
                default: "No response set"
            },
            deployment: {
                type: String,
                default: "No response set"
            },
            license_level: {
                type: String,
                default: "No response set"
            },
            use_holds_or_searches: {
                type: String,
                default: "No response set"
            },
            how_active: {
                type: String,
                default: "No response set"
            }
        },

        // skype on prem and lync
        skype_on_prem: {
            need_skype_on_prem: {
                type: String,
                default: "No response set"
            },
            need_lync: {
                type: String,
                default: "No response set"
            },
            deployment: {
                type: String,
                default: "No response set"
            },
            number_of_lync_servers: {
                type: String,
                default: "No response set"
            },
            retention_policy: {
                type: String,
                default: "No response set"
            }
        },

        // OneDrive
        one_drive: {
            need: {
                type: String,
                default: "No response set"
            },
            storage_usage: {
                type: String,
                default: "No response set"
            },
            files_desc: {
                type: String,
                default: "No response set"
            },
            fill_rate: {
                type: String,
                default: "No response set"
            },
            need_original_or_extracted: {
                type: String,
                default: "No response set"
            },
            is_archiving_customer: {
                type: String,
                default: "No response set"
            },
            auth: {
                type: String,
                default: "No response set"
            }
        },

        // Box
        box: {
            need: {
                type: String,
                default: "No response set"
            },
            storage_usage: {
                type: String,
                default: "No response set"
            },
            files_desc: {
                type: String,
                default: "No response set"
            },
            fill_rate: {
                type: String,
                default: "No response set"
            },
            need_original_or_extracted: {
                type: String,
                default: "No response set"
            },
            is_archiving_customer: {
                type: String,
                default: "No response set"
            }
        },

        // Bloomberg
        bloomberg: {
            need: {
                type: String,
                default: "No response set"
            },
            users_per_platform: {
                type: String,
                default: "No response set"
            },
            number_of_users_to_archive: {
                type: String,
                default: "No response set"
            },
            capture_user_activity: {
                type: String,
                default: "No response set"
            },
            avg_daily_message_volume: {
                type: String,
                default: "No response set"
            },
            most_active_profile: {
                type: String,
                default: "No response set"
            },
            retention_policy: {
                type: String,
                default: "No response set"
            },
            is_archiving_customer: {
                type: String,
                default: "No response set"
            },
            which_archive: {
                type: String,
                default: "No response set"
            }
        },

        // yammer
        yammer: {
            need: {
                type: String,
                default: "No response set"
            },
            users_per_platform: {
                type: String,
                default: "No response set"
            },
            number_of_users_to_archive: {
                type: String,
                default: "No response set"
            },
            capture_user_activity: {
                type: String,
                default: "No response set"
            },
            avg_daily_message_volume: {
                type: String,
                default: "No response set"
            },
            most_active_profile: {
                type: String,
                default: "No response set"
            },
            retention_policy: {
                type: String,
                default: "No response set"
            },
            is_archiving_customer: {
                type: String,
                default: "No response set"
            },
            which_archive: {
                type: String,
                default: "No response set"
            }
        },

        // Jive
        jive: {
            need: {
                type: String,
                default: "No response set"
            },
            users_per_platform: {
                type: String,
                default: "No response set"
            },
            number_of_users_to_archive: {
                type: String,
                default: "No response set"
            },
            capture_user_activity: {
                type: String,
                default: "No response set"
            },
            avg_daily_message_volume: {
                type: String,
                default: "No response set"
            },
            most_active_profile: {
                type: String,
                default: "No response set"
            },
            retention_policy: {
                type: String,
                default: "No response set"
            },
            is_archiving_customer: {
                type: String,
                default: "No response set"
            },
            which_archive: {
                type: String,
                default: "No response set"
            }
        },

        // Chatter
        chatter: {
            need: {
                type: String,
                default: "No response set"
            },
            number_of_groups: {
                type: String,
                default: "No response set"
            },
            multi_journal: {
                type: String,
                default: "No response set"
            },
            over_3MB: {
                type: String,
                default: "No response set"
            },
            requirement: {
                type: String,
                default: "No response set"
            }
        },

        //Slack, not found so assuming general
        slack: {
            need: {
                type: String,
                default: "No response set"
            },
            users_per_platform: {
                type: String,
                default: "No response set"
            },
            number_of_users_to_archive: {
                type: String,
                default: "No response set"
            },
            capture_user_activity: {
                type: String,
                default: "No response set"
            },
            avg_daily_message_volume: {
                type: String,
                default: "No response set"
            },
            most_active_profile: {
                type: String,
                default: "No response set"
            },
            retention_policy: {
                type: String,
                default: "No response set"
            },
            is_archiving_customer: {
                type: String,
                default: "No response set"
            },
            which_archive: {
                type: String,
                default: "No response set"
            }
        },

        // Symphony
        symphony: {
            need: {
                type: String,
                default: "No response set"
            },
            license: {
                type: String,
                default: "No response set"
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