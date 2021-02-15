import React from "react";
import Card from "react-bootstrap/Card";

export default class WeatherCard extends React.Component {
  render() {
    return (
        <Card bg="light" className="shadow bg-white rounded" border="light" style={{ width: '18rem' }}>
        <Card.Body >
          <Card.Title>{this.props.city.name}</Card.Title>
          <Card.Text style={{ fontSize: "2rem" }}>
            {this.props.city.temp}
          </Card.Text>
          <Card.Subtitle className="mt-2">{this.props.city.main}</Card.Subtitle>
        </Card.Body>
      </Card>
    );
  }
}
