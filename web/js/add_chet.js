const add_balance_block = (chet_name, balance) => {
    const balanceblock = document.createElement('div')
    balanceblock.classList.add('balance-block')
    balanceblock.id = chet_name

    const deletechetbutton = document.createElement('button')
    deletechetbutton.classList.add('exit')
    // deletechetbutton.classList.add('chet')
    deletechetbutton.innerHTML = '✖'
    deletechetbutton.id = chet_name

    const balancename = document.createElement('h1')
    balancename.classList.add('balance-name')
    balancename.id = chet_name + '_balance_name'
    balancename.innerHTML = chet_name
    const headerbalance = document.createElement('h1')
    headerbalance.classList.add('header-balance')
    headerbalance.id = chet_name + '_balance'
    headerbalance.innerHTML = balance

    const plusbutton = document.createElement('button')
    plusbutton.classList.add('button')
    plusbutton.classList.add('plus')
    plusbutton.innerHTML = '+'
    const minusbutton = document.createElement('button')
    minusbutton.classList.add('button')
    minusbutton.classList.add('minus')
    minusbutton.innerHTML = '-'
    const buttons = document.createElement('div')
    buttons.classList.add('header-buttons')
    buttons.append(plusbutton, minusbutton)

    balancesblock.removeChild(add_chet_button)
    balanceblock.append(deletechetbutton, balancename, headerbalance, buttons)
    balancesblock.append(balanceblock, add_chet_button)
}

add_chet_button.addEventListener('click', async () => {
    await window.versions.new_chet('new', 0)
    add_balance_block('new', 0)
    // add_chet_modal.classList.add('active')
    // add_chet_input.focus()
})

close_add_chet_modal.addEventListener('click', () => {
    add_chet_modal.classList.remove('active')
    add_chet_input.blur()
})