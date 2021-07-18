require('dotenv').config();

const { json } = require('express'),
  { Telegraf } = require('telegraf'),
  axios = require('axios'),
  mongoose = require('mongoose'),
  Products = require('./models/products'),
  Order = require('./models/orders'),
  app = require('./app'),
  { productReserver, basketFormater, countTotalSum } = require('./bd'),
  { overvievButton, reservButton, basketButtons } = require('./butons');


const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => 
  ctx.reply(
    `
    Здравствуй, ${ctx.message.from.first_name}!
Здесь вы можете сделать заказ в нашей кофейне!
Выберите позицию из предлженных (Посмотреть меню), или просто напишите название конкретной позиции`,
    overvievButton
  ))


bot.hears('Посмотреть меню', ctx => 
  Products.find({})
    .then(product => {
        for(let i = 0; i < product.length; i++) {
        ctx.reply(`${product[i].name} : ${product[i].price}`, reservButton)
        }
    })
    .catch(err => { 
      ctx.reply('Что-то пошло не такю Меню в данный момент не доступно')
      console.log(err)
    }) 
  )


bot.hears('Проверить корзину', ctx =>
  Order.find({id: ctx.from.id})
    .then(basket => {
      if( !countTotalSum(basket) )
      ctx.reply('Вы пока ничего не добавили в корзину')

      else
      ctx.reply( basketFormater(basket), basketButtons ) 
    })
    .catch(err => {
        ctx.reply('Что-то пошло не так попробуйте еще раз')
        console.log(err)
    })
)


bot.action('/reserv', ctx => {
  let id = ctx.update.callback_query.from.id
  let name = ctx.update.callback_query.from.first_name
  let data = ctx.update.callback_query.message.text

  productReserver(id, name, data) 
  ctx.reply(`${data} добавленно в корзину`)
})


bot.action('/bascketClear', ctx => 
  Order.deleteMany({id: ctx.update.callback_query.from.id})
    .then(ctx.reply('Корзина отчищена'))
    .catch(err => console.log(err) )
)

bot.action('/remooveProduct', ctx =>
 ctx.reply(`
 Чтобы удаить позицию из корзины просто отправте боту название выбранной позиции добавив команду /del в начвло сообщения\n
 например: /del Мокко с розой`) 
)


 bot.action('/makeOrder', ctx => {
   Order.updateMany(
      {id: ctx.update.callback_query.from.id},
      {_status: 'sended'}
    )
    .then(ctx.reply('Ваш заказ отправлен, и ожидает подтвепждения'))
    .catch(err => { 
      ctx.reply('Что-то пошло не так.')
      console.log(err)
    })
 })
 

//  app.post('/admin', (req, res) => {
//   res.redirect('/admin')
//   Order.find({}).
//   then((doc ) => ctx.reply(864240601, 'jfjfjs'))
//   .catch(err => console.log(err))
  
// } )


bot.on('text', ctx => {
  if (ctx.message.text.includes('/del')) {
    let input = new RegExp(ctx.message.text.slice(5))

    Order.findOneAndDelete({id: ctx.from.id, products: input})
      .then(order => order !== null 
        ? ctx.reply(`${order.products} удален из корзины`)
        : ctx.reply(`${ctx.message.text.slice(5)} в корзине нет`))
      .catch(err => {
         ctx.reply('Что-то пошло не так, попробуйте снова. Возможно стоит проверить правильно ли вы написали название позициию')
         console.log(err)
      })
  }
  
  else {
    Products.findOne({name: ctx.message.text})
      .then( product => product !== null 
        ?  ctx.reply(`${product.name} : ${product.price}`, reservButton) 
        : ctx.reply('Такой позиции, не существует. Попробуйте еще раз') )
      .catch(err => console.log(err)) 
  } 
})
 

mongoose.connect(process.env.DB_TOKEN, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
      .then(bot.launch())
      .then(app.listen(process.env.PORT))
      .catch((err) => console.log(err))

      console.log('bot started...')
      console.log('App is running...')


      