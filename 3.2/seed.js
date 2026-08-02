const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/sit725");

const ServiceSchema = new mongoose.Schema({
    serviceName: String,
    category: String,
    location: String,
    contact: String,
    description: String
});

const Service = mongoose.model("Service", ServiceSchema);

const sampleService = new Service({
    serviceName: "Rural Health Support",
    category: "Healthcare",
    location: "Victoria",
    contact: "1800 123 456",
    description: "Provides AI-powered guidance and connects users to nearby healthcare services."
});

sampleService.save()
.then(() => {
    console.log("Service added successfully.");
    mongoose.disconnect();
})
.catch(err => console.log(err));