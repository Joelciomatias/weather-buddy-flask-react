import React from "react";

import "./Main.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import WeatherCard from "./WeatherCard";
import config from "../config";
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.fetchWealth = this.fetchWealth.bind(this);
    this.cityRef = React.createRef();
  }

  state = {
    city: {},
    history: [],
    cityName: null,
    showError: false,
    appStarted: true,
    showHistory: false,
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.fetchWealth(e);
  };

  setShowError(showError) {
    this.setState({ showError });
  }

  fetchWealth(e) {
    this.fetchHistory();
    e.preventDefault();
    this.setShowError(false);
    var city = {};
    this.setState({ city: {} });
    axios
      .get(`${config.apiUrl}/weather/${this.cityRef.current.value}`)
      .then((res) => {
        if (res.data.cod == 200) {
          city.name = res.data.name;
          city.temp = res.data.main.temp + " °C";
          city.main = res.data.weather[0].main;
          this.setState({ city });
          this.setState({ showHistory: true });
        } else {
          this.setState({ showError: true });
        }
        console.log(city);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        this.setState({ appStarted: true });
      });
  }

  fetchHistory() {
    axios.get(`${config.apiUrl}/weather?max=${5}`).then((res) => {
      console.log(res.data);
      let cities = [];
      res.data.history.forEach((obj) => {
        cities.push({
          name: obj.name,
          temp: obj.main.temp + " °C",
          main: obj.weather[0].main,
        });
      });
      console.log(cities);
      cities = cities.reverse();
      this.setState({ history: cities });
    });
  }

  render() {
    return (
      <div>
        <Container className="Container">
          <Row
            className="justify-content-md-center"
            style={{ minHeight: "30vh" }}
          >
            <Form onSubmit={this.onFormSubmit} inline>
              <p>
                How is the weather in
                <Form.Control
                  autoFocus
                  onChange={(e) =>
                    this.setState(
                      { cityName: e.target.value },
                      this.setShowError(false)
                    )
                  }
                  ref={this.cityRef}
                  style={{
                    borderWidth: "0px",
                    border: "none",
                    backgroundColor: "#fafafa",
                    borderBottom: "1px solid gray",
                  }}
                  type="text"
                />
                now?
              </p>
            </Form>
          </Row>
          {this.state.appStarted && (
            <Row
              className="justify-content-sm-center"
              style={{ minHeight: "20vh" }}
            >
              {this.state.showError && (
                <Alert
                  style={{ height: "fit-content" }}
                  variant="danger"
                  dismissible
                  onClose={() => this.setShowError(false)}
                >
                  Sorry. We could't find the specified city.
                </Alert>
              )}
              {this.state.city.name && <WeatherCard city={this.state.city} />}
            </Row>
          )}
        </Container>
        {this.state.showHistory && (
          <div className="d-flex justify-content-sm-center">
            <div
              className="d-flex justify-content-center"
              style={{ width: "65%" }}
            >
              <Row className="">
                <div
                  className="px-1 py-1 row d-flex justify-content-between"
                  style={{ backgroundColor: "#D5F3FE" }}
                >
                  {this.state.history.map((city, idx) => (
                    <WeatherCard key={idx} city={city} />
                  ))}
                </div>
              </Row>
            </div>
          </div>
        )}
      </div>
    );
  }
}
