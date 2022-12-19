logout_button.addEventListener('click', () => {
    username = ''
    username_modal.classList.add('active')
    localStorage.clear()
})