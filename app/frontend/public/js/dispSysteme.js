$('#systeme').change(() => {
    if($('#systeme option:selected').val() === 'suisse'){
        if($('#ronde').hasClass('d-none')) {
            $('#ronde').removeClass('d-none')
            $('#ronde').addClass('d-flex')
            $('#nbRondes').prop('required',true)
        }
    }
    else {
        if($('#ronde').hasClass('d-flex')) {
            $('#ronde').removeClass('d-flex')
            $('#ronde').addClass('d-none')
            $('#nbRondes').prop('required',false)
            $('#nbRondes').val('')
        }
    }
})

$('#envoyer').click(() => {
    if($('#systeme option:selected').val() === 'directe') $('#nbRondes').val('')
})

$('#systeme').trigger('change')