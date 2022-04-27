function getUniqueID() {
    const id = Math.round(Math.random()*9000) + Date.now();
    return id;
}

// get a random quize
function getRandomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    getUniqueID,
    getRandomNumber
}