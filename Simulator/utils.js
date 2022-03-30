function getRndInteger(min, max) {
    /**
     * get a random number between min and max (both included)
     */
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {
    getRndInteger
}