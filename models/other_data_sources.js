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
        // Need to capture
        need_social_media_content: {
            facebook: {
                type: Boolean,
                default: false
            },
            linkedin: {
                type: Boolean,
                default: false
            },
            twitter: {
                type: Boolean,
                default: false
            },
            google: {
                type: Boolean,
                default: false
            },
            youtube: {
                type: Boolean,
                default: false
            }
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
        needs: {
            files: {
                type: Boolean,
                default: false
            },
            skype_in_cloud: {
                type: Boolean,
                default: false
            },
            skype_on_prem: {
                type: Boolean,
                default: false
            },
            lync_on_prem: {
                type: Boolean,
                default: false
            },
            one_drive: {
                type: Boolean,
                default: false
            },
            box: {
                type: Boolean,
                default: false
            },
            bloomberg: {
                type: Boolean,
                default: false
            },
            yammer: {
                type: Boolean,
                default: false
            },
            jive: {
                type: Boolean,
                default: false
            },
            chatter: {
                type: Boolean,
                default: false
            },
            slack: {
                type: Boolean,
                default: false
            },
            symphony: {
                type: Boolean,
                default: false
            }

        },
        general: {
            number_of_users_per_platform: {
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
        box_one_drive: {
            auth: {
                type: String,
                default: ""
            }
        },

        // Bloomberg, general
        //bloomberg: {},

        // yammer, general
        // yammer: {},

        // Jive, general
        // jive: {},

        // Chatter
        chatter: {
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
            comfortable: {
                type: String,
                default: ""
            },
            requirement: {
                type: String,
                default: ""
            }
        },

        //Slack, not found so assuming general
        // slack: {
        // },

        // Symphony
        symphony: {
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