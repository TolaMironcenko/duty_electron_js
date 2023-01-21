const get_data = async () => {
    await window.versions.get_balance().then(
        (value) => {
            balance = value
            header_balance.innerHTML = balance
        }
    )
    await window.versions.get_transactions().then(
        (value) => {
            if (value !== '') {
                if (!equals(transactions, value.split('\n'))) {
                    transactions = value.split('\n')
                    all_transactions_block.innerHTML = ''
                    for (var i = 0; i < transactions.length; i++) {
                        create_transaction_block(parseFloat(transactions[i]))
                    }
                }
            } else {
                all_transactions_block.innerHTML = '<p class="app-p">Пока что нет транзакций</p>'
            }
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