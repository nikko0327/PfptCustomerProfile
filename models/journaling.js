var mongoose = require('mongoose');

var journaling_schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    exchange: {
        exchange_on_prem: {
            type: String,
            default: ""
        },
        has_O365: {
            type: String,
            default: ""
        },
        is_mixed_mode: {
            type: String,
            default: ""
        },
        number_of_mailboxes: {
            type: String,
            default: ""
        },
        avg_message_count: {
            type: String,
            default: ""
        },
        has_enterprise_CAL: {
            type: String,
            default: ""
        }
    },
    mail_volume_metrics: {
        users_journaled: {
            type: String,
            default: ""
        },
        user_messages: {
            type: String,
            default: ""
        },
        message_derive: {
            type: String,
            default: ""
        },
        avg_message_size: {
            type: String,
            default: ""
        },
        avg_message_count: {
            type: String,
            default: ""
        },
        all_user_journaling: {
            type: String,
            default: ""
        },
        move_to_O365: {
            type: String,
            default: ""
        },
        custom_config: {
            type: String,
            default: ""
        }
    },
    comments: {
        type: String,
        default: ""
    }
});
var journaling_versions_schema = new mongoose.Schema({
  refId: mongoose.Schema.Types.ObjectId,
  versions: [journaling_schema]
});

var JournalingQuestions = mongoose.model("JournalingQuestions", journaling_schema);
var JournalingQuestionsVersions = mongoose.model("JournalingQuestionsVersions", journaling_versions_schema);

// var sample = new JournalingQuestions({
//     _id: "Tesla"
// });
//
// sample.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Successfully inserted journaling questions for customer: " + result);
//     }
// });

module.exports = {JournalingQuestions, JournalingQuestionsVersions};
