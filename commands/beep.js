//Builds the actually / command so you can call it
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beep')
		.setDescription('Beep!'),
	async execute(interaction) {
		return interaction.reply('Boop!');
	},
};
