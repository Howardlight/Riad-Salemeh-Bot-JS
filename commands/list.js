const Discord = require("../node_modules/discord.js");


module.exports = {
    name: "list",
    description: "",
    execute(message, args) {
        import client from "../index";

        let serverlist = " "
        client.guilds.cache.forEach((guild) => {
            serverlist = serverlist.concat(" - " + guild.name + " : ID: " + guild.id + "\n");
        });

        message.channel.send(serverlist);
    }
};