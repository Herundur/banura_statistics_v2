const { connectDatabase } = require("./connectDatabase.js");
const timestampToString = require("./timestampToString")

async function checkUser (member) {

    db = connectDatabase();
    const nickname = member.nickname ? member.nickname : undefined;
    let sql = "SELECT EXISTS(SELECT id FROM users WHERE id = ?)";

    try {
        const row = await new Promise((resolve, reject) => {
            
            db.get(sql, [member.id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });

        });
    
        let exists = Object.values(row)[0];
    
        if (!exists) {

            sql = "INSERT INTO users (id, picture, username, nickname, date, bot) VALUES (?, ?, ?, ?, ?, ?)";
            userDate = timestampToString(member.joinedTimestamp);

            db.run(sql, [member.id, member.user.displayAvatarURL(), member.user.username, nickname, userDate, Number(member.user.bot)], (err) => {
                if (err) return console.error(err.message);
                    console.log(`Added User: ${member.user.username} to Users`)
            });

        }

    } catch (err) {
        console.error(err.message);
    }

}

module.exports = checkUser;