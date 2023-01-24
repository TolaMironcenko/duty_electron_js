logout_button.addEventListener('click', async () => {
    username = ''
    username_modal.classList.add('active')
    window.versions.set_username('')
    // localStorage.clear()
    localStorage.removeItem('username');
    username_modal_input.focus()
    window.versions.delete_password()
    main_menu.classList.remove('active')
    menu_button_lines[0].classList.remove('active1')
    menu_button_lines[1].classList.remove('active2')
})