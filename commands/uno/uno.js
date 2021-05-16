const Discord = require('discord.js');
const { DiscordUNO } = require('discord-uno');
const client = new Discord.Client();
const discordUNO = new DiscordUNO();

module.exports.run = async (bot, message, args) => {
	subcommand = args[0];
	if (subcommand === 'creategame') await discordUNO.createGame(message);
	else if (subcommand === 'join') await discordUNO.addUser(message);
	else if (subcommand === 'leave') await discordUNO.removeUser(message);
	else if (subcommand === 'hand') await discordUNO.viewCards(message);
	else if (subcommand === 'startgame') await discordUNO.startGame(message);
	else if (subcommand === 'use') await discordUNO.playCard(message);
	else if (subcommand === 'closegame') await discordUNO.closeGame(message);
	else if (subcommand === 'endgame') await discordUNO.endGame(message);
	else if (subcommand === 'draw') await discordUNO.draw(message);
	else if (subcommand === 'uno') await discordUNO.UNO(message);
	else if (subcommand === 'gameinfo') await discordUNO.viewTable(message);
};

module.exports.help = {
	name: 'uno',
	description: 'use the subcommands to play uno!',
	category: 'uno'
};
