//fs is just made for handling the commands which you'll see shortly
const fs = require('fs');


//path is for crimson so it can locate/create a folder for the log file
const path = require("path");
//Crimson is a logger I found like 6 months ago and I found it really useful for logging just about everything
const Crimson = require('crimson');


//This is just the basic classes for discord.js
const { Client, Collection, Intents } = require('discord.js');


//Make sure you've applied a token in the config.json
const { token } = require('./config.json');


//These are the required intents for the bot to call on for functions that require them
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_PRESENCES] });


//Alright so now you can look right over to the keep: property and you can decide to keep logs that are contained within this file and you can change Lextra to your bots name
const crimson = new Crimson({ debug: true})


//These two strings are for locating the folders that are required and for finding the file type
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));


//Command Handler 
client.commands = new Collection();
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


//Slash Command Handler 
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return; try { await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', message => {
    crimson.info(`\n[${message.channel.guild}] - [${message.author.tag}]>: ` + message.content);
});

// When a message gets deleted 
client.on('messageDelete', async message => {
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	const deletionLog = fetchedLogs.entries.first();
	if (!deletionLog) return crimson.info(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
	const { executor, target } = deletionLog;
	if (target.id === message.author.id) {
		crimson.info(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
	} else {
		crimson.info(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
	}
});

// When a guild member gets kicked 
client.on('guildMemberRemove', async member => {
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
	const kickLog = fetchedLogs.entries.first();
	if (!kickLog) return crimson.info(`${member.user.tag} left the guild, most likely of their own will.`);
	const { executor, target } = kickLog;
	if (target.id === member.id) {
		crimson.info(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
	} else {
		crimson.info(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
	}
});


// When a guild member is banned 
client.on('guildBanAdd', async ban => {
	const fetchedLogs = await ban.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	const banLog = fetchedLogs.entries.first();
	if (!banLog) return crimson.info(`${ban.user.tag} was banned from ${ban.guild.name} but no audit log could be found.`);
	const { executor, target } = banLog;
	if (target.id === ban.user.id) {
		crimson.info(`${ban.user.tag} got hit with the swift hammer of justice in the guild ${ban.guild.name}, wielded by the mighty ${executor.tag}`);
	} else {
		crimson.info(`${ban.user.tag} got hit with the swift hammer of justice in the guild ${ban.guild.name}, audit log fetch was inconclusive.`);
	}
});


//Just logs the fact someone created a thread and the one below it logs if a thread is deleted
client.on('threadCreate', thread => {
	crimson.info(`Thread created with name -- ${thread.name}`);
});
client.on('threadDelete', thread => {
	crimson.info(`Thread deleted with name -- ${thread.name}`);
});





client.on("debug", function (info) {
	console.log(`debug -> ${info}`);
	crimson.info(info);
  });

  client.login(token);