var mongoose = require("mongoose");

// Can't use joins in NoSQL, can't use foreign keys. Feelsbadman.

var CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    solutionArchitect: {
        type: String,
        default: ""
    },
    salesRep: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: ""
    },
    archivingSe: {
        type: String,
        default: ""
    },
    accManager: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    supervision: {
        type: String,
        default: ""
    },
    tpm: {
        type: String,
        default: ""
    },
    tam: {
        type: String,
        default: ""
    },
    natIp: {
        type: String,
        default: ""
    },
    contacts: [],
    createdBy: {
      type: String,
      default: ""
    },
    incumbentSolution: {
        type: String,
        default: ""
    },
    numberOfMailboxes: {
        type: String,
        default: ""
    },
    comments: {
        type: String,
        default: ""
    },
    existing_archive_prospect: {
        type: Boolean,
        default: false
    },
    existing_archive_customer: {
        type: Boolean,
        default: false
    },
    existing_security_customer: {
        type: Boolean,
        default: false
    },
    is_using_DAG: {
        type: String,
        default: ""
    },
    describe_HA_DR: {
        type: String,
        default: ""
    },
    pso: {
        ticket: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: "Salesforce"
        }
    },
    shipreq: {
        type: String,
        default: ""
    },
    updatedBy: {
      type: String,
      default: ""
    }
},
{
  timestamps: true
});

var Customer = mongoose.model("Customer", CustomerSchema);

// Customer.create({
//     name: "Kearney",
//     status: "OLD",
//     salesRep: "1One",
//     archivingSe: "2Two",
//     accManager: "3Three",
//     location: "4Four",
//     supervision: "5Five",
//     natIp: "6Six",
//     contacts: "7Seven"
// });
//
// var newCustomer = new Customer({
//     _id: "Tesla"
// });
//
// newCustomer.save(function (error, result) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Successfully created customer: " + result["_id"]);
//     }
// });

module.exports = Customer;
