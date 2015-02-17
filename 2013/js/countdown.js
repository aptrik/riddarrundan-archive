function plural(count, singular, plural) {
    if (count == 0) {
        return "";
    }
    if (count == 1) {
        return count + " " + singular;
    }
    return count + " " + plural;
}

function timeLeft(then, now) {
    now = typeof(now) == "undefined" ? new Date() : now;
    var delta =  then.getTime() - now.getTime();
    if (delta < 0) {
        return "T&auml;vlingen har startat!";
    }
    var s = delta < 0 ? 0 : delta / 1000;
    var MINUTE = 60;
    var HOUR = 60 * MINUTE;
    var DAY = 24 * HOUR;
    var days = Math.floor(s / DAY);
    var hours = Math.floor((s - days * DAY) / HOUR);
    var minutes = Math.floor((s - days * DAY - hours * HOUR) / MINUTE);
    var seconds = Math.floor(s - (DAY * days + HOUR * hours + MINUTE * minutes));

    var numbers = [];
    if (days > 0) {
        numbers.push(plural(days, "dag", "dagar"));
    }
    if (hours > 0) {
        numbers.push(plural(hours, "timme", "timmar"));
    }
    if (minutes > 0) {
        numbers.push(plural(minutes, "minut", "minuter"));
    }

    return (" "
            + numbers.join(", ")
            + ((numbers.length > 0 && seconds > 0) ? " och " : " ")
            + plural(seconds, "sekund", "sekunder"));
}
