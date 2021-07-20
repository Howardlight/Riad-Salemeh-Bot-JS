// const Discord = require(".../node_modules/discord.js");

module.exports = {
    name: "ping",
    description: "Ping!",
    args: true,
    execute(message, args) {
        if (args[0] === "foo"){
            return message.channel.send("bar");
        }

        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`)
    }
};