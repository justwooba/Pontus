const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const economy = new db.table('economy');
module.exports.run = async (bot, message, args) => {
	let user = message.author;
	let amount = Math.floor(Math.random() * 200) + 1;
	let embed1 = new MessageEmbed()
		.setAuthor(`${message.author.tag}`,`${message.author.displayAvatarURL({ dynamic: true })}`)
		.setDescription(`<:woot:818855862067527692> You begged on the streets and got ${amount} coins!`);
	message.channel.send(embed1);

	economy.add(`${user.id}.bal`, amount);
};

module.exports.help = {
	name: 'beg',
	description: 'Beg for money',
	usage: '',
	category: 'Economy'
};