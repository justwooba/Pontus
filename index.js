// begins constants and command handlers
const { readdirSync } = require('fs');
const { sep } = require('path');
const { Client, Collection } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('./config');
const bot = new Client();
bot.config = config;
['commands', 'aliases'].forEach(x => (bot[x] = new Collection()));
// command handler
const load = (dir = './commands/') => {
	readdirSync(dir).forEach(dirs => {
		const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files =>
			files.endsWith('.js')
		);
		for (const file of commands) {
			const pull = require(`${dir}/${dirs}/${file}`);
			if (
				pull.help &&
				typeof pull.help.name === 'string' &&
				typeof pull.help.category === 'string'
			) {
				if (bot.commands.get(pull.help.name))
					return console.warn(
						`Warning: two or more commands have the same name ${
							pull.help.name
						}.`
					);
				bot.commands.set(pull.help.name, pull);
				console.log(`Loaded command ${pull.help.name}.`);
			} else {
				console.log(`Error loading command in ${dir}${dirs}.`);
				continue;
			}
			if (pull.help.aliases && typeof pull.help.aliases === 'object') {
				pull.help.aliases.forEach(alias => {
					if (bot.aliases.get(alias))
						return console.warn(
							 `Warning: two commands or more commands have the same aliases ${alias}`
						);
					bot.aliases.set(alias, pull.help.name);
				});
			}
		}
	});
};
// do sum magik
load();
// bot starts, woo!
bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
	bot.user.setPresence({
		activity: {
			name: 'Bridging the distance',
			type: 'PLAYING'
		},
		status: 'online'
	});
});
// send all messages to console so i can spy on people
bot.on('message', message => {
	console.log(`<${message.author.tag}> ${message.content}`);
});
// snipe variables
bot.on('messageDelete', messageDelete => {
	deletedMessage = `${messageDelete.content}`;
	deletedAuthor = `Message deleted by ${messageDelete.author.tag}`;
	deletedAuthorPfp = `${messageDelete.author.displayAvatarURL({
		dynamic: true
	})}`;
	deletedChannel = `Sniped message from ${messageDelete.channel}`;
	setTimeout(() => {
		deletedMessage = undefined;
		deletedAuthor = undefined;
		deletedAuthorPfp = undefined;
		deletedChannel = undefined;
	}, 900000);
});
// editsnipe variables
bot.on('messageUpdate', (oldMessage, newMessage) => {
	editedMessage = `Before: ${oldMessage.content}\nAfter: ${newMessage}`;
	editedAuthor = `Message edited by ${oldMessage.author.tag}`;
	editedAuthorPfp = `${oldMessage.author.displayAvatarURL({ dynamic: true })}`;
	editedChannel = `Sniped message from ${oldMessage.channel}`;
	setTimeout(() => {
		editedMessage = undefined;
		editedAuthor = undefined;
		editedAuthorPfp = undefined;
		editedChannel = undefined;
	}, 900000);
});
bot.on('message', async message => {
	const prefix = bot.config.prefix;
	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();
	let command;
	if (message.author.bot) return;
	if (!message.member)
		message.member = await message.guild.fetchMember(message.author);
	if (!message.content.startsWith(prefix)) return;
  if (cmd.length === 0) return;
	if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
	else if (bot.aliases.has(cmd))
		command = bot.commands.get(bot.aliases.get(cmd));
	if (command) command.run(bot, message, args);
	//snipe commands
	if (cmd === 'snipe') {
		if (typeof deletedAuthorPfp === 'undefined') {
			snipeEmbed = new MessageEmbed().setDescription(
				'There is nothing to snipe!'
			);
		} else {
			snipeEmbed = new MessageEmbed()
				.setAuthor(`${deletedAuthor}`, `${deletedAuthorPfp}`)
				.setTitle(`${deletedChannel}`)
				.setDescription(`${deletedMessage}`)
				.setFooter(
					`Sniped by ${message.author.tag}`,
					`${message.author.displayAvatarURL({ dynamic: true })}`
				);
		}
		message.channel.send(snipeEmbed);
	} else if (cmd === 'editsnipe') {
		if (typeof editedAuthorPfp === 'undefined') {
			editsnipeEmbed = new MessageEmbed().setDescription(
				'There is nothing to snipe!'
			);
		} else {
			editsnipeEmbed = new MessageEmbed()
				.setAuthor(`${editedAuthor}`, `${editedAuthorPfp}`)
				.setTitle(`${editedChannel}`)
				.setDescription(`${editedMessage}`)
				.setFooter(
					`Sniped by ${message.author.tag}`,
					`${message.author.displayAvatarURL({ dynamic: true })}`
				);
		}
		message.channel.send(editsnipeEmbed);
	}
});
bot.login(bot.config.token).catch(console.error());
// nothing to see below this