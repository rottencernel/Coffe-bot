require('dotenv').config()
const path = require('path')
const Order = require('./models/orders')
const { countTotalSum } = require('./bd')



const express = require('express');
const { Console } = require('console');
const orders = require('./models/orders');


const app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
app.use(express.static(__dirname + '/public'))


app.get('/login', (req, res) => {
    res.sendFile(path.resolve('views', 'login.html'))
})


app.post('/login', (req, res) => {
    res.redirect('/admin')
 
})

app.get('/admin', (req, res) => {
    Order.find({_status: 'sended'})
    .then(ord => res.render('admin', {order: ord, sum: countTotalSum(ord)}) )
    
    //  .then(order => res.send(order))
    .catch(err => console.log(err))
    
})





// app.post('/admin', (req, res) => {
//     res.redirect('/admin')
//     Order.find({}).
//     then((doc ) => bot.mention(864240601, 'jfjfjs'))
//     .catch(err => console.log(err))
    
//   } )


module.exports = app


