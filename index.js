const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();

const config = require('./JSON/config.json')
const prefix = config.prefix;

bot.login(process.env.SELF_TOKEN);

bot.on("ready", () => {
    console.log(`${bot.user.tag} has logged in...`);
});
       
bot.on("message", async message => {

    if (message.author !== bot.user) return;
    if (!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    console.log(`${message.author.username} has used command ${message.content}`);
    bot.channels.get('390431268174561280').send(`${message.author.username} has used command ${message.content}`)

    if (command === `${prefix}live`) {
        var date = new Date().toUTCString();
        message.delete();
        let text = args.slice(0).join(" ");
        message.channel.send({ 
            embed: {
                color: 3447003,
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: "🛑 **LIVE!** 🛑",
                url: "https://www.twitch.tv/itsMegaGG",
                description: `${text} | Click [here](https://www.twitch.tv/itsMegaGG) to start watching!`,
                image: {
                    url: "https://static-cdn.jtvnw.net/jtv_user_pictures/0c7f6a6d8ff7bc70-profile_image-300x300.png"
                },
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: `Embed created at ${date}`
                }

            },
        })

    }
    
    if (command === `${prefix}quote`) {
        message.delete();
        let msg = args.slice(1).join(" ")
        let member = message.mentions.members.first();


        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: member.user.username,
                    icon_url: member.user.avatarURL
                },
                description: msg
            }
        });
    }    

    const params = message.content.split(" ").slice(1);

    if (command === `${prefix}prune`) {
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
    if (message.content.startsWith(prefix + "restart")) {
        const msg = await message.channel.send("Selfbot restarting...");
        process.exit(0);
        
    }
    
    // if (message.content.startsWith(prefix + 'test')) {
    //     message.delete();
    // }

});
