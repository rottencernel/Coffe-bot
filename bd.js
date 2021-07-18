const Order = require('./models/orders')
const products = require('./models/products')



const productReserver = (id, name, data) => {
    const order = new Order({id: id, name: name, products: data, _status: 'is not sent'})
    order.save(function(err) {
        if (err) return handleError(err)
    })
}


const basketFormater = (doc) => {
    let formattedBasket = doc
          .reduce((acc, el) =>
          acc + `${el.products}\n`, [])

    return `${formattedBasket}\n ${countTotalSum(doc)}`
}


const countTotalSum = (doc) => {
    let summ = doc.reduce((acc, el) =>
          acc + parseInt(el.products.match(/\d+/)), 0) 

      if(summ == 0) return 0
      else return `Итоговая сумма: ${summ} рублей`
}



module.exports = {productReserver, basketFormater, countTotalSum}
