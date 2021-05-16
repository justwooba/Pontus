const https = require('https');
const Discord = require('discord.js');
const url = 'https://www.reddit.com/r/programmerhumor/hot/.json?limit=10000';
module.exports.run = async (bot, message, args) => {
https.get(url, result => {
			var body = '';
			result.on('data', chunk => {
				body += chunk;
			});
			result
				.on('end', () => {
					var response = JSON.parse(body);
					var index =
						response.data.children[Math.floor(Math.random() * 99) + 1].data;
					if (index.post_hint !== 'image') {
						var text = index.selftext;
						const textembed = new Discord.MessageEmbed()
							.setTitle(subRedditName)
							.setColor(FFFFFF)
							.setDescription(`[${title}](${link})\n\n${text}`)
							.setURL(`https://reddit.com/${subRedditName}`);
						message.channel.send(textembed);
					}
					var image = index.preview.images[0].source.url.replace('&amp;', '&');
					var title = index.title;
					var link = 'https://reddit.com' + index.permalink;
					var subRedditName = index.subreddit_name_prefixed;
					if (index.post_hint !== 'image') {
						const textembed = new Discord.RichEmbed()
							.setTitle(subRedditName)
							.setColor(FFFFFF)
							.setDescription(`[${title}](${link})\n\n${text}`)
							.setURL(`https://reddit.com/${subRedditName}`);
						message.channel.send(textembed);
					}
					console.log(image);
					const imageembed = new Discord.MessageEmbed()
						.setTitle(subRedditName)
						.setImage(image)
						.setColor(9384170)
						.setDescription(`[${title}](${link})`)
						.setURL(`https://reddit.com/${subRedditName}`);
					message.channel.send(imageembed);
				})
				.on('error', function(error) {
					console.log('Got an error: ', error);
				});
		});
};

module.exports.help = {
	name: 'ph',
	description: 'generates a programmer joke from reddit',
	category: 'Fun'
};