module.exports = (req, res, next) => {

    if(req.session.auth || req.originalUrl.toString().match(/^\/auth/) !== null) {
        return next()
    }
    else {
        delete res.locals.auth
        res.redirect('/auth')
    }
}