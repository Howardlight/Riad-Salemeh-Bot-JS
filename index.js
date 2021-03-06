const { Client, Intents, Collection } = require("discord.js");
const fs = require('fs');


const config = require("./config.json");

const PREFIX = config.PREFIX;
// const TOKEN = config.TOKEN; DELETE THIS


// Specify Intents for Client
const defaultIntents = new Intents();
defaultIntents.add(Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES);

// initialize Client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });
client.commands = new Collection();
client.cooldowns = new Collection();

// dotenv, contains TOKEN and other important
// keys
const dotenv = require('dotenv');
dotenv.config();


// Grab all the commands
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        console.log(`Loaded ${command.name}.js from './commands/${folder}/${file}`);
    }
}


// On Load of the bot
client.once('ready', () => {
    client.user.setActivity('with your dollars');
    console.log(`Logged in as ${client.user.username}! | ${client.user.id}`);
});


client.on("messageCreate", message => {
    // if message author is a bot/ doesn't start with prefix, ignore
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    // declare the args, command name
    var args = message.content.slice(PREFIX.length).trim().split(/ +/);
    var commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    // if no command with said name was found, ignore
    if (!command) return;
    
    // handles cooldowned Commands
    const { cooldowns } = client;
    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if(timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
        
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // handles commands with args
    if (command.args && !args.length) {
        let reply = `you didn't provide any arguments, ${message.author}`;

        if(command.usage) {
            reply += `\nThe proper usage would beL \`${PREFIX}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // Where command actually executes
    try {
        command.execute(message, args);

    } catch (error) {
        console.log(error);
        message.reply("there was an error trying to execute that command!");
    }

});


client.login(process.env.TOKEN);