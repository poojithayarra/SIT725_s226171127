const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sit725";

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Service Schema
const ServiceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
        minlength: 3
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Service = mongoose.model("Service", ServiceSchema);

const seedServices = async () => {
    const count = await Service.countDocuments();

    if (count === 0) {
        const initialServices = [
            {
                serviceName: "Food Relief Hub",
                category: "Food Support",
                location: "Geelong",
                contact: "0400 111 222",
                description: "Provides emergency food parcels and pantry staples to families facing hardship."
            },
            {
                serviceName: "Youth Wellbeing Centre",
                category: "Mental Health",
                location: "Burwood",
                contact: "0400 222 333",
                description: "Offers counselling, peer support, and safe spaces for young people navigating stress or uncertainty."
            },
            {
                serviceName: "Community Transport Service",
                category: "Transport",
                location: "Warrnambool",
                contact: "0400 333 444",
                description: "Helps residents reach appointments, community programs, and essential services with reliable transport support."
            }
        ];

        await Service.insertMany(initialServices);
        console.log("Seed data inserted");
    }
};

// Get all services
app.get("/api/services", async (req, res) => {

    try {

        const services = await Service.find();

        res.json({
            statusCode: 200,
            data: services,
            message: "Services retrieved successfully"
        });

    } catch (err) {

        res.status(500).json({
            statusCode: 500,
            message: err.message
        });

    }

});

// Create a new service
app.post("/api/services", async (req, res) => {
    try {
        const newService = new Service(req.body);
        const savedService = await newService.save();

        res.status(201).json({
            statusCode: 201,
            data: savedService,
            message: "Service created successfully"
        });
    } catch (err) {
        res.status(400).json({
            statusCode: 400,
            message: err.message
        });
    }
});

const startServer = (selectedPort) => {
    const server = app.listen(selectedPort, () => {
        console.log(`Server running on port ${selectedPort}`);
    });

    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            const nextPort = selectedPort + 1;
            console.log(`Port ${selectedPort} is in use. Trying ${nextPort}...`);
            startServer(nextPort);
        } else {
            console.error(err);
        }
    });
};

mongoose.connect(mongoUri)
    .then(async () => {
        console.log("Connected to MongoDB");
        await seedServices();
        startServer(port);
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });