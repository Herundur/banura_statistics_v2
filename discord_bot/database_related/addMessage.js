const { connectDatabase } = require("./connectDatabase.js");
const timestampToString = require("./timestampToString")

async function addMessage(msg) {

    db = connectDatabase();

    sql = "INSERT INTO messages (author_id, channel_id, id, date, mention_role) VALUES (?, ?, ?, ?, ?)";
    metioned_role = (msg.mentions.roles.at(0) !== undefined) ? msg.mentions.roles.at(0).name : undefined;
    msgDate = timestampToString(msg.createdTimestamp);

    db.run(sql, [msg.author.id, msg.channelId, msg.id, msgDate, metioned_role], (err) => {
        if (err) return console.error(err.message);
        console.log(`Added Message: ${msg.content} to Messages`)
    });
}

module.exports = addMessage;