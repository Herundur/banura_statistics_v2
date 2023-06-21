const { connectDatabase } = require("./connectDatabase.js");
const timestampToString = require("./timestampToString")

async function addMessage(msg) {

    db = connectDatabase();

    sql = "INSERT INTO messages (author_id, channel_id, id, date) VALUES (?, ?, ?, ?)";
    msgDate = timestampToString(msg.createdTimestamp);

    db.run(sql, [msg.author.id, msg.channelId, msg.id, msgDate], (err) => {
        if (err) return console.error(err.message);
        console.log(`Added Message: ${msg.content} to Messages`)
    });
}

module.exports = addMessage;