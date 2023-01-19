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
const enter_password_input = document.querySelector('#enter_password_input')
const enter_password_modal = document.querySelector('#enter_password')
const enter_password_button = document.querySelector('#enter_password_button')
const retype_password_modal = document.querySelector('#retype_password')
const retype_password_input = document.querySelector('#retype_password_input')
const retype_password_button = document.querySelector('#retype_password_button')
const theme_checkbox = document.querySelector('#theme_checkbox')
const circles = document.querySelectorAll('.circle')
const circles_retype = document.querySelectorAll('.circle.retype')

console.log(circles_retype)

let balance = 0
let transactions = []
let username = localStorage.getItem('username')?localStorage.getItem('username'):''
let password = ''
let retype_password = ''
let theme = localStorage.getItem('theme')?localStorage.getItem('theme'):'white'