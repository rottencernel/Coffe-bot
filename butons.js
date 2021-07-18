const {Markup} = require('telegraf')

const overvievButton = Markup.keyboard([ ['Посмотреть меню'], ['Проверить корзину'] ]).resize()
const reservButton = Markup.inlineKeyboard([ {text: 'Добавить в корзину', callback_data: '/reserv'} ])
const basketButtons = Markup.inlineKeyboard([
  {text: 'Заказать', callback_data: '/makeOrder'}, 
  {text: 'Редактировать', callback_data: '/remooveProduct'},
  {text: 'Отчистить', callback_data: '/bascketClear'}
])


module.exports = {
  overvievButton,
  reservButton,
  basketButtons
}

