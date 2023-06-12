require("dotenv").config()
const discord = require("discord.js");
client = new discord.Client({
        intents: 
        [		
            discord.GatewayIntentBits.Guilds,
            discord.GatewayIntentBits.GuildMessages,
            discord.GatewayIntentBits.MessageContent,
        ]
});

client.on("messageCreate", async msg => {
    console.dir(msg);
    const user = msg.guild.channels.cache.get(msg.channelId);
    const avatarURL = msg.guild.iconURL()
    console.log(user)
});

client.on('ready', () => {
    console.log(`Bot is ready! Logged in as ${client.user.tag}`);
  });
  
  process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
  });
  
  process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
  });

client.login(process.env.DISCORD_BOT_TOKEN)