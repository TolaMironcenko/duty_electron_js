add_chet_button.addEventListener('click', () => {
    // await window.versions.new_chet('new', 0).then(
    //     (value) => {
    //         console.log(value.code)
    //         if (value.code === 'EEXIST') {
    //             console.log('exist')
    //         } else {
    //             add_balance_block('new', 0)
    //         }
    //     }
    // ).catch(err => {
    //     throw err
    //     // console.error(err.toString())
    // })
    add_chet_modal.classList.add('active')
    add_chet_input.focus()
})

add_chet_name_button.addEventListener('click', async () => {
    await window.versions.new_chet(add_chet_input.value, 0).then(
        () => {
            add_balance_block(add_chet_input.value, 0)
            add_chet_input.value = ''
            add_chet_modal.classList.remove('active')
            add_chet_input.blur()
        }
    ).catch(err => {
        add_chet_input.classList.add('err')
        add_chet_input.value = ''
        throw err
    })
})

add_chet_input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        await window.versions.new_chet(add_chet_input.value, 0).then(
            () => {
                add_balance_block(add_chet_input.value, 0)
                add_chet_input.value = ''
                add_chet_modal.classList.remove('active')
                add_chet_input.blur()
            }
        ).catch(err => {
            add_chet_input.classList.add('err')
            add_chet_input.value = ''
            throw err
        })
    }
})

close_add_chet_modal.addEventListener('click', () => {
    add_chet_modal.classList.remove('active')
    add_chet_input.blur()
})