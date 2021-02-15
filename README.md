# Weather buddy

This project implements [OpenWeather API](https://openweathermap.org/current) and test my skills with react(javascript), flask(python) and some cache techniques.

#### Run project with docker
In the project root directory run:

```
 docker-compose up -d
```
There are both front-end and backend projects in this repository.



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
##### run project:

```bash
python run.py
```

##### run tests:
```bash
 python -m unittest -v test 
 ```

