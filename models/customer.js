var mongoose = require("mongoose");

var CustomerSchema = new mongoose.Schema({
	name: String,
	salesRep: String,
	archivingSe: String,
	accManager: String,
	tem: String,
	tam: String,
	impSpecialist: String,
	numberOfUsers: Integer,
	location: String,
	supervision: String,
	contacts: String,
	status: String,
	natIp: String,
	incumbentSolution: String,
	created: {type: Date, default: Date.now}
});

var Customer = mongoose.model("Customer", CustomerSchema);
module.export = Customer