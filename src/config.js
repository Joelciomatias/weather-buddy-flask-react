const host = window.location.hostname;

const configs = {
  localhost: {
    apiUrl: "http://localhost:5010",
  },
};


export default {
    apiUrl: configs[host].apiUrl
}