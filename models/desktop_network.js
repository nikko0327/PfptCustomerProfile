var mongoose = require("mongoose");
// var Schema = mongoose.Schema;

var desktop_network_schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    allow_outside_access: {
        type: String,
        default: ""
    },
    nat_IP_list: {
        type: String,
        default: ""
    },
    use_SSO: {
        type: String,
        default: ""
    },
    have_IDP: {
        type: String,
        default: ""
    },
    where_security_group: {
        type: String,
        default: ""
    },
    initiated_IDP: {
        type: String,
        default: ""
    },
    require_request_encryption: { // Not supported
        type: String,
        default: ""
    },
    require_response_signing: { // supported
        type: String,
        default: ""
    },
    require_response_encryption: {
        type: String,
        default: ""
    },
    require_third_party_cert: {
        type: String,
        default: ""
    },
    response_attributes: {
        type: String,
        default: ""
    },
    intend_to_deploy_remote_auth: {
        type: String,
        default: ""
    },
    all_users_trusted: {
        type: String,
        default: ""
    },
    domain_controllers: {
        type: String,
        default: ""
    },
    comments: {
        type: String,
        default: ""
    }
});
var desktop_network_versions_schema = new mongoose.Schema({
  refId: mongoose.Schema.Types.ObjectId,
  versions: [desktop_network_schema]
});

var DesktopNetworkQuestions = mongoose.model("DesktopNetworkQuestions", desktop_network_schema);
var DesktopNetworkQuestionsVersions = mongoose.model("DesktopNetworkQuestionsVersions", desktop_network_versions_schema);

// var newCustomer = new DesktopNetworkQuestions({
//     _id: "Tesla"
// });
//
// newCustomer.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Successfully created desktop network questions for customer: " + result["_id"]);
//     }
// });

module.exports = {DesktopNetworkQuestions, DesktopNetworkQuestionsVersions};
