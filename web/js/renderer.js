username_modal_input.focus()

window.versions.get_transactions().then(
    (value) => {
        if (value !== '') {
            // console.log(value)
            if (!equals(transactions, value.split('\n'))) {
                transactions = value.split('\n')
                all_transactions_block.innerHTML = ''
                for (let i = 0; i < transactions.length; i++) {
                    create_transaction_block(parseFloat(transactions[i]), transactions[i])
                }
            }
        } else {
            all_transactions_block.innerHTML = '<p class="app-p">Пока что нет транзакций</p>'
        }
    }
)

if (username !== '') {
    username_header.innerHTML = username
    username_modal.classList.remove('active')
    username_modal_input.blur()
    username_modal_input.value = ''
    enter_password_modal.classList.add('active')
    enter_password_input.focus()
}

main_menu_button.addEventListener('click', () => {
    if (main_menu.classList.contains('active')) {
        menu_button_lines[0].classList.remove('active1')
        menu_button_lines[1].classList.remove('active2')
        main_menu.classList.remove('active')
    } else {
        main_menu.classList.add('active')
        menu_button_lines[0].classList.add('active1')
        menu_button_lines[1].classList.add('active2')
    }
})

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

const get_username = async () => {
    if (username_modal_input.value !== '' && !/^\s+$/.test(username_modal_input.value)) {
        let username_f_uppercase = username_modal_input.value.split('')
        username_f_uppercase[0] = username_f_uppercase[0].toUpperCase()
        // console.log(username_f_uppercase.join(''))
        username = username_f_uppercase.join('')
        window.versions.set_username(username)
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

retype_password_input.addEventListener('keyup', (e) => {
    // console.log(e.target.value)

    for (let i = 0; i < 4; i++) {
        circles_retype[i].classList.remove('fill')
        circles_retype[i].classList.remove('err')
    }

    for (let i = 0; i < e.target.value.length; i++) {
        circles_retype[i].classList.add('fill')
    }

    if (e.target.value.length > 4) {
        e.target.value = e.target.value.slice(0, -1)
    }

    if (e.target.value.length === 4) {
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

enter_password_modal.addEventListener('click', () => enter_password_input.focus())

enter_password_input.addEventListener('keyup', (e) => {
    // console.log(e.target.value)

    for (let i = 0; i < 4; i++) {
        circles[i].classList.remove('fill')
        circles[i].classList.remove('err')
    }

    for (let i = 0; i < e.target.value.length; i++) {
        circles[i].classList.add('fill')
    }

    if (e.target.value.length > 4) {
        e.target.value = e.target.value.slice(0, -1)
    }

    if (e.target.value.length === 4) {
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
    all_transactions_block.innerHTML = '<p class="app-p">Пока что нет транзакций</p>'
}
loader.classList.remove('active')
// console.log(username, transactions, balance)

get_username_button.addEventListener('click', get_username)

setInterval(get_data, 500)


exit_button.addEventListener('click', () => {
    transition_modal.classList.remove('active')
})

const get_datetime = () => {
    const datetime = new Date()
    let day = datetime.getDate()
    if (parseInt(day) < 10) {
        day = "0" + day.toString()
    }
    let month = parseInt(datetime.getMonth()) + 1
    if (parseInt(month) < 10) {
        month = "0" + month.toString()
    }
    let year = datetime.getFullYear()

    let hour = datetime.getHours()
    if (parseInt(hour) < 10) {
        hour = "0" + hour.toString()
    }
    let minutes = datetime.getMinutes()
    if (parseInt(minutes) < 10) {
        minutes = "0" + minutes.toString()
    }
    const datetimestr = day.toString() + "." + month.toString() + "." + year.toString() + " " + hour.toString() + ":" + minutes.toString()
    return datetimestr
}

const add_transaction = async () => {
    // console.log(transition_modal.id)
    if (transition_modal.id === 'plus') {
        await window.versions.add_transaction_for_chet(transaction_modal_input.value + rublehtml + " " + get_datetime(), add_button.id)
        await window.versions.get_transactions_for_chet(add_button.id).then(
            (value) => {
                if (value !== '') {
                    transactions = value.split('\n')
                    all_transactions_block.innerHTML = ''
                    for (let i = 0; i < transactions.length; i++) {
                        create_transaction_block(parseFloat(transactions[i]), transactions[i])
                    }
                } else {
                    all_transactions_block.innerHTML = '<p class="app-p">Пока что нет транзакций</p>'
                }
            }
        )
    } else if (transition_modal.id === 'minus') {
        await window.versions.add_transaction_for_chet(0 - transaction_modal_input.value + rublehtml + " " + get_datetime(), add_button.id)
        await window.versions.get_transactions_for_chet(add_button.id).then(
            (value) => {
                if (value !== '') {
                    transactions = value.split('\n')
                    all_transactions_block.innerHTML = ''
                    for (let i = 0; i < transactions.length; i++) {
                        create_transaction_block(parseFloat(transactions[i]), transactions[i])
                    }
                } else {
                    all_transactions_block.innerHTML = '<p class="app-p">Пока что нет транзакций</p>'
                }
            }
        )
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
    transaction_modal_input.focus()
})

button_minus.addEventListener('click', () => {
    transition_modal.classList.add('active')
    transition_modal.id = 'minus'
    transaction_modal_input.focus()
})

add_button.addEventListener('click', add_transaction)

clear_history_button.addEventListener('click', async () => {
    await window.versions.clear_all().then(
        () => {
            main_menu.classList.remove('active')
            get_data()
            window.versions.get_transactions_for_chet('main').then(
                (value) => {
                    if (value !== '') {
                        transactions = value.split('\n')
                        all_transactions_block.innerHTML = ''
                        for (let i = 0; i < transactions.length; i++) {
                            create_transaction_block(parseFloat(transactions[i]), transactions[i])
                        }
                    } else {
                        all_transactions_block.innerHTML = '<p class="app-p">Пока что нет транзакций</p>'
                    }
                }
            )
            menu_button_lines[0].classList.remove('active1')
            menu_button_lines[1].classList.remove('active2')
        }
    )
})

balancesblock.addEventListener('click', async (e) => {
    if ((e.target.classList.contains('balance-block') || e.target.classList.contains('balance-name') || e.target.classList.contains('header-balance')) && e.target.id !== 'add_chet_button') {
        await window.versions.get_transactions_for_chet(e.target.id).then(
            (value) => {
                if (value !== '') {
                    transactions = value.split('\n')
                    all_transactions_block.innerHTML = ''
                    for (let i = 0; i < transactions.length; i++) {
                        create_transaction_block(parseFloat(transactions[i]), transactions[i])
                    }
                } else {
                    all_transactions_block.innerHTML = '<p class="app-p">Пока что нет транзакций</p>'
                }
            }
        )
    }

    if (e.target.classList.contains('button') && e.target.classList.contains('plus')) {
        transition_modal.classList.add('active')
        transition_modal.id = 'plus'
        transaction_modal_input.focus()
        add_button.id = e.target.id
    }

    if (e.target.classList.contains('button') && e.target.classList.contains('minus')) {
        transition_modal.classList.add('active')
        transition_modal.id = 'minus'
        transaction_modal_input.focus()
        add_button.id = e.target.id
    }
})
