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

const sqlite3 = require('sqlite3').verbose();
const { closeDatabase } = require("./database_related/connectDatabase.js");
const checkChannel = require("./database_related/checkChannel");
const checkUser = require("./database_related/checkUser");
const addMessage = require("./database_related/addMessage");

client.on("messageCreate", async msg => {

    await checkChannel(msg);
    await checkUser(msg);
    await addMessage(msg);
    
    console.dir(msg);
    /*
    const user = msg.guild.members.cache.get(msg.author.id);
    const avatarURL = msg.guild.iconURL()
    console.log(user)*/
    
   closeDatabase();
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