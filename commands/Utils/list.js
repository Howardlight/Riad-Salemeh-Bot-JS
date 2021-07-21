// const Discord = require(".../node_modules/discord.js");


module.exports = {
    name: "list",
    description: "Display a list of servers the bot is present in",
    execute(message, args) {

        if(message.author.id === "689419768666521631"){

            message.client.guilds.cache.forEach(guild => {
                console.log(`${guild.name} | ${guild.id}`);
                message.channel.send(`${guild.name} | ${guild.id}`);
            })

        } else return ;
    }
};