const { connectDatabase } = require("./connectDatabase.js");
const timestampToString = require("./timestampToString")

async function checkGuild (msg) {

    db = connectDatabase();

    const guild = msg.guild
    let sql = "SELECT EXISTS(SELECT id FROM guilds WHERE id = ?)";

    try {
        const row = await new Promise((resolve, reject) => {
            
          db.get(sql, [guild.id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });

        });
    
        let exists = Object.values(row)[0];
    
        if (!exists) {

          sql = "INSERT INTO guilds (id, date, name) VALUES (?, ?, ?)";
          guildDate = timestampToString(guild.joinedTimestamp);

          db.run(sql, [guild.id, guildDate, guild.name], (err) => {
            if (err) return console.error(err.message);
            console.log(`Added Guild: ${guild.name} to Guilds`)
          });

        }

    } catch (err) {
    console.error(err.message);
    }

}

module.exports = checkGuild;