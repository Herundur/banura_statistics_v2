const { connectDatabase } = require("./connectDatabase.js");
const timestampToString = require("./timestampToString")

async function checkUser (msg) {

    db = connectDatabase();

    const user = msg.guild.members.cache.get(msg.author.id);
    let sql = "SELECT EXISTS(SELECT id FROM users WHERE id = ?)";

    try {
        const row = await new Promise((resolve, reject) => {
            
            db.get(sql, [user.id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });

        });
    
        let exists = Object.values(row)[0];
    
        if (!exists) {

            sql = "INSERT INTO users (id, picture, name, date, bot) VALUES (?, ?, ?, ?, ?)";
            userDate = timestampToString(user.joinedTimestamp);

            db.run(sql, [user.id, user.user.displayAvatarURL(), user.user.username, userDate, Number(user.user.bot)], (err) => {
                if (err) return console.error(err.message);
                    console.log(`Added User: ${user.user.username} to Users`)
            });

        }

    } catch (err) {
        console.error(err.message);
    }

}

module.exports = checkUser;