const { connectDatabase } = require("./connectDatabase,js");

async function addMessage(msg) {

    db = connectDatabase();

    sql = "INSERT INTO messages (author_id, channel_id, id, timestamp) VALUES (?, ?, ?, ?)";

    db.run(sql, [msg.author.id, msg.channelId, msg.id, msg.createdTimestamp], (err) => {
        if (err) return console.error(err.message);
        console.log(`Added Message: ${msg.content} to Messages`)
    });
}

module.exports = addMessage;