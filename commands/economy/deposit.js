const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const economy = new db.table('economy');
module.exports.run = async (bot, message, args) => {
	wallet = economy.fetch(`${message.author.id}.bal`);
	msgArray = message.content.split(' ');
	depAmount = msgArray[1];
	if (depAmount == 'all') {
		var depAmount = wallet;
	}
	if (wallet < depAmount)
		return message.channel.send(
			"You don't have that much money in your wallet!"
		);
	economy.add(`${message.author.id}.bal`, `-${depAmount}`);
	economy.add(`${message.author.id}.bank`, depAmount);
	message.channel.send(`Deposited ${depAmount} into your bank account!`);
};

module.exports.help = {
	name: 'deposit',
	description: 'Deposits money into your bank account',
	usage: '<amount>',
	category: 'Economy',
	aliases: ['dep']
};