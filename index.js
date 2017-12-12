const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require('./JSON/config.json')
const prefix = config.prefix;

bot.login(process.env.SELF_TOKEN);

bot.on("ready", () => {
    console.log(`${bot.user.tag} has logged in...`)
});

bot.on("message", async message => {

    if (message.author !== bot.user) return;
    if (!message.content.startsWith(prefix)) return;

    const params = message.content.split(" ").slice(1);

    if (message.content.startsWith(prefix + 'live')) {
        var date = new Date(day, month, year);
        message.channel.send({ 
            embed: {
                color: 3447003,
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: "🛑 **LIVE!** 🛑",
                url: "https://www.twitch.tv/itsMegaGG",
                description: "DeviateMega is now live! Click [here](https://www.twitch.tv/itsMegaGG) to start watching!",
                image: {
                    url: "https://static-cdn.jtvnw.net/jtv_user_pictures/0c7f6a6d8ff7bc70-profile_image-300x300.png"
                },
                footer: {

                }

            },
        })

    }

    if (message.content.startsWith(prefix + "prune")) {
        // get number of messages to prune
        let messagecount = parseInt(params[0]);
        // get the channel logs
        message.channel.fetchMessages({
            limit: 100
        })
        .then(messages => {
            let msg_array = messages.array();
            // filter the message to only your own
            msg_array = msg_array.filter(m => m.author.id === bot.user.id);
            // limit to the requested number + 1 for the command message
            msg_array.length = messagecount + 1;
            // Has to delete messages individually. Cannot use `deleteMessages()` on selfbots.
            msg_array.map(m => m.delete().catch(console.error));
        });
    }

});
