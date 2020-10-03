const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
console.log(path.join(__dirname , '/public'))
app.use(express.static(path.join(__dirname , '/public')))

app.set('view engine' , 'hbs')

app.get('',(req , res) => {
    res.render('front-end')
})

app.get('/weather' , (req, res) => {
    if(!req.query.address){
        return console.log('Please provide address field')
    }

    const address = req.query.address
    
    geocode(address  , (error , geocode) => {
        if(error){
            return console.log(error)
        }
        
        forecast(geocode.latitude ,geocode.longitude , (error , forecast) => {
            if(error){
                return console.log(error)
            }
            // console.log(forecast)
            // console.log(geocode.location)
            res.send({
                //forecast,
                forecast : `${forecast.weatherDescription}. The temperature is ${forecast.temperature} and feels like ${forecast.feelsLike}.`,
                location : geocode.location
            })
        })
    })
})

app.listen(3000 ,() => {
    console.log('server is up and running at port 3000')
})









