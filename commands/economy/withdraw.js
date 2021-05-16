const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const economy = new db.table('economy');
module.exports.run = async (bot, message, args) => {
	bank = economy.fetch(`${message.author.id}.bank`);
	msgArray = message.content.split(' ');
	withAmount = msgArray[1];
	if (withAmount == 'all') {
		var withAmount = bank;
	}
	if (bank < withAmount)
		return message.channel.send(
			"You don't have that much money in your bank account!"
		);
	economy.add(`${message.author.id}.bank`, `-${withAmount}`);
	economy.add(`${message.author.id}.bal`, withAmount);
	message.channel.send(`Withdrew ${withAmount} from your bank account!`);
};

module.exports.help = {
	name: 'withdraw',
	description: 'Withdraws money from your bank account',
	usage: '<amount>',
	category: 'Economy',
	aliases: ['with']
};