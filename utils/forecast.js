const http = require('http')

const forecast = (latitude ,longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=e9967d1b7deb78e1c268174878abf6dd&query=${latitude},${longitude}`


    const request = http.request(url , (response) => {

        let data = ''

        response.on('data' , (chunk) => {
            data = data + chunk
        })

        response.on('end' , () => {
            data = JSON.parse(data)
            if(data.error){
                callback('May be you forgot to enter coordinates or invalid coordinates' , undefined)
            }
            else{
                callback(undefined, {
                    weatherDescription : data.current.weather_descriptions[0],
                    temperature : data.current.temperature,
                    feelsLike : data.current.feelslike
                })
            }
            
        })
    })

    request.on('error' , (error) => {
        callback('May be your internet is not working' , undefined)
    })


    request.end()

}

module.exports = forecast