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
            enum: [null, "Yes", "No"],
            default: null
        },
        is_prod_poc: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        poc_tests: {
            type: String,
            default: null
        },
        agreed_to_success_criteria: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        envs_needed: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        how_long_needed: {
            type: String,
            default: null
        },
        how_to_convert_env: {
            type: String,
            default: null
        },
        installing_in_production_or_lab: {
            type: String,
            default: null
        },
        how_many_envs: { // Number
            type: String,
            default: null
        },
        how_many_mailboxes: { // Number
            type: String,
            default: null
        }
    },
    UAT: {
        need_UAT: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        UAT_forever: {
            type: String,
            enum: [null, "Yes", "No"],
            default: null
        },
        is_UAT_production_or_lab: {
            type: String,
            //enum: [null, "Production", "Lab"],
            default: null
        },
        primary_purpose: {
            type: String,
            default: null
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