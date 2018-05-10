var mongoose = require("mongoose");

// Can't use joins in NoSQL, can't use foreign keys. Feelsbadman.

var CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    impSpecialist: {
        type: String,
        default: "No response set"
    },
    salesRep: {
        type: String,
        default: "No response set"
    },
    status: {
        type: String,
        default: "No response set"
    },
    archivingSe: {
        type: String,
        default: "No response set"
    },
    accManager: {
        type: String,
        default: "No response set"
    },
    location: {
        type: String,
        default: "No response set"
    },
    supervision: {
        type: String,
        default: "No response set"
    },
    tem: {
        type: String,
        default: "No response set"
    },
    tam: {
        type: String,
        default: "No response set"
    },
    natIp: {
        type: String,
        default: "No response set"
    },
    contacts: {
        type: String,
        default: "No response set"
    },
    created: {
        type: Date,
        default: Date.now
    },
    incumbentSolution: {
        type: String,
        default: "No response set"
    },
    numberOfUsers: {
        type: String,
        default: "No response set"
    }
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