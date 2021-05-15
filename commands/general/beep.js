module.exports.run = async (bot, message, args) => {
	message.channel.send('Boop!');
};

module.exports.help = {
	name: 'beep',
	description: 'Boops you back',
	usage: '',
	category: 'General',
};
