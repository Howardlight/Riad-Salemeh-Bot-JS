const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const { prefix, TOKEN } = require("./config.json");
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

// TODO: Remove this code
// const dotenv = require('dotenv');
// dotenv.config();


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // creates a new item in the collection
    // with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}



client.once('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on("message", message=> {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    var args = message.content.slice(prefix.length).trim().split(/ +/);
    var command = args.shift().toLowerCase();

    // if no command with said name was found, ignore
    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);

    } catch (error) {
        console.log(error);
        message.reply("there was an error trying to execute that command!");
        
    }

    // if( command === "ping") {
    //     message.channel.send("Pong.");
    // } else if (command === "args-info") {
    //     if(!args.length) {
    //         return message.channel.send(`You didn't provide any arguments, ${message.author}`);
    //     } else if(args[0] === 'foo') {
    //         return message.channel.send("bar");
    //     }

    //     message.channel.send(`First Argument: ${args[0]}`);
    // }
});


client.login(TOKEN);