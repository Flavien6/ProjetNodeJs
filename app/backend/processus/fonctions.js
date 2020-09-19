// Récupération d'un nombre random
exports.getRandomNumber = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min +1)) + min
}

// Mélanger un tableau
exports.randomize = tab => {
    let j, tmp

    for (let i = (tab.length - 1); i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        tmp = tab[i]
        tab[i] = tab[j]
        tab[j] = tmp
    }

    return tab
}