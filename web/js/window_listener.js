window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        transition_modal.classList.remove('active')
        transaction_modal_input.blur()
        main_menu.classList.remove('active')
        menu_button_lines[0].classList.remove('active1')
        menu_button_lines[1].classList.remove('active2')
        add_chet_input.blur()
        add_chet_modal.classList.remove('active')
    }
    if (e.key === 'm') {
        if (main_menu.classList.contains('active')) {
            main_menu.classList.remove('active')
            menu_button_lines[0].classList.remove('active1')
            menu_button_lines[1].classList.remove('active2')
        } else {
            main_menu.classList.add('active')
            menu_button_lines[0].classList.add('active1')
            menu_button_lines[1].classList.add('active2')
        }

    }
    // if (e.key === '+' && username !== '') {
    //     transaction_modal_input.value = ''
    //     transition_modal.classList.add('active')
    //     transition_modal.id = 'plus'
    //     transaction_modal_input.focus()
    // }
    // if (e.key === '-' && username !== '') {
    //     transaction_modal_input.value = ''
    //     transition_modal.classList.add('active')
    //     transition_modal.id = 'minus'
    //     transaction_modal_input.focus()
    // }
})

window.addEventListener('click', async (e) => {
    if (e.target.classList.contains('exit')) {
        balancesblock.removeChild(document.querySelector('#'+e.target.id))
        await window.versions.delete_chet(e.target.id)
        await window.versions.get_transactions_for_chet('main').then(
            (value) => {
                if (value !== '') {
                    transactions = value.split('\n')
                    all_transactions_block.innerHTML = ''
                    for (let i = 0; i < transactions.length; i++) {
                        create_transaction_block(parseFloat(transactions[i]))
                    }
                } else {
                    all_transactions_block.innerHTML = '<p class="app-p">Пока что нет транзакций</p>'
                }
            }
        )
    }
})
