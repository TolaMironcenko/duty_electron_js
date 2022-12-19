const exit_button = document.querySelector('.exit')
const transition_modal = document.querySelector('#transaction_sum')
const transaction_modal_input = document.querySelector('#transaction_sum_input')
const button_plus = document.querySelector('.button.plus')
const button_minus = document.querySelector('.button.minus')
const add_button = document.querySelector('.button.modal')
const header_balance = document.querySelector('.header-balance')
const all_transactions_block = document.querySelector('.transactions')
const username_modal = document.querySelector('#username')
const username_modal_input = document.querySelector('#username_input')
const get_username_button = document.querySelector('#get_username_button')
const username_header = document.querySelector('#username_header')
const loader = document.querySelector('.loader')
const logout_button = document.querySelector('#logout_button')

let balance = 0
let transactions = []
let username = localStorage.getItem('username')?localStorage.getItem('username'):''