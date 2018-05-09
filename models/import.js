var mongoose = require('mongoose');

var import_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    need_to_migrate_legacy_data: {
        type: String,
        enum: [null, "Yes", "No"],
        default: null
    },
    is_existing_archive: {
        type: String,
        enum: [null, "Yes", "No"],
        default: null
    },
    amount_of_data_to_migrate: {
        type: String,
        default: null
    },
    expected_timeline: {
        type: String,
        default: null
    },
    conversion_agent: {
        type: String,
        default: null
    },
    service_brief: {
        type: String,
        default: null
    },
    storage: {
        type: String,
        default: null
    },
    format: {
        type: String,
        default: null
    },
    retention_policy: {
        type: String,
        default: null
    },
    encryption_type: {
        type: String,
        default: null
    },
    oldest_data: {
        type: String,
        default: null
    },
    employee_records: {
        type: String,
        default: null
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