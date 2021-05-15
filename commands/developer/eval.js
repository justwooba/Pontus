module.exports.run = async (bot, message, args) => {
  if (!bot.config.owners.includes(message.author.id)) return message.channel.send("You must be the developer to use this command!");
    var result = message.content.split(" ").slice(1).join(" ");
        let evaled = eval(result);
        console.log(result);
        message.channel.send(`${evaled}`);
};

// Help Object
module.exports.help = {
	name: 'eval',
	description: 'eval command for wooba only',
	usage: '<content to eval>',
	category: 'Developer',
};
