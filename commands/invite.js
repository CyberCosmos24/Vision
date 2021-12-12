//Builds the actually / command so you can call it
const { SlashCommandBuilder } = require('@discordjs/builders');


//If your going to use embeds make sure you call Messagembed from the discord.js module
const { MessageEmbed } = require('discord.js');


//Make sure you have your bot id set in the config.json or you can get the invite
const { clientId } = require('../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Gives an invite for Lextra'),
	async execute(interaction) {
		const LextraEmbed = new MessageEmbed()
	        .setColor('RANDOM') // Color
	        .setTitle('Lextra Invite') //Title
            .setURL('https://github.com/DevSeek') //Some sort of URL
            .setAuthor('Lextra', 'https://images-ext-1.discordapp.net/external/csMbW8hldLTDVtrHSI_Yo_rYMe4bAZD8gOy62W5WBuU/https/cdn.discordapp.com/avatars/917556629711511603/0aa7132648af4c246205a6224f73a4ec.webp', 'https://github.com/DevSeek') //Author URL and IMG
	        //The line below will find your bots id for you and apply it with admin along with slash commands, So you really don't have to touch it
            .setDescription(`[> Heres your invite!](https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands)`) //Description
	        .setTimestamp() //Current time
            .setFooter('Made by: Seek#1101', 'https://images-ext-1.discordapp.net/external/csMbW8hldLTDVtrHSI_Yo_rYMe4bAZD8gOy62W5WBuU/https/cdn.discordapp.com/avatars/917556629711511603/0aa7132648af4c246205a6224f73a4ec.webp');
        interaction.reply({ embeds: [LextraEmbed] }); //Sends the embed
	},
};