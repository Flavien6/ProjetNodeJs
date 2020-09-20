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