// Configuration du template de la page
let page = {
    page: 'Erreur'
}

// Fonction de traitement d'une erreur 404
exports.error404 = (err, req, res, next) => {
    page.msg = err
    res.status(404)
    res.render('error', page)
}

// Fonction de traitement d'une erreur 404
exports.error500 = (err, req, res, next) => {
    page.msg = err
    res.status(500)
    res.render('error', page)
}