function getRndInteger(min, max) {
    /**
     * get a random number between min and max (both included)
     */
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomNameGenerator() {
    let res = '';
    for (let i = 0; i < 5; i++) {
        const random = Math.floor(Math.random() * 26)
        res += String.fromCharCode(97 + random)
    }
    return res
}

function dateConvert(date_srt) {
    const datesplitted = date_srt.split(".")
    var yyyy = datesplitted[2]
    var mm = datesplitted[1]
    var dd = datesplitted[0]
    if (mm.length == 1) {
        mm = "0" + mm
    }
    if (dd.length == 1) {
        dd = "0" + dd
    }
    return yyyy + "-" + mm + "-" + dd
}

function datetimeConvert(datetime_str) {
    /**
     * convert the given string to a format of YYYY-MM-DD hh:mm:ss
     * the returned string can be inserted to MySQL table
     */
    const splitted = datetime_str.split(", ")  // split the date and the time 
    var date = dateConvert(splitted[0])
    var hh = splitted[1].slice(0, splitted[1].length - 6)  // the hour only (hh)
    if (hh.length == 1) {
        hh = "0" + hh
    }
    var ms = splitted[1].slice(splitted[1].length - 6)  // the rest of the string, which is :mm:ss
    return date + " " + hh + ms
}

function getDifferenceInYears(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24 * 365);
}

module.exports = {
    getRndInteger,
    randomNameGenerator,
    dateConvert,
    datetimeConvert,
    getDifferenceInYears
}