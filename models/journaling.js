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
            default: "No response set"
        },
        has_O365: {
            type: String,
            default: "No response set"
        },
        is_mixed_mode: {
            type: String,
            default: "No response set"
        },
        number_of_mailboxes: {
            type: String,
            default: "No response set"
        },
        avg_message_count: {
            type: String,
            default: "No response set"
        },
        change_in_business: {
            type: String,
            default: "No response set"
        },
        has_enterprise_CAL: {
            type: String,
            default: "No response set"
        }
    },
    mail_volume_metrics: {
        users_journaled: {
            type: String,
            default: "No response set"
        },
        user_messages: {
            type: String,
            default: "No response set"
        },
        message_derive: {
            type: String,
            default: "No response set"
        },
        avg_message_size: {
            type: String,
            default: "No response set"
        },
        avg_message_count: {
            type: String,
            default: "No response set"
        },
        all_user_journaling: {
            type: String,
            default: "No response set"
        },
        move_to_O365: {
            type: String,
            default: "No response set"
        },
        custom_config: {
            type: String,
            default: "No response set"
        }
    }
});

var JournalingQuestions = mongoose.model("JournalingQuestions", journaling_schema);

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

module.exports = JournalingQuestions;
