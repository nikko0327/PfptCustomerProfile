var mongoose = require("mongoose");

var poc_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    poc_type: {
        type: String,
        default: ""
    },
    poc_tests: {
        type: String,
        default: ""
    },
    agreed_to_success_criteria: {
        type: String,
        default: ""
    },
    envs_needed: {
        type: String,
        default: ""
    },
    how_long_needed: {
        type: String,
        default: ""
    },
    how_to_convert_env: {
        type: String,
        default: ""
    },
    installing_in_production_or_lab: {
        type: String,
        default: ""
    },
    how_many_envs: { // Number
        type: String,
        default: ""
    },
    how_many_mailboxes: { // Number
        type: String,
        default: ""
    },
    comments: {
        type: String,
        default: ""
    }
});
var poc_versions_schema = new mongoose.Schema({
  refId: mongoose.Schema.Types.ObjectId,
  versions: [poc_schema]
});

var POCQuestions = mongoose.model("POCQuestions", poc_schema);
var POCQuestionsVersions = mongoose.model("POCQuestionsVersions", poc_versions_schema);

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

module.exports = {POCQuestions, POCQuestionsVersions};
