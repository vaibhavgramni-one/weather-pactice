const weatherForm = document.querySelector('form')

let temperature = document.querySelector('#temperature')
let loca = document.querySelector('#location')

 weatherForm.addEventListener('submit' , (e) => {
     e.preventDefault()

     temperature.textContent = 'Loading...'

     const address = document.querySelector('input').value
     fetch('http://localhost:3000/weather?address=' + address).then((response) => {
     response.json().then((data) => {
         if(data.error)
             temperature.textContent = data.error
         else{
            temperature.textContent = data.forecast
            loca.textContent = data.location
        }
    })
    })

})

