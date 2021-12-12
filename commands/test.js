//Builds the actually / command so you can call it
const { SlashCommandBuilder } = require('@discordjs/builders');


//If your going to use embeds make sure you call Messagembed from the discord.js module
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Just for testing purposes.'),
	async execute(interaction) {
	//This will create the enbed
	const LextraEmbed = new MessageEmbed()
	.setColor('RANDOM') // Color
	.setTitle('Lextra Test') //Title
    .setURL('https://github.com/DevSeek') //Some sort of URL
    .setAuthor('Lextra', 'https://images-ext-1.discordapp.net/external/csMbW8hldLTDVtrHSI_Yo_rYMe4bAZD8gOy62W5WBuU/https/cdn.discordapp.com/avatars/917556629711511603/0aa7132648af4c246205a6224f73a4ec.webp', 'https://github.com/DevSeek') //Author URL and IMG
	.setDescription('Basic description') //Description
	.addField('Field Title [1]: Hello!', 'Field Title [2]: Take it easy', true) //Just a single field
	.setTimestamp() //Current time
	.setFooter('Made by: Seek#1101', 'https://images-ext-1.discordapp.net/external/csMbW8hldLTDVtrHSI_Yo_rYMe4bAZD8gOy62W5WBuU/https/cdn.discordapp.com/avatars/917556629711511603/0aa7132648af4c246205a6224f73a4ec.webp');
    interaction.reply({ embeds: [LextraEmbed] });
	},
};