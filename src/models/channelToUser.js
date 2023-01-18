const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

module.exports = mongoose.model(
	'discord-connect-channel-user',
	new mongoose.Schema({
		userID: reqString,
		channelID: reqString,
		guildID: reqString
	}),
);
