var mongoose = require("mongoose");

var CustomerSchema = new mongoose.Schema({
	name: String,
	status: String,
	salesRep: String,
	archivingSe: String,
	accManager: String,
	location: String,
	supervision: String,
	natIp: String,
	contacts: String,
	created: {type: Date, default: Date.now}
});

var Customer = mongoose.model("Customer", CustomerSchema);
module.export = Customer