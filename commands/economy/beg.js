const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const economy = new db.table('economy');
module.exports.run = async (bot, message, args) => {
	let user = message.author;
	let amount = Math.floor(Math.random() * 200) + 1;
	let embed1 = new MessageEmbed()
		.setAuthor(
			`${message.author.tag}`,
			`${message.author.displayAvatarURL({ dynamic: true })}`
		)
		.setDescription(
			`<:woot:843466680649646120> You worked hard and got ${amount} coins!`
		);
	message.channel.send(embed1);

	economy.add(`${user.id}.bal`, amount);
};

module.exports.help = {
	name: 'work',
	description: 'Work for money',
	usage: '',
	category: 'Economy'
};
