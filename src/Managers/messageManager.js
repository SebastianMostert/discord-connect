const { Message } = require("discord.js");
const { isConnectDMToDM, isConnectChannelToDM } = require("..");

/**
 * @param {Message} message
 */
async function handleMessage(message) {
    const { author, channel, client, content } = message;
    if (author.id == client.user.id) return;
    const connectedDMToDM = await isConnectDMToDM({ user: author })
    const connectedChannelToDM = await isConnectChannelToDM({ user: author, channel })

    if (connectedDMToDM.connected) {
        console.log('We are connected via DM')
        const { userID1, userID2 } = connectedDMToDM.data[0];

        const user1 = await client.users.fetch(userID1)
        const user2 = await client.users.fetch(userID2)

        const dmChannel1 = await user1.createDM();
        const dmChannel2 = await user2.createDM();

        if (channel.id == dmChannel1.id) {
            dmChannel2.send(`${user1.tag} <:userphone:1064614619819294780> ${content}`)
        } else if (channel.id == dmChannel2.id) {
            dmChannel1.send(`${user2.tag} <:userphone:1064614619819294780> ${content}`)
        }
        return
    } else if (connectedChannelToDM.connected) {
        console.log('We are connected via channel to DM')
        const data = connectedChannelToDM.data
        for (let i = 0; i < data.length; i++) {
            const element = data[i];

            const _channel = await client.channels.fetch(element.channelID);
            const user = await client.users.fetch(element.userID);

            const dmChannel = await user.createDM();

            if (channel.id == _channel.id) {
                dmChannel.send(`${author.tag} <:userphone:1064614619819294780> ${content}`)
            } else if (channel.id == dmChannel.id) {
                _channel.send(`${user.tag} <:userphone:1064614619819294780> ${content}`)
            }

        }
    } else console.log('We are not connected')

}

module.exports.handleMessage = handleMessage;