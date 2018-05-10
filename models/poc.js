var mongoose = require("mongoose");

var poc_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    POC: {
        is_sandbox_poc: {
            type: String,
            default: "No response set"
        },
        is_prod_poc: {
            type: String,
            default: "No response set"
        },
        poc_tests: {
            type: String,
            default: "No response set"
        },
        agreed_to_success_criteria: {
            type: String,
            default: "No response set"
        },
        envs_needed: {
            type: String,
            default: "No response set"
        },
        how_long_needed: {
            type: String,
            default: "No response set"
        },
        how_to_convert_env: {
            type: String,
            default: "No response set"
        },
        installing_in_production_or_lab: {
            type: String,
            default: "No response set"
        },
        how_many_envs: { // Number
            type: String,
            default: "No response set"
        },
        how_many_mailboxes: { // Number
            type: String,
            default: "No response set"
        }
    },
    UAT: {
        need_UAT: {
            type: String,
            default: "No response set"
        },
        UAT_forever: {
            type: String,
            default: "No response set"
        },
        is_UAT_production_or_lab: {
            type: String,
            //enum: ["No response set, "Production", "Lab"],
            default: "No response set"
        },
        primary_purpose: {
            type: String,
            default: "No response set"
        }
    }
});

var POCQuestions = mongoose.model("POCQuestions", poc_schema);

// var sample = new POCQuestions({
//     _id: "Tesla"
// });
//
// sample.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Successfully inserted POC questions for customer: " + result["_id"]);
//     }
// });

module.exports = POCQuestions;