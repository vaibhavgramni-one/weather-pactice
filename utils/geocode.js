const https = require('https')

const geocode = (address , callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmdyYW1uaSIsImEiOiJja2ZtNjN5cmMwMmRsMnpwbDN4amZ5czE5In0.wSN7y72upmm90XSKCr9fRQ&limit=1`

    const request = https.request(url , (response) => {

        let data = ''
        response.on('data' , (chunk) => {
            data = data + chunk
       
        })

        response.on('end' , () => {
            data = JSON.parse(data)
            if(data.message){
                callback('May be you forgot to pass any location or invalid location or cant search right now..' , undefined)
            }
            else{
                callback(undefined , {
                    location : data.features[0].place_name,
                    latitude : data.features[0].center[1],
                    longitude : data.features[0].center[0]
                })
            }
        })

    })

    request.on('error' , (error) => {
        callback('May be your internet is not working' , undefined)
    })

    request.end()
}

module.exports = geocode