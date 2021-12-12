//fs is just made for handling the commands
const fs = require('fs');


//Don't touch this
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


//Make sure you put your token and your bot id in the config.json
const { clientId, token } = require('./config.json');


//This is just locating the needed files for the commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


//This is for calling rest then after it will launch the bot and load the commands then shut down but if you got this from my git hub you should have the bots start command line https://github.com/DevSeek/Lextra
const rest = new REST({ version: '9' }).setToken(token);
const commands = [];
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}


//More info here: https://discordjs.guide/interactions/registering-slash-commands.html#global-commands
rest.put (
    Routes.applicationCommands(clientId),
    { body: commands },
    console.log(`Registred your (/) commands!`),
);