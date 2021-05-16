const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const economy = new db.table('economy');
module.exports.run = async (bot, message, args) => {
	if (!message.mentions.users.size)
		return message.channel.send('You need to mention a user!');
	var member = message.mentions.members.first();
	msgArray = message.content.split(' ');
	addAmount = msgArray[1];
	if (message.author.id === member.user.id)
		return message.channel.send(
			"You can't give yourself money, please mention someone else!"
		);
	if (addAmount === null || isNaN(addAmount) || addAmount < 1)
		return message.channel.send('Please provide a valid number!');
	if (economy.fetch < addAmount)
		return message.channel.send("You don't have that much money!");
	economy.add(`${message.author.id}.bal`, `-${addAmount}`);
	economy.add(`${member.user.id}.bal`, addAmount);
	message.channel.send(`Added ${addAmount} to ${member.user.tag}\'s balance!`);
};

module.exports.help = {
	name: 'give',
	description: "Gives money to a user's balance",
	usage: '<amount> <mention>',
	category: 'Economy',
	aliases: ['gift']
};
