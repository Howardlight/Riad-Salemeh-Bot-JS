// get the prefix
// const dotenv = require("../../node_modules/dotenv");
// dotenv.config;
// import {PREFIX} from "../../config.json";
const config = require("../../config.json");
const prefix = config.PREFIX;

module.exports = {
    name: 'help',
    description: "list all commands",
    usage: "[command name]",
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;


        if(!args.length) {
            data.push(`Here's a list of all my commands:`);
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);



            return message.author.send(data, {split: true})
                .then(() => {
                    if(message.channel.type === 'dm') return;
                    message.reply(`I've sent you a DM with all my commands!`);
                })
                .catch(error => {
                    console.error(`Could not sent help DM to ${mesasge.author.tag}.\n`, error);
                    message.reply('it seems like i can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command) {
            return message.reply('That\'s not a valid command.');
        }

        data.push(`**Name:**  ${command.name}`);

        if(command.aliases) data.push(`**aliases** ${command.aliases.join(', ')}`);
        if(command.description) data.push(`**Description:** ${command.description}`);
        if(command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, {split: true});
    },



};