// this command is 100% useless, just a test for the handler
module.exports.run = async (bot, message, args) => {
	message.channel.send('Boop!');
};

module.exports.help = {
	name: 'beep',
	description: 'Boops you back',
	usage: '',
	category: 'General',
};