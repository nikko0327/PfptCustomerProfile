var mongoose = require("mongoose");

var CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    impSpecialist: {
        type: String,
        default: null
    },
    salesRep: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: null
    },
    archivingSe: {
        type: String,
        default: null
    },
    accManager: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    supervision: {
        type: String,
        default: null
    },
    tem: {
        type: String,
        default: null
    },
    tam: {
        type: String,
        default: null
    },
    natIp: {
        type: String,
        default: null
    },
    contacts: {
        type: String,
        default: null
    },
    created: {
        type: Date,
        default: Date.now
    },
    incumbentSolution: {
        type: String,
        default: null
    },
    numberOfUsers: {
        type: String,
        default: null
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