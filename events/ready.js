//os allows you to pull info directly from your computer like in this case it's just getting the name of the user you're logged onto
const os = require('os');
const hostName = os.hostname();


//Theses two files below are required for crimson so it can log when the bot goes online and when the status changes
const path = require('path');
const Crimson = require('crimson');


//Alright so now you can look right over to the keep: property and you can decide to keep logs that are contained within this file and you can change Lextra to your bots name
const crimson = new Crimson({ debug: true, path: path.join(__dirname, '../logs'), keep: false, prefix: `[Lextra]`});


module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		//Below this is just some basic console prints with user/server info
		crimson.info(`Ready! logged in as ${client.user.tag}`);
		crimson.info(`♥ Welcome back: ${[hostName]} ♥\n\n`);
		crimson.info(`[Lextra]--> ${client.user.username} is in ${client.guilds.cache.size} servers currently <--[INFO]\n`);
		crimson.info(`[Lextra]--> Lextra has booted!, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds! <--[INFO]\n`);
		

		//Now this right here is something I made a few years ago but hasn't seemed to stop working but this will allow your statuses to cycle
		setInterval(() => {
			const statuses = [


			//feel free to change the statuses to whatever you'd like
			'♥ Type: / for commands! ♥',
			'♥ https://github.com/DevSeek/Lextra ♥',
			`♥ Servers: ${client.guilds.cache.size} ♥`,
			`♥ Users: ${client.users.cache.size} ♥`,
			`♥ Github: DevSeek ♥`,
			`Made By: ${hostName}`]


			//This is the function that randomizes the statuses
			const statuss = statuses[Math.floor(Math.random() * statuses.length)]


			//You can change the status to something like (online, idle, dnd, invisible)
			client.user.setPresence({ activities: [{ name: `${statuss}` }], status: 'dnd', type: 'STREAMING' });
			crimson.success(statuss);
			}, 60000)
	},
};
