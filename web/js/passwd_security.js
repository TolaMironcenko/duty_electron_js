const get_password = () => {
    if (enter_password_input.value !== '' && !/^\s+$/.test(enter_password_input.value)) {
        password = enter_password_input.value
        window.versions.have_password().then(value => {
            if (value) {
                window.versions.validate_password(password).then(res => {
                    if (res) {
                        enter_password_modal.classList.remove('active')
                        enter_password_input.blur()
                        enter_password_input.value = ''
                        enter_password_input.classList.remove('err')
                    } else {
                        enter_password_input.classList.add('err')
                    }
                })
            } else {
                enter_password_modal.classList.remove('active')
                enter_password_input.blur()
                enter_password_input.value = ''
                retype_password_modal.classList.add('active')
                retype_password_input.focus()
            }
        })
    } else {
        enter_password_input.classList.add('err')
    }
}

const get_retype_password = () => {
    retype_password = retype_password_input.value
    if (password === retype_password && retype_password_input.value !== '' && !/^\s+$/.test(retype_password_input.value)) {
        window.versions.set_app_password(password)
        retype_password_modal.classList.remove('active')
        retype_password_input.blur()
        retype_password_input.value = ''
        console.log(password, retype_password)
    } else {
        retype_password_input.classList.add('err')
    }
}