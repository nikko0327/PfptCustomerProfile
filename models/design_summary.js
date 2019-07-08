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

var DesignSummaryQuestions = mongoose.model("DesignSummaryQuestions", design_summary_schema);


module.exports = DesignSummaryQuestions;