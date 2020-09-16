// Inclusion du  model
const title = 'Joueurs', page = 'joueurs', schema = 'joueur'

const Model = require(`../models/${schema}`)

// Fonction pour récupérer tout les documents
exports.getAll = async (req, res, next) => {
    try{
        let data = await Model.find()
        res.render(`mains/${page}`, { title, data })
    }
    catch(err) {
        next({...err, status: 500, msg: `Connexion à la BDD Impossible.`})
    }
}

// Fonction pour ajouter un document
exports.add = async (req, res, next) => {
    try{
        let doc = new Model(req.body)
        await doc.save()
        res.render(`result`, {
            title,
            msg: `${title} Ajouté`,
            url: `/${page}`
        })
    }
    catch(err) {
        next({...err, status: 500, msg: `Connexion à la BDD Impossible.`})
    }
}

// Fonction pour récupérer un document par son _id
exports.get = async (req, res, next) => {
    let id = req.params.id    
    if(id === `new`) next()

    try{
        let data = await Model.findById(id).exec()
        res.render(`form/${page}`, {
            title,
            data
        })
    }
    catch(err) {
        next({...err, status: 500, msg: `Connexion à la BDD Impossible.`})
    }
}

// Fonction de nouveau document
exports.new = (req, res, next) => {
    res.render(`form/${page}`, { title })
}