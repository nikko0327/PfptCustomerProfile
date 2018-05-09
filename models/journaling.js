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
            enum: [null, "Yes", "No"],
            default: null
        },
        has_O365: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_mixed_mode: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        number_of_mailboxes: {
            type: String,
            default: null
        },
        avg_message_count: {
            type: String,
            default: null
        },
        change_in_business: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        has_enterprise_CAL: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        }
    },
    mail_volume_metrics: {
        users_journaled: {
            type: String,
            default: null
        },
        user_messages: {
            type: String,
            default: null
        },
        message_derive: {
            type: String,
            default: null
        },
        avg_message_size: {
            type: String,
            default: null
        },
        avg_message_count: {
            type: String,
            default: null
        },
        all_user_journaling: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        move_to_O365: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        custom_config: {
            type: String,
            default: null
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
