const mongoose = require('mongoose');

function getConnectionUri() {
    if(process.env.NODE_ENV === "development") {
        return process.env.MONGO_DB_URi_DEV
    } else if(process.env.NODE_ENV === "production") {
        return process.env.MONGO_DB_URi_PROD
    }
}

async function initiateDBConnection() {
    const connectionUri = getConnectionUri();
    try {
        const connection = await mongoose.connect(connectionUri);
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