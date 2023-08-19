try {
    require('dotenv').config();
    const { Client, IntentsBitField, MessageMentions, userMention, discordSort } = require('discord.js');
    const { etsi } = require('./etsi');
    //Token .env tiedostosta
    const tokenLogin = process.env.TOKEN;
    if (!tokenLogin) {
        throw new Error('TOKEN environment variable is not set');
    }
    const client = new Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent,
        ]
    });
    client.on('ready', () => {
        console.log(`Bot login ${client.user.tag}!`);
    })
    //botin !pal komento
    client.on('messageCreate', msg => {
        etsi(msg)
    });
    client.login(tokenLogin);
} catch (error) {
    console.error('An error occurred:', error.message);
}