const { TextChannel, User, DMChannel, Client } = require("discord.js");
const { default: mongoose } = require("mongoose");

/**
 * @typedef {object} discordConnectDatabaseOptions
 * @property {string} URI The uri of the Database
 * @property {mongoose.ConnectOptions} connectOptions The options for the Database
 */

/**
 * @typedef {object} discordConnectChannelToUserOptions
 * @property {TextChannel} channel The channel to conect to 
 * @property {User} user The user to connect too
 * @property {?discordConnectDatabaseOptions} databaseOption The database options object (only needed if you havent already connected to mongodb)
 */

/**
 * @typedef {object} discordConnectUserToUserOptions
 * @property {User} user1 The user 1 to connect too
 * @property {User} user2 The user 2 to connect too
 * @property {?discordConnectDatabaseOptions} databaseOption The database options object (only needed if you havent already connected to mongodb)
 */

/**
 * @typedef {object} discordConnectIsConnectedUserToUserOptions
 * @property {User} user
 * @property {?discordConnectDatabaseOptions} databaseOption The database options object (only needed if you havent already connected to mongodb)
 */

/**
 * @typedef {object} discordConnectIsConnectedUserToChannelOptions
 * @property {User} user
 * @property {(TextChannel|DMChannel)} channel
 * @property {?discordConnectDatabaseOptions} databaseOption The database options object (only needed if you havent already connected to mongodb)
 */

/**
 * @typedef {object} discordConnectCreateDmOptions
 * @property {Client} client
 * @property {?discordConnectDatabaseOptions} databaseOption The database options object (only needed if you havent already connected to mongodb)
 */

/**
 * @typedef {object} discordConnectIsConnected
 * @property {boolean} connected Whether or not their is a connection
 * @property {Array} data The array of all the connections
 */
exports.unused = {};