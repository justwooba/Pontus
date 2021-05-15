const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
	var pppong = Date.now() - message.createdTimestamp;
	if (pppong >= 65 && pppong <= 100) {
		var color = '#ffd000';
	} else if (0 <= pppong && pppong < 65) {
		var color = '#00ff00';
	} else if (pppong < 0) {
		var color = '#0000ff';
	} else {
		var color = '#ff0000';
	}
	const pingEmbed = new Discord.MessageEmbed()
		.setTitle('Pong!')
		.setDescription(`🏓 The latency is **${pppong}** ms!`)
		.setColor(`${color}`);
	message.channel.send(pingEmbed);
};

module.exports.help = {
	name: 'ping',
	description: 'shows bot latency',
	usage: '',
	category: 'General',
	aliases: ['status']
};
