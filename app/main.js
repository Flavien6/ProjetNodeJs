const srv = require('./backend/srv')
srv.connexion()
.then(() => {
    console.log('...')
})
.catch(err => {
    throw err
})