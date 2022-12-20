window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        transition_modal.classList.remove('active')
        transaction_modal_input.blur()
    }
    if (e.key === '+' && username !== '') {
        transaction_modal_input.value = ''
        transition_modal.classList.add('active')
        transition_modal.id = 'plus'
        transaction_modal_input.focus()
    }
    if (e.key === '-' && username !== '') {
        transaction_modal_input.value = ''
        transition_modal.classList.add('active')
        transition_modal.id = 'minus'
        transaction_modal_input.focus()
    }
})
