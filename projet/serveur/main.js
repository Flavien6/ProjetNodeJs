const srv = require('./communication/srv')
srv.connexion()
.then(() => {
    console.log('...')
})
.catch(err => {
    throw err
})