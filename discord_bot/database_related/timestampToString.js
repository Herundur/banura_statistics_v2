function timestampToString(timestamp) {
    date = new Date(timestamp);
    date.setHours(date.getHours() + 2); //+ 2 standart date.setHours(date.getMonth() - 2);
    dateString = date.toISOString().slice(0, 19).replace('T', ' ');
    return dateString;
}

module.exports = timestampToString;