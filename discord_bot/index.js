require("dotenv").config()
const discord = require("discord.js");
client = new discord.Client({
        intents: 
        [		
            discord.GatewayIntentBits.Guilds,
            discord.GatewayIntentBits.GuildMessages,
            discord.GatewayIntentBits.GuildMembers,
            discord.GatewayIntentBits.MessageContent,
        ],
        partials:
        [
          discord.Partials.GuildMember,
        ]
});

const sqlite3 = require('sqlite3').verbose();
const { closeDatabase } = require("./database_related/connectDatabase.js");
const checkChannel = require("./database_related/checkChannel");
const checkUser = require("./database_related/checkUser");
const addMessage = require("./database_related/addMessage");
const updateUser = require("./database_related/updateUser");

client.on("messageCreate", async msg => {
    await checkChannel(msg);
    await addMessage(msg);
   closeDatabase();
});

client.on('guildMemberAdd', async (member) => {
  await checkUser(member);
  closeDatabase();
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  await updateUser.nickname(oldMember, newMember);
  closeDatabase();
});

client.on('userUpdate', async (oldMember, newMember) => {
  await updateUser.avatar(oldMember, newMember);
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