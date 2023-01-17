logout_button.addEventListener('click', () => {
    username = ''
    username_modal.classList.add('active')
    // localStorage.clear()
    localStorage.removeItem('username');
    username_modal_input.focus()
    window.versions.delete_password()
})