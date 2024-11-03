const mongoose = require('mongoose');

async function initiateDBConnection() {
    try {
        const connection = await mongoose.connect("mongodb://localhost:27017/recipes");
        if (connection) {
            console.log("DB Connection Established")
        } else {
            throw new Error("DB Connection could not be established")
        }
    } catch (error) {
        console.log(error.message)
    }
}

initiateDBConnection();