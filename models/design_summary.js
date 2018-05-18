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

// var sample = new ApplianceQuestions({
//     _id: "Tesla"
// });
//
// sample.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Successfully created appliance questions for customer: " + result["_id"]);
//     }
// });

module.exports = DesignSummaryQuestions;