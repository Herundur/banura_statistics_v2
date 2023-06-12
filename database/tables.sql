CREATE TABLE IF NOT EXISTS guilds(
    id INTEGER NOT NULL,
    timestamp INTEGER NOT NULL,
    member_count INTEGER NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS channels(
    id INTEGER NOT NULL,
    guild_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(guild_id) REFERENCES channels(id)
);

CREATE TABLE IF NOT EXISTS users(
    id INTEGER NOT NULL,
    picture TEXT NOT NULL,
    name TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    bot INTEGER NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS messages(
    number INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    channel_id INTEGER NOT NULL,
    id INTEGER NOT NULL,
    timestamp INTEGER NOT NULL,
    PRIMARY KEY(number),
    FOREIGN KEY(channel_id) REFERENCES channels(id),
    FOREIGN KEY(author_id) REFERENCES users(id)
);