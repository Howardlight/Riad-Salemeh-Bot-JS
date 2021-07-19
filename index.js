const Discord = require('discord.js');
const client = new Discord.Client();


const dotenv = require('dotenv');
dotenv.config();


client.once('ready', () => {
    console.log("ready!");
});



client.login(process.env.TOKEN);