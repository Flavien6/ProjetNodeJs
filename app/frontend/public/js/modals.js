$('#deleteModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget) // Déclencheur du modal
    let type = button.data('type') // Récupération de la valeur de l'option data-type
    let id = button.data('id') // Récupération de la valeur de l'option data-id
    let nom = button.data('nom') // Récupération de la valeur de l'option data-nom
    let modal = $(this) // Le modal
    modal.find('.modal-title').text(`Suppréssion : ${nom}`) // Modification du titre
    modal.find('.modal-body p').text(`Voulez-vous vraiment supprimer : ${nom} ?`) // Modification du message
    modal.find('.modal-footer form').attr('action', `/${type}/${id}?_method=DELETE`) // Modification de la validation
})

$('#validateModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget) // Déclencheur du modal
    let type = button.data('type') // Récupération de la valeur de l'option data-type
    let id = button.data('id') // Récupération de la valeur de l'option data-id
    let nom = button.data('nom') // Récupération de la valeur de l'option data-nom
    let modal = $(this) // Le modal
    modal.find('.modal-title').text(`Valider : ${nom}`) // Modification du titre
    modal.find('.modal-body p').text(`Voulez-vous vraiment valider : ${nom} ?`) // Modification du message
    modal.find('.modal-footer form').attr('action', `/${type}/validate/${id}`) // Modification de la validation
})

$('#resultModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget) // Déclencheur du modal
    let id = button.data('id') // Récupération de la valeur de l'option data-id
    let p1Id = button.data('p1id')
    let p1 = button.data('p1nom')
    let p2Id = button.data('p2id')
    let p2 = button.data('p2nom')
    let modal = $(this) // Le modal
    modal.find('form').attr('action', `/match/${id}?_method=PUT`) // Modification de la validation
    modal.find('#opt1').val(p1Id)
    modal.find('#opt1').text(p1)
    modal.find('#opt2').val(p2Id)
    modal.find('#opt2').text(p2)
})