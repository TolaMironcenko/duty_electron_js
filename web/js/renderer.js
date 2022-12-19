
if (username !== '') {
    username_header.innerHTML = username
    username_modal.classList.remove('active')
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

// const create_transaction_block = (sum) => {
//     console.log(isNaN(sum))
//     if (!isNaN(sum)) {
//         const transaction_block = document.createElement('div')
//         const transaction_sum_p = document.createElement('p')
//         transaction_sum_p.innerHTML = sum
//         transaction_block.append(transaction_sum_p)
//         transaction_sum_p.classList.add('sum')
//         transaction_block.classList.add('transaction')
//         if (sum > 0) {
//             transaction_block.classList.add('plus')
//             transaction_sum_p.innerHTML = '+' + sum
//         } else {
//             transaction_block.classList.add('minus')
//             transaction_sum_p.innerHTML = sum
//         }
//         transaction_block.style = 'animation'
//         all_transactions_block.append(transaction_block)
//     }
// }

const get_username = () => {
    if (username_modal_input.value !== '' && !/^\s+$/.test(username_modal_input.value)) {
        username = username_modal_input.value
        username_header.innerHTML = username
        username_modal.classList.remove('active')
        localStorage.setItem('username', username)
        username_modal_input.value = ''
    } else {
        username_modal_input.classList.add('err')
    }
}

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
