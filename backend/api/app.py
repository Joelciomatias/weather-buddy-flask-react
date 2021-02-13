from flask import Flask
from api.integration import weather_api
app = Flask(__name__)

@app.route('/')
def hello_world():
    res = weather_api.search_city('curitiba')
    return res
