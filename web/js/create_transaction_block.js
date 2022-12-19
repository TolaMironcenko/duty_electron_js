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