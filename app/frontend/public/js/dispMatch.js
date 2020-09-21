$('#j1').change(() => {
    $('#j2 option').each((i, elt) => {
        let optSel = $('#j1 option:selected')
        let opt = $(elt)
        if(opt.val() === optSel.val() && optSel.val() !== '') {
            if(opt.hasClass('d-inline')) opt.removeClass('d-inline')
            if(!opt.hasClass('d-none')) opt.addClass('d-none')
            $('#j2:first-child').prop('selected', true)
        }
        else {
            if(opt.hasClass('d-none')) opt.removeClass('d-none')
            if(!opt.hasClass('d-inline')) opt.addClass('d-inline')
        }
    })
})

$('#j2').change(() => {
    $('#j1 option').each((i, elt) => {
        let optSel = $('#j2 option:selected')
        let opt = $(elt)
        if(opt.val() === optSel.val() && optSel.val() !== '') {
            if(opt.hasClass('d-inline')) opt.removeClass('d-inline')
            if(!opt.hasClass('d-none')) opt.addClass('d-none')
            $('#j2:first-child').prop('selected', true)
        }
        else {
            if(opt.hasClass('d-none')) opt.removeClass('d-none')
            if(!opt.hasClass('d-inline')) opt.addClass('d-inline')
        }
    })
})