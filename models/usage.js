var mongoose = require('mongoose');

var usage_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    advanced_e_discovery: {
      type: Boolean,
      default: false
    },
    stubbing: {
      type: Boolean,
      default: false
    },
    cc_for_pst: {
      type: Boolean,
      default: false
    },
    folder_sync: {
      type: Boolean,
      default: false
    },
    legal_holds: {
        custodian_or_ad_hoc: {
            type: String,
            default: ""
        },
        number_of_legal_holds: {
            type: String,
            default: ""
        },
        number_of_unique_custodians: {
            type: String,
            default: ""
        },
        largest_hold: {
            type: String,
            default: ""
        },
        notification_system: {
            type: String,
            default: ""
        },
        third_party_solutions: {
            type: String,
            default: ""
        },
        api_use_cases: {
            type: String,
            default: ""
        },
        total_legal_hold_data: {
          type: String,
          default: ""
        }
    },
    export: {
        volume: {
            type: String,
            default: ""
        },
        preferred_export_format: {
            type: String,
            default: ""
        },
        where_data_goes: {
            type: String,
            default: ""
        },
        expect_auto_upload: {
            type: String,
            default: ""
        }
    },
    allow_archive_access: {
        type: String,
        default: ""
    },
    comments: {
        type: String,
        default: ""
    }
});
var usage_versions_schema = new mongoose.Schema({
  refId: mongoose.Schema.Types.ObjectId,
  versions: [usage_schema]
});

var UsageQuestions = mongoose.model("UsageQuestions", usage_schema);
var UsageQuestionsVersions = mongoose.model("UsageQuestionsVersions", usage_versions_schema);

// var sample = new UsageQuestions({
//     _id: "Tesla"
// });
//
// sample.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Successfully created usage questions for customer: " + result["_id"]);
//     }
// });


module.exports = {UsageQuestions, UsageQuestionsVersions};
