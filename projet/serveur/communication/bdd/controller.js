// Inclusion du  model
module.exports = (title, page, schema) => {
    const Model = require(`./models/${schema}`)

    return {
        // Fonction pour récupérer tout les documents
        getAll: async (req, res, next) => {
            try{
                let data = await Model.find()
                res.render(`mains/${page}`, { title, data })
            }
            catch(err) {
                next({...err, status: 500, msg: `Connexion à la BDD Impossible.`})
            }
        },
        // Fonction pour récupérer un document par son _id
        get: async (req, res, next) => {
            let _id = req.params.id    
            if(_id === 'new') next()
        
            try{
                let data = await Model.findById(_id).exec()
                res.render(`forms/${page}`, {
                    title,
                    data
                })
            }
            catch(err) {
                next({...err, status: 500, msg: `Connexion à la BDD Impossible.`})
            }
        },
        // Fonction de génération d'un document vierge
        empty: (req, res, next) => {
            res.render(`forms/${page}`, { title })
            let err = new Error()
            next({...err, status: 500, msg: `Connexion à la BDD Impossible.`})
        },
        // Fonction pour ajouter un document
        add: async (req, res, next) => {
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
        },
        // Fonction de MAJ d'un document
        update: async (req, res, next) => {
            let _id = req.params.id
        
            try{
                let newData = req.body
                let oldData = await Model.findById(_id).exec()
                
                for(attr in data) {
                    if(oldData[attr] !== newData[attr]) oldData[attr] = newData[attr]
                }
        
                await oldData.save()
        
                res.render(`result`, {
                    title,
                    msg: `${title} Mis à jour`,
                    url: `/${page}`
                })
            }
            catch(err) {
                next({...err, status: 500, msg: `Connexion à la BDD Impossible.`})
            }
        },
        // Fonction de suppréssion d'un document
        remove: async (req, res, next) => {
            let _id = req.params.id
        
            try{
                await Model.deleteOne({ _id })
        
                res.render(`result`, {
                    title,
                    msg: `${title} Supprimé`,
                    url: `/${page}`
                })
            }
            catch(err) {
                next({...err, status: 500, msg: `Connexion à la BDD Impossible.`})
            }
        }
    }
}