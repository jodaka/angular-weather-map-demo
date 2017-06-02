# Prometheus
Prometheus is an application to collect and show weather forecast data for a given location.

## Front-end Technical Test
The work required to build Prometheus is representative of the work you will be doing at Draewil. We have created this test for you to showcase how you work. 

Your task is to create a small ES2015 AngularJS 1.6.x application to the following requirements:

* Implement the add new location form. This should save a location to local storage.
* Implement the location list with each location showing a summary weather forecast.
* Ensure each location is editable.
* Ensure each location can be removed from city list.

#### Bonus points

* Implement change of language.
* Implement change of units.

#### Project setup

We have setup a simple project to help you get started. Ensure you install all dependencies and then run:

`npm start`

This will run a dev server and setup ES2015 transpiling so you can just start coding.

#### API

The following endpoint `https://prometheus-api.draewil.net/[APIKEY]/[latitude],[longitude]?[additional params - optional]` responds with JSON data. The API requires you to specify a API key in URI.

`Authorization API key: c6987ba1fcc7450aea9cff041bb42825`

#### GET https://prometheus-api.draewil.net/c6987ba1fcc7450aea9cff041bb42825/51.500334,-0.085013

```json 
[
  {
"latitude": 51.500334,
"longitude": -0.085013,
"timezone": "Europe/London",
"offset": 1,
"currently": {
"time": 1495028635,
"summary": "Light Rain",
"icon": "rain",
"nearestStormDistance": 0,
"precipIntensity": 0.0206,
"precipIntensityError": 0.0119,
"precipProbability": 0.98,
"precipType": "rain",
"temperature": 64.18,
"apparentTemperature": 64.18,
"dewPoint": 60.16,
"humidity": 0.87,
"windSpeed": 2.96,
"windBearing": 295,
"visibility": 5.73,
"cloudCover": 0.62,
"pressure": 1014.25,
"ozone": 302.9
},
"minutely": {
"summary": "Light rain stopping in 12 min., starting again 35 min. later.",
"icon": "rain",
"data": [
{
"time": 1495028580,
"precipIntensity": 0.027,
"precipIntensityError": 0.011,
"precipProbability": 0.99,
"precipType": "rain"
},
{
"time": 1495028640,
"precipIntensity": 0.02,
"precipIntensityError": 0.012,
"precipProbability": 0.98,
"precipType": "rain"
},
...
]
```

You can preview the request in the terminal.
> $ curl https://prometheus-api.draewil.net/c6987ba1fcc7450aea9cff041bb42825/51.500334,-0.085013?lang=fr&units=si

Additional params:

You can specify language parameter:
lang=[language]
where values are:
en - English
fr - French
es - Spanish
de - German

You can specify units parameter:
units=[units]
where values are:
auto - selects units based on location
si - si units
us - imperial units


### UI

* https://raw.githubusercontent.com/DraewilTech/interview-assets/master/prometheus-frontend-mainscreen.png
* https://raw.githubusercontent.com/DraewilTech/interview-assets/master/prometheus-frontend-addlocation.png

### Additional Information

We value quality over feature-completeness and we will take into consideration your experience level.

We understand that you’ve probably got a full-time job and a personal life so aim to spend no more than 2 to 3 hours on this test.

If you have any questions then please get in touch.

Good luck!
