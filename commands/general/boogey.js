module.exports.run = async (bot, message, args) => {
	msgArray = message.content.split(' ');
	boobooArray = message.content.split(' ');
		var booboo = +msgArray[1] + +1;
	if (isNaN(booboo) || booboo <= 0) {
		return message.channel.send('Please provide a positive number!');
	} else if (msgArray[2] == null){
		return message.channel.send('Please provide a countdown event!');
	}
	boobooArray.shift();
	boobooArray.shift();
	var boobooString = boobooArray.join(' ');
	var interval = setInterval(function() {
		booboo = booboo - 1;
		if (booboo <= 0) return;
		else {
			message.channel.send(`${booboo} seconds remaining until ${boobooString}`);
		}
	}, 1000);
};

module.exports.help = {
	name: 'boogey',
	description: 'counts down to an event in seconds',
	usage: '<countdown start> <cowntdown event>',
	aliases: ['countdown'],
	category: 'General'
};
