const Discord = require('discord.js');
const fs = require('fs');

// initialize Client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const dotenv = require('dotenv');
dotenv.config();

// TODO: Remove json
// TODO: DELETE THE FILE CONFIG.JSON
//const { prefix, TOKEN } = require("./config.json");


// Grab all the commands
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}



// On Load of the bot
client.once('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});




client.on("message", message=> {
    // if message author is a bot/ doesn't start with prefix, ignore
    if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

    // declare the args, command name
    var args = message.content.slice(process.env.prefix.length).trim().split(/ +/);
    var commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    // if no command with said name was found, ignore
    if (!command) return;
    

    if (command.args && !args.length) {
        let reply = `you didn't provide any arguments, ${message.author}`;

        if(command.usage) {
            reply += `\nThe proper usage would beL \`${prefix}${command.name} ${command.usage}\``;
        }


        return message.channel.send(reply);
    }


    try {
        command.execute(message, args);

    } catch (error) {
        console.log(error);
        message.reply("there was an error trying to execute that command!");
    }

});


client.login(process.env.TOKEN);