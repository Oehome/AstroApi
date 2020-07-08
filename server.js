"use strict"

const cors = require('cors')
const SunCalc = require('suncalc')
const express = require('express')
const app = express()
const port = 3000



// der server

app.listen(port, () => {
   console.log('Server is up and listening on port ' + port)
})

app.use(cors())



app.use(express.json());

let counter = 0
app.post('/astrodata', (req, res) => {
   
   console.log(typeof  req.body+ " "+req.body);
   console.log(req.body.lon)
   
   let answer={
      range: req.body.date,
      lon: req.body.lon,
      lat: req.body.lat,
      values:berechneAstrodaten(req.body)

   }
   console.log(answer)
   
   counter++
   res.status(200).json(berechneAstrodaten(req.body))
   
});


function berechneAstrodaten(request) {

   let lat = request.lat
   let lon = request.lon
   let date = new Date(request.date)
   let results=[]

   for (let i = 0; i < 20; i++) {

      let nextDate = date.getDate() + 1
      date.setDate(nextDate)
      let formatted_day = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      var times = SunCalc.getTimes(date, lat, lon)
      var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes()
      var sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes()
      
      let dayresults={
         date: formatted_day,
         sunrise: sunriseStr,
         sunset: sunsetStr
      };
      results.push(dayresults)
      

   }

   return (results)

}