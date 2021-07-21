// const Discord = require(".../node_modules/discord.js");


module.exports = {
    name: "link",
    description: 
    "Returns a link to invite the bot, \n**Permissions:** \
Manage Channels, Create Invite, Read Messages, Send Messages,\
Manage Messages, Embed Links, Attach Files, read Message history\
Add Reactions, Connect, Speak, Use Voice Activity",
    execute(message, args) {
        message.channel.send(
            "https://discord.com/oauth2/authorize?client_id=826815896718540850&scope=bot&permissions=36826705");
    }
};