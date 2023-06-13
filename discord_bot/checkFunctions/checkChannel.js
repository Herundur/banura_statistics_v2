const { connectDatabase } = require(".././connectDatabase,js");
const checkGuild = require("./checkGuild");

async function checkChannel(msg) {

    db = connectDatabase();

    const channel = msg.guild.channels.cache.get(msg.channelId);
    let sql = "SELECT EXISTS(SELECT id FROM channels WHERE id = ?)";

    try {
        const row = await new Promise((resolve, reject) => {
            
            db.get(sql, [channel.id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });

        });
    
        let exists = Object.values(row)[0];
    
        if (!exists) {

            checkGuild(msg);

            sql = "INSERT INTO channels (id, guild_id, name) VALUES (?, ?, ?)";

            db.run(sql, [channel.id, channel.guild.id, channel.name], (err) => {
                if (err) return console.error(err.message);
                console.log(`Added Channel: ${channel.name} to Channels`)
            });

        }

    } catch (err) {
        console.error(err.message);
    }

}

module.exports = checkChannel;