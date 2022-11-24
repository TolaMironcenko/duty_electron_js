const exit_button = document.querySelector('.exit')
const transition_modal = document.querySelector('.transaction-modal')
const transaction_modal_input = document.querySelector('.transaction-modal-input')
const button_plus = document.querySelector('.button.plus')
const button_minus = document.querySelector('.button.minus')
const add_button = document.querySelector('.button.modal')
const header_balance = document.querySelector('.header-balance')
const all_transactions_block = document.querySelector('.transactions')

let balance = 0
let transactions = []

const equals = (transactions, valuetransactions) => {
    if (transactions.length !== valuetransactions.length) {
        return false
    }
    for (var i = 0; i < transactions.length; i++) {
        if (transactions[i] !== valuetransactions[i]) {
            return false
        }
    }
    return true
}

const create_transaction_block = (sum) => {
    console.log(isNaN(sum))
    if (!isNaN(sum)) {
        const transaction_block = document.createElement('div')
        const transaction_sum_p = document.createElement('p')
        transaction_sum_p.innerHTML = sum
        transaction_block.append(transaction_sum_p)
        transaction_sum_p.classList.add('sum')
        transaction_block.classList.add('transaction')
        if (sum > 0) {
            transaction_block.classList.add('plus')
            transaction_sum_p.innerHTML = '+' + sum
        } else {
            transaction_block.classList.add('minus')
            transaction_sum_p.innerHTML = sum
        }
        transaction_block.style = 'animation'
        all_transactions_block.append(transaction_block)
    }
}

// add_button.addEventListener('click', () => {
//
// })

setInterval(() => {
    window.versions.get_balance().then(
        (value) => {
            balance = value
            header_balance.innerHTML = balance
        }
    )
    window.versions.get_transactions().then(
        (value) => {
            if (value !== '') {
                if (!equals(transactions, value.split('\n'))) {
                    transactions = value.split('\n')
                    all_transactions_block.innerHTML = ''
                    for (var i = 0; i < transactions.length; i++) {
                        create_transaction_block(parseFloat(transactions[i]))
                    }
                }
            }
        }
    )
    // console.log((transactions))
    // console.log(balance)
}, 500)


exit_button.addEventListener('click', () => {
    transition_modal.classList.remove('active')
})

button_plus.addEventListener('click', () => {
    transition_modal.classList.add('active')
    transition_modal.id = 'plus'
})

button_minus.addEventListener('click', () => {
    transition_modal.classList.add('active')
    transition_modal.id = 'minus'
})

add_button.addEventListener('click', () => {
    if (transition_modal.id === 'plus') {
        window.versions.add_transaction(transaction_modal_input.value)
    } else if (transition_modal.id === 'minus') {
        window.versions.add_transaction(0 - transaction_modal_input.value)
    }

    transaction_modal_input.value = ''
    transition_modal.classList.remove('active')
})

const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
}

func()


