const host = window.location.hostname;

const configs = {
  localhost: {
    apiUrl: "http://localhost:5000",
  },

  "weather-buddy-app.herokuapp.com": {
    apiUrl: "https://weather-buddy-api.herokuapp.com",
  },
};


export default {
    apiUrl: configs[host].apiUrl
}