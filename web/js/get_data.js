const add_balance_block = (chet_name, balance) => {
    const balanceblock = document.createElement('div')
    balanceblock.classList.add('balance-block')
    balanceblock.id = chet_name

    if (chet_name !== 'main') {
        const deletechetbutton = document.createElement('button')
        deletechetbutton.classList.add('exit')
        // deletechetbutton.classList.add('chet')
        deletechetbutton.innerHTML = '✖'
        deletechetbutton.id = chet_name
        balanceblock.append(deletechetbutton)
    }

    const balancename = document.createElement('h1')
    balancename.classList.add('balance-name')
    balancename.id = chet_name
    balancename.innerHTML = chet_name
    const headerbalance = document.createElement('h1')
    headerbalance.classList.add('header-balance')
    headerbalance.id = chet_name
    headerbalance.innerHTML = balance

    const plusbutton = document.createElement('button')
    plusbutton.classList.add('button')
    plusbutton.classList.add('plus')
    plusbutton.innerHTML = '+'
    plusbutton.id = chet_name
    const minusbutton = document.createElement('button')
    minusbutton.classList.add('button')
    minusbutton.classList.add('minus')
    minusbutton.innerHTML = '-'
    minusbutton.id = chet_name
    const buttons = document.createElement('div')
    buttons.classList.add('header-buttons')
    buttons.append(plusbutton, minusbutton)

    // balancesblock.removeChild(add_chet_button)
    balanceblock.append(balancename, headerbalance, buttons)
    balancesblock.append(balanceblock, add_chet_button)
}

const get_data = async () => {
    await window.versions.get_balance().then(
        (value) => {
            balance = value
            header_balance.innerHTML = balance
        }
    )
    await window.versions.get_all_chets().then(
        value => {
            // console.log('value = ', JSON.stringify(value))
            // console.log('c===v: ', JSON.stringify(value) !== JSON.stringify(chets))
            if (JSON.stringify(chets) !== JSON.stringify(value)) {
                chets = value
                balancesblock.innerHTML = ''
                for (let i = 0; i < chets.length; i++) {
                    console.log('iiiiiiiiiii: ', i)
                    add_balance_block(chets[i].name, chets[i].balance)
                }
                // console.log('chets = ', JSON.stringify(chets))
            }
        }
    )
    await window.versions.get_main_balance_name().then(
        (value) => {
            main_balance_name_value = value
            main_balance_name.innerHTML = main_balance_name_value
        }
    )
    // await window.versions.get_transactions().then(
    //     (value) => {
    //         if (value !== '') {
    //             if (!equals(transactions, value.split('\n'))) {
    //                 transactions = value.split('\n')
    //                 all_transactions_block.innerHTML = ''
    //                 for (let i = 0; i < transactions.length; i++) {
    //                     create_transaction_block(parseFloat(transactions[i]))
    //                 }
    //             }
    //         } else {
    //             all_transactions_block.innerHTML = '<p class="app-p">Пока что нет транзакций</p>'
    //         }
    //     }
    // )
    await window.versions.get_username().then(
        (value) => {
            username = value
        }
    )
    if (theme === 'dark') {
        document.body.setAttribute('dark', '');
        theme_checkbox.checked = true;
    } else {
        document.body.removeAttribute('dark');
        theme_checkbox.checked = false;
    }
}