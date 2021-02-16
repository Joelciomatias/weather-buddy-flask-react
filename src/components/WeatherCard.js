import React from "react";
import Card from "react-bootstrap/Card";

export default class WeatherCard extends React.Component {
  render() {
    return (
        <Card bg="light" className="shadow bg-white rounded mx-2 my-2" border="light" style={{ width: '15rem',height:'14rem' }}>
        <Card.Body >
          <Card.Title className="my-3">{this.props.city.name}</Card.Title>
          <Card.Text className="my-4 font-weight-bold" style={{ fontSize: "2rem" }}>
            {this.props.city.temp}
          </Card.Text>
          <Card.Subtitle className="mt-2">{this.props.city.main}</Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}
