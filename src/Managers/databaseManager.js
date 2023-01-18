const { default: mongoose } = require("mongoose");
const typedefs = require("../../typings/typedefs");

/**
 * @param {typedefs.discordConnectDatabaseOptions} options 
 */
async function connectToDB(options) {
    const { URI, connectOptions } = options;
    await mongoose.connect(URI, connectOptions).catch(err => {
        throw new Error('There was an error while connecting to the Database. Error: ' + err)
    });
}

module.exports = connectToDB