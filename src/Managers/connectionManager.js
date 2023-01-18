const { User, Client, TextChannel, DMChannel } = require("discord.js");
const { default: mongoose } = require("mongoose");
const typedefs = require("../../typings/typedefs");
const channelToUserSchema = require("../models/channelToUser");
const userToUserSchema = require("../models/userToUser");
const connectToDB = require("./databaseManager");

/**
 * @param {typedefs.discordConnectChannelToUserOptions} options
 */
async function connectChannelToDM(options = {}) {
    const { channel, user, databaseOption } = options
    if (mongoose.connection.readyState != 1 && mongoose.connection.readyState != 2) {
        if (!databaseOption) throw new Error(`No Database connection was found! Please provide the database options in the "connectChannelToDM" function!`)
        await connectToDB(databaseOption);
    }

    if (!(channel instanceof TextChannel) && !(channel instanceof DMChannel)) throw new Error(`The channel you have provided is not a Discord TextChannel`)
    if (!(user instanceof User)) throw new Error(`The User you provided was not a Discord User`)

    const connectedDMToDM1 = await isConnectChannelToDM({ user: user, channel });
    if (connectedDMToDM1.connected) return 'Already connected';

    const params = {
        userID: user.id,
        channelID: channel.id,
        guildID: channel.guild.id,
    }
    let data = await channelToUserSchema.findOneAndUpdate(params, params, { upsert: true })
    if (data == null) data = await channelToUserSchema.findOneAndUpdate(params, params)
    return data
}

/**
 * @param {typedefs.discordConnectUserToUserOptions} options
 */
async function connectDmToDM(options = {}) {
    const { user1, user2, databaseOption } = options
    if (mongoose.connection.readyState != 1 && mongoose.connection.readyState != 2) {
        if (!databaseOption) throw new Error(`No Database connection was found! Please provide the database options in the "connectChannelToDM" function!`)
        await connectToDB(databaseOption);
    }

    if (!(user1 instanceof User)) throw new Error(`The User 1 you provided is not a Discord User`)
    if (!(user2 instanceof User)) throw new Error(`The User 2 you provided is not a Discord User`)

    const connectedDMToDM1 = await isConnectDMToDM({ user: user1 });
    const connectedDMToDM2 = await isConnectDMToDM({ user: user2 });
    if (connectedDMToDM1.connected) return 'Already connected';
    if (connectedDMToDM2.connected) return 'Already connected';

    const params = {
        userID1: user1.id,
        userID2: user2.id,
    }
    let data = await userToUserSchema.findOneAndUpdate(params, params, { upsert: true })
    if (data == null) data = await userToUserSchema.findOneAndUpdate(params, params)
    return data
}

/**
 * @param {typedefs.discordConnectChannelToUserOptions} options
 */
async function disconnectChannelToDM(options = {}) {
    const { channel, user, databaseOption } = options
    if (mongoose.connection.readyState != 1 && mongoose.connection.readyState != 2) {
        if (!databaseOption) throw new Error(`No Database connection was found! Please provide the database options in the "connectChannelToDM" function!`)
        await connectToDB(databaseOption);
    }

    if (!(channel instanceof TextChannel) && !(channel instanceof DMChannel)) throw new Error(`The channel you have provided is not a Discord TextChannel`)
    if (!(user instanceof User)) throw new Error(`The User you provided was not a Discord User`)

    const params = {
        userID: user.id,
        channelID: channel.id,
        guildID: channel.guild.id,
    }
    const data = await channelToUserSchema.findOneAndDelete(params)
    return data
}

/**
 * @param {typedefs.discordConnectUserToUserOptions} options
 */
async function disconnectDmToDM(options = {}) {
    const { user1, user2, databaseOption } = options
    if (mongoose.connection.readyState != 1 && mongoose.connection.readyState != 2) {
        if (!databaseOption) throw new Error(`No Database connection was found! Please provide the database options in the "connectChannelToDM" function!`)
        await connectToDB(databaseOption);
    }

    if (!(user1 instanceof User)) throw new Error(`The User 1 you provided is not a Discord User`)
    if (!(user2 instanceof User)) throw new Error(`The User 2 you provided is not a Discord User`)

    const params1 = {
        userID1: user1.id,
        userID2: user2.id,
    }
    const params2 = {
        userID1: user1.id,
        userID2: user2.id,
    }
    let data = await userToUserSchema.findOneAndDelete(params1)
    if (data) return data;
    data = await userToUserSchema.findOneAndDelete(params2)
    if (data) return data;
}

/**
 * @param {typedefs.discordConnectisConnectedUserToUserOptions} options
 * @returns {Promise<typedefs.discordConnectIsConnected>} 
 */
async function isConnectDMToDM(options = {}) {
    const { user, databaseOption } = options
    if (mongoose.connection.readyState != 1 && mongoose.connection.readyState != 2) {
        if (!databaseOption) throw new Error(`No Database connection was found! Please provide the database options in the "connectChannelToDM" function!`)
        await connectToDB(databaseOption);
    }

    if (!(user instanceof User)) throw new Error(`The User you provided is not a Discord User`)

    const params1 = {
        userID1: user.id,
    }
    const params2 = {
        userID2: user.id,
    }
    let data1 = await userToUserSchema.find(params1);
    if (data1.length != 0) return { connected: true, data: data1 }
    let data2 = await userToUserSchema.find(params2);
    if (data2.length != 0) return { connected: true, data: data2 }
    return { connected: false, data: [] }
}

/**
 * @param {typedefs.discordConnectIsConnectedUserToChannelOptions} options
 * @returns {Promise<typedefs.discordConnectIsConnected>} 
 */
async function isConnectChannelToDM(options = {}) {
    const { channel, user, databaseOption } = options
    if (mongoose.connection.readyState != 1 && mongoose.connection.readyState != 2) {
        if (!databaseOption) throw new Error(`No Database connection was found! Please provide the database options in the "connectChannelToDM" function!`)
        await connectToDB(databaseOption);
    }

    if (!(user instanceof User)) throw new Error(`The User 1 you provided is not a Discord User`)
    if (!(channel instanceof TextChannel) && !(channel instanceof DMChannel)) throw new Error(`The channel you have provided is not a Discord TextChannel or DMChannel`)

    const params1 = {
        channelID: channel?.id,
    }

    const params2 = {
        userID: user?.id,
    }
    let data1 = await channelToUserSchema.find(params1)
    if (data1.length != 0) return { connected: true, data: data1 }
    let data2 = await channelToUserSchema.find(params2)
    if (data2.length != 0) return { connected: true, data: data2 }
    return { connected: false, data: [] }
}

/**
 * @param {typedefs.discordConnectCreateDmOptions} options
 */
async function createAllDMS(options = {}) {
    const { databaseOption, client } = options
    if (mongoose.connection.readyState != 1 && mongoose.connection.readyState != 2) {
        if (!databaseOption) throw new Error(`No Database connection was found! Please provide the database options in the "connectChannelToDM" function!`)
        await connectToDB(databaseOption);
    }

    let data1 = await channelToUserSchema.find()
    for (let i = 0; i < data1.length; i++) {
        const element = data1[i];
        const user = await client.users.fetch(element.userID)
        await user.createDM();
    }
    let data2 = await userToUserSchema.find()
    for (let i = 0; i < data2.length; i++) {
        const element = data2[i];
        const user1 = await client.users.fetch(element.userID1)
        await user1.createDM();

        const user2 = await client.users.fetch(element.userID2)
        await user2.createDM();
    }
}

exports.connectChannelToDM = connectChannelToDM;
exports.connectDmToDM = connectDmToDM;

exports.disconnectChannelToDM = disconnectChannelToDM;
exports.disconnectDmToDM = disconnectDmToDM;

exports.isConnectDMToDM = isConnectDMToDM;
exports.isConnectChannelToDM = isConnectChannelToDM;

exports.createAllDMS = createAllDMS;