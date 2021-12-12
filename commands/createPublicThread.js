//Builds the actually / command so you can call it
const { SlashCommandBuilder } = require('@discordjs/builders');


//Theses two files below are required for crimson so it can log when the bot goes online and when the status changes
const path = require('path');
const Crimson = require('crimson');


//Alright so now you can look right over to the keep: property and you can decide to keep logs that are contained within this file and you can change Lextra to your bots name
const crimson = new Crimson({ debug: true, path: path.join(__dirname, '../logs'), keep: false, prefix: `[Lextra]`});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('thread-create')
        .addStringOption(option => option.setName('input').setDescription('The input to echo back'))
		.setDescription('Makes a public thread.'),
	async execute(interaction) {
        const ThreadName = interaction.options.getString('input');
        const thread = await interaction.channel.threads.create({
            name: ThreadName,
            reason: 'Needed a separate thread for chatting',
        })
        crimson.success(`Created thread: ${thread.name}`);
        interaction.reply(`I just created your thread: ${thread.name}`)
	},
};