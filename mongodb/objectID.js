/*
    Object ID [12 bytes]:
    * 4 bytes : Timestamp
    * 3 bytes : Machine Identifier
    * 2 bytes : Process Identifier
    * 3 bytes : Counter
*/
const mongoose = require("mongoose");

const newID = new mongoose.Types.ObjectId();
console.log("New Object ID", newID.toHexString());
console.log("Time Stamp", newID.getTimestamp());

console.log(mongoose.Types.ObjectId.isValid("1234"));
