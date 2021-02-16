# Weather buddy

This project implements [OpenWeather API](https://openweathermap.org/current) and test my skills with react(javascript), flask(python) and some cache techniques.


<a href="https://weather-buddy-app.herokuapp.com" target="_blank">Try this project on Heroku!</a>

There are both front-end and backend projects in this repository.
### Run project with docker
In the project root directory:

Create the **.env** file with the environment variables (see backend section below)

Run docker:

```
 docker-compose up -d
```
And app will run in (http://localhost:3000)
### Set up development environment


#### System requirements

* Node 12.18.3+
* Python 3.8+

#### `Front-end`

##### setup:       

``` bash
npm install
```
##### run project:
```bash
npm run start 
```
##### run tests:
```bash 
npm test
```

#### `Back-end`

##### setup:       
```bash
cd backend/ && python -m venv env && source env/bin/activate
```

```bash
pip install -r requirements.txt
```

##### environment variables:

WEATHER_API_KEY - token from  [OpenWeather API](https://openweathermap.org/current) **(mandatory**)

WEATHER_API_URL - Open Weather url `default (https://api.openweathermap.org/data/2.5/weather)`

LAST_SEARCHED_CITIES - number of cities that will be stored in the cache `default (5)`

CACHE_TIMEOUT - time in seconds that the cache will be maintained `default(300) - 5 minutes`

##### run project:

```bash
python run.py
```

##### run tests:
```bash
 python -m unittest -v test 
 ```

