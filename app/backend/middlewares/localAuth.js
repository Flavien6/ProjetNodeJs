module.exports = (req, res, next) => {

    if(req.session.auth) res.locals.auth = req.session.auth
    else delete res.locals.auth

    next()
}