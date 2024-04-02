function getColor(value) {
    if (value == "hidden") {
        return "rgba(255, 255, 255, 0.0)"
    }
    let color = value >= 0 ? "rgba(101, 207, 15, 0.85)" : "rgba(207, 102, 121, 0.85)";
    return color;
}

function formatValue(value) {
    let formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
}

function formatValueWithSymbols(value) {
    let formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    formattedValue = value >= 0 ? "+" + formattedValue : formattedValue;
    return formattedValue;
}

function timespanText(startDate, timespan) {
    let text = ""
    if (timespan == "letzte30Tage") {
        text = "vs vorherige 30 Tage"
    } else if (timespan == "letzte7Tage") {
        text = "vs vorherige 7 Tage"
    } else {
        text = `Aufzeichnungsbeginn: ${startDate.toString()}`
    }
    return text
}

function addRankingIcons(array) {
    const labels = [];
    const values = [];

    for (let i = 0; i < array.length; i++) {
        let icon;
        switch (i + 1) {
          case 1:
            icon = "🥇";
            break;
          case 2:
            icon = "🥈";
            break;
          case 3:
            icon = "🥉";
            break;
          default:
            icon = " " + (i + 1) + ".";
      
        } 
        const label = icon + " " + array[i][0];
        labels.push(label);
        values.push(array[i][1]);
    }
 
    return {labels, values};
}
