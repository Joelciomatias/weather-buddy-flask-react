const host = window.location.hostname;

const configs = {
  [host]: {
    apiUrl: `http://${host}:5010`,
  },
};

export default {
    apiUrl: configs[host].apiUrl
}