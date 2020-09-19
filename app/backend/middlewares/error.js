module.exports = (err, req, res, next) => {
    let code = err.status || 500
    res.status(code).render('error', {
        title: `Erreur ${code}`,
        status: code,
        msg: err.msg || 'Internal error'
    })
}