var mongoose = require("mongoose");

var rfe_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    showstoppers_buy: {
        type: String,
        default: ""
    },
    showstoppers_rollout: {
        type: String,
        default: ""
    },
    parity_features: {
        type: String,
        default: ""
    },
    nice_to_haves: {
        type: String,
        default: ""
    },
    comments: {
        type: String,
        default: ""
    }
});

var RFEQuestions = mongoose.model("RFEQuestions", rfe_schema);

module.exports = RFEQuestions;