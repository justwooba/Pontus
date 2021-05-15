const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const economy = new db.table('economy');
module.exports.run = async (bot, message, args) => {
	if (!bot.config.owners.includes(message.author.id)) return message.channel.send("You must be the developer to use this command!");
	if (!message.mentions.users.size) return message.channel.send('You need to mention a user!');
	var member = message.mentions.members.first();
	msgArray = message.content.split(' ');
	addAmount = msgArray[1];
	if (addAmount === null || isNaN(addAmount)) return message.channel.send('Please provide a valid number!');
	economy.add(`${member.user.id}.bal`, addAmount);
	message.channel.send(`Added ${addAmount} to ${member.user.tag}\'s balance!`)
};

module.exports.help = {
	name: 'addmoney',
	description: 'Adds money to a user\'s balance',
	usage: '<amount> <mention>',
	category: 'Developer'
};
