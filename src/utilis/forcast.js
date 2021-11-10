/*jshint esversion: 6 */
const request = require("request");

const forcast = (location, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=fb2e1f2819a74b7c7ed088040c34d504&query=" +
    location;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Please Check your Intenet Connection", undefined);
    } else if (body.error) {
      callback("please check your your location", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        country: body.location.country,
        icon: body.current.weather_icons,
        description: body.current.weather_descriptions,
        feelslike: body.current.feelslike,
      });
    }
  });
};
module.exports = forcast;
// request({ url: url, json: true}, (error, response) =>{
//     if (error) {
//         console.log('Unable to connect with the weather service')
//     } else if(response.body.error){
//         console.log('Unable to find location')
//     }
//     else{

//         const currentTemperature = (response.body.current.temperature)
//         const feelsLike = (response.body.current.feelslike)
//         console.log(`It is currently is ${currentTemperature} degress out. it feels like ${feelsLike} degrees out.`)
//     }
// })
// `In ${body.request.query}, the temperature is ${body.current.temperature} degrees, but the apprrent temperature feels like ${body.current.feelslike},`
