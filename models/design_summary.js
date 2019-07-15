var mongoose = require("mongoose");

var design_summary_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    mail_system_in_use: {
        type: String,
        default: ""
    },
    comments: {
        type: String,
        default: ""
    }
});
var design_summary_versions_schema = new mongoose.Schema({
  refId: mongoose.Schema.Types.ObjectId,
  versions: [design_summary_schema]
});

var DesignSummaryQuestions = mongoose.model("DesignSummaryQuestions", design_summary_schema);
var DesignSummaryQuestionsVersions = mongoose.model("DesignSummaryQuestionsVersions", design_summary_versions_schema);


module.exports = {DesignSummaryQuestions, DesignSummaryQuestionsVersions};
