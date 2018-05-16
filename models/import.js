var mongoose = require('mongoose');

var import_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    need_to_migrate_legacy_data: {
        type: String,
        default: ""
    },
    is_existing_archive: {
        type: String,
        default: ""
    },
    amount_of_data_to_migrate: {
        type: String,
        default: ""
    },
    expected_timeline: {
        type: String,
        default: ""
    },
    conversion_agent: {
        type: String,
        default: ""
    },
    service_brief: {
        type: String,
        default: ""
    },
    storage: {
        type: String,
        default: ""
    },
    format: {
        type: String,
        default: ""
    },
    retention_policy: {
        type: String,
        default: ""
    },
    encryption_type: {
        type: String,
        default: ""
    },
    oldest_data: {
        type: String,
        default: ""
    },
    employee_records: {
        type: String,
        default: ""
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