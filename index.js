const Discord = require('discord.js');
const client = new Discord.Client();


const { prefix, TOKEN } = require("./config.json");


// const dotenv = require('dotenv');
// dotenv.config();

// TODO: Mention in the console message
// which bot is logged in
client.once('ready', () => {
    console.log("Logged in!");
});

client.on("message", message=> {

    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send("pong.");
    } else if (message.content.startsWith(`${prefix}beep`)) {
        message.channel.send("Boop.");
    } else if(message.content == `${prefix}server`) {
        message.channel.send(`This server's name is: ${message.guild.name}`);
    }  





});



client.login(TOKEN);