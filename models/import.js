var mongoose = require('mongoose');

var import_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    need_to_migrate_legacy_data: {
        type: String,
        default: "No response set"
    },
    is_existing_archive: {
        type: String,
        default: "No response set"
    },
    amount_of_data_to_migrate: {
        type: String,
        default: "No response set"
    },
    expected_timeline: {
        type: String,
        default: "No response set"
    },
    conversion_agent: {
        type: String,
        default: "No response set"
    },
    service_brief: {
        type: String,
        default: "No response set"
    },
    storage: {
        type: String,
        default: "No response set"
    },
    format: {
        type: String,
        default: "No response set"
    },
    retention_policy: {
        type: String,
        default: "No response set"
    },
    encryption_type: {
        type: String,
        default: "No response set"
    },
    oldest_data: {
        type: String,
        default: "No response set"
    },
    employee_records: {
        type: String,
        default: "No response set"
    }
});

var ImportQuestions = mongoose.model("ImportQuestions", import_schema);

// var sample = new ImportQuestions({
//     _id: "Tesla"
// });
//
// sample.save(function(error, result) {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log("Successfully inserted import questions for " + result['_id']);
//     }
// });

module.exports = ImportQuestions;