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
const main_menu_button = document.querySelector('#main_menu_button')
const main_menu = document.querySelector('.main-menu')
const menu_button_lines = document.querySelectorAll('.line')
const clear_history_button = document.querySelector('#clear_history_button')
const main_balance_name = document.querySelector('#main_balance_name')
const add_chet_button = document.querySelector('#add_chet_button')
const add_chet_modal = document.querySelector('#add_chet_modal')
const add_chet_input = document.querySelector('#new_chet_name_input')
const add_chet_name_button = document.querySelector('#new_chet_name_button')
const close_add_chet_modal = document.querySelector('#close_add_chet_modal')
const balancesblock = document.querySelector('.balance')

let balance = 0
let main_balance_name_value = ''
let chets = []
let transactions = []
let username = localStorage.getItem('username')?localStorage.getItem('username'):''
let password = ''
let retype_password = ''
let theme = localStorage.getItem('theme')?localStorage.getItem('theme'):'white'

const rublehtml = "&#8381;"
const usdhtml = "&dollar;"
