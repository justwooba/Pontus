const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const economy = new db.table('economy');
module.exports.run = async (bot, message, args) => {
	let member = message.mentions.members.first();
	if (!message.mentions.users.size) {
		var bal = economy.fetch(`${message.author.id}.bal`);
		if (bal === null) bal = 0;
		var bank = await economy.fetch(`${message.author.id}.bank`);
		if (bank === null || bank == undefined) bank = 0;
		var tag = message.author.tag;
	} else {
		var bal = economy.fetch(`${member.user.id}.bal`);
		if (bal === null) bal = 0;
		var bank = await economy.fetch(`${member.user.id}.bank`);
		if (bank === null || bank == undefined) bank = 0;
		var tag = member.user.tag;
	}
	let moneyEmbed = new MessageEmbed()
		.setTitle(`${tag}\'s balance`)
		.addFields(
			{ name: '**Wallet:**', value: `${bal}` },
			{ name: '**Bank:**', value: `${bank}` }
		);
	message.channel.send(moneyEmbed);
};

module.exports.help = {
	name: 'balance',
	description: 'Shows your wallet and bank balance',
	usage: '(mention)',
	category: 'Economy',
	aliases: ['bal']
};
