console.log('ok')

document.getElementById('but').onclick = () =>
 {
    let mess = document.getElementById('mess').value
    console.log(mess)
    return mess
 }

 
// let kkk = fetch('http://localhost:3000/admin').then(response => console.log(response.json))
const reqestURL = 'http://localhost:3000/admin'

const xhr = new XMLHttpRequest()
xhr.open('GET', reqestURL)

xhr.onload = () => {
   console.log(xhr.response)
}

xhr.send()
