module.exports = (req, res, next) => {

    if(req.session.retour) {
        res.locals.retour = req.session.retour
        delete req.session.retour
    }

    req.retour = (type, msg) => {
        if(!req.session.retour) req.session.retour = {}
        req.session.retour[type] = msg
    }

    next()
}