const Discord = require('discord.js');
const db = require('quick.db');
const economy = new db.table('economy');
module.exports.run = async (bot, message, args) => {
	if (!message.mentions.users.size)
		return message.channel.send('Please mention someone to rob!');
	let user = message.mentions.members.first();
	let targetuser = await economy.fetch(`${user.id}.bal`);
	let author2 = await economy.fetch(`${message.author.id}.bal`);
	let moneyEmbed2 = new Discord.MessageEmbed()
		.setColor('000000')
		.setDescription(`${user.username} is too poor to be robbed`);
	if (targetuser < 10) {
		return message.channel.send(moneyEmbed2);
	}
	let random = Math.floor(Math.random() * 200) + 1;
	let embed = new Discord.MessageEmbed()
		.setDescription(`You robbed ${user} and got away with ${random} coins!`)
		.setColor('000000');
	message.channel.send(embed);
	economy.subtract(`${user.id}.bal`, random);
	economy.add(`${message.author.id}.bal`, random);
};

module.exports.help = {
	name: 'rob',
	description: 'Robs another victim',
	usage: '<mention>',
	category: 'Economy'
};
