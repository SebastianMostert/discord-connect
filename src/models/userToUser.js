const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
};

module.exports = mongoose.model(
    'discord-connect-user-user',
    new mongoose.Schema({
        userID1: reqString,
        userID2: reqString,
    }),
);
