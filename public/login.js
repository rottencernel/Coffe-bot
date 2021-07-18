document.getElementById('letin').onclick = () =>
 {
    let status = false
        let login = document.getElementById('u').value
        let password = document.getElementById('p').value
        login === 'admin' && password === '1q2w3e4r'
        ?
        status = true
        : status 
        // document.getElementById("n").innerHTML = 'Вы ввели неверные данные'
        
        console.log(status)
        return status 
 }






