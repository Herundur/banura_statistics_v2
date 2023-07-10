const { connectDatabase } = require("./connectDatabase.js");

async function updateUserNickname (oldMember, newMember) {
    if (oldMember.nickname !== newMember.nickname) {
        sql = "UPDATE users SET nickname = ? WHERE id = ?;";
        updateUserAtDatabase(sql, newMember.id, newMember.nickname);
    }
}

async function updateUserAvatar (oldMember, newMember) {
    if (oldMember.avatarURL() !== newMember.avatarURL()) {
        sql = "UPDATE users SET picture = ? WHERE id = ?;";
        updateUserAtDatabase(sql, newMember.id, newMember.avatarURL());
    }
}

function updateUserAtDatabase (sqlText, memberId, newProperty) {
    db = connectDatabase();
    db.run(sqlText, [newProperty, memberId], (err) => {
        if (err) return console.error(err.message);
        console.log(`Updated a User`)
    });
}
exports.nickname = updateUserNickname;
exports.avatar = updateUserAvatar;