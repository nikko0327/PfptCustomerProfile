var mongoose = require('mongoose');

var import_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    source_archive: {
      type: String,
      default: ""
    },
    data_volume: {
      type: String,
      default: ""
    },
    extraction_vendor: {
      type: String,
      default: ""
    },
    data_format: {
      type: String,
      default: ""
    },
    retention_policy: {
      type: String,
      default: ""
    },
    comments: {
        type: String,
        default: ""
    }
});
var import_versions_schema = new mongoose.Schema({
  refId: mongoose.Schema.Types.ObjectId,
  versions: [import_schema]
});

var ImportQuestions = mongoose.model("ImportQuestions", import_schema);
var ImportQuestionsVersions = mongoose.model("ImportQuestionsVersions", import_versions_schema);

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

module.exports = {ImportQuestions, ImportQuestionsVersions};
