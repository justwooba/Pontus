const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args) => {
	if (!message.mentions.users.size) {
		avatarEmbed = new MessageEmbed()
			.setTitle(`${message.author.tag}\'s avatar`)
			.setImage(message.author.displayAvatarURL({ dynamic: true }));
		message.channel.send(avatarEmbed);
	} else {
		const member = message.mentions.members.first();
		avatarEmbed = new MessageEmbed()
			.setTitle(`${member.user.tag}\'s avatar`)
			.setImage(member.user.displayAvatarURL({ dynamic: true }));

		message.channel.send(avatarEmbed);
	}
};

module.exports.help = {
	name: 'avatar',
	description: 'shows avatar of yourself or mentioned member',
	usage: '(mention)',
	category: 'General',
	aliases: ['av', 'pfp']
};
