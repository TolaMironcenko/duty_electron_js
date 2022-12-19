window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        transition_modal.classList.remove('active')
    }
    if (e.key === '+' && username !== '') {
        transition_modal.classList.add('active')
        transition_modal.id = 'plus'
    }
    if (e.key === '-' && username !== '') {
        transition_modal.classList.add('active')
        transition_modal.id = 'minus'
    }
})