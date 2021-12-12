//Builds the actually / command so you can call it
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('Seek\'s Shutdown command.'),
	async execute(interaction) {
		//Make sure you apply your discord id here otherwise you won't be able to execute it 
        if (interaction.user.id === '398495352753356814') {
			//This is all it takes for shutting the bot
            process.exit();
        }
	},
};