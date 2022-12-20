username_modal_input.focus()

if (username !== '') {
    username_header.innerHTML = username
    username_modal.classList.remove('active')
    username_modal_input.blur()
    enter_password_modal.classList.add('active')
    enter_password_input.focus()
}

const equals = (transactions, valuetransactions) => {
    if (transactions.length !== valuetransactions.length) {
        return false
    }
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i] !== valuetransactions[i]) {
            return false
        }
    }
    return true
}

const get_username = () => {
    if (username_modal_input.value !== '' && !/^\s+$/.test(username_modal_input.value)) {
        let username_f_uppercase = username_modal_input.value.split('')
        username_f_uppercase[0] = username_f_uppercase[0].toUpperCase()
        console.log(username_f_uppercase.join(''))
        username = username_f_uppercase.join('')
        username_header.innerHTML = username
        username_modal.classList.remove('active')
        localStorage.setItem('username', username)
        username_modal_input.value = ''
        enter_password_modal.classList.add('active')
        enter_password_input.focus()
        enter_password_input.value = ''
    } else {
        username_modal_input.classList.add('err')
    }
}

retype_password_modal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        get_retype_password()
    }
})

retype_password_button.addEventListener('click', get_retype_password)

enter_password_button.addEventListener('click', get_password)

enter_password_modal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        get_password()
    }
})

username_modal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        get_username()
    }
})

get_data()
if (transactions.length === 0) {
    all_transactions_block.innerHTML = 'Пока что нет транзакций'
}
loader.classList.remove('active')
console.log(username, transactions, balance)

get_username_button.addEventListener('click', get_username)

setInterval(get_data, 500)


exit_button.addEventListener('click', () => {
    transition_modal.classList.remove('active')
})

const add_transaction = async () => {
    if (transition_modal.id === 'plus') {
        await window.versions.add_transaction(transaction_modal_input.value)
    } else if (transition_modal.id === 'minus') {
        await window.versions.add_transaction(0 - transaction_modal_input.value)
    }

    transaction_modal_input.value = ''
    transition_modal.classList.remove('active')
}

transition_modal.addEventListener('keydown', (e) => {
    username_modal_input.blur()
    if (e.key === 'Enter') {
        add_transaction()
    }
})

button_plus.addEventListener('click', () => {
    transition_modal.classList.add('active')
    transition_modal.id = 'plus'
})

button_minus.addEventListener('click', () => {
    transition_modal.classList.add('active')
    transition_modal.id = 'minus'
})

add_button.addEventListener('click', add_transaction)
