import React from 'react';

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default class Main extends React.Component {

  constructor(props){
    super(props);
    this.fetchWealth = this.fetchWealth.bind(this);
    this.cityRef = React.createRef();
  }


  
  state = {
    history: [],
    city:{name:""},
    cityName:null,
    // city:{'name':'curitiba','temp':'34 C','main':'Clouds'},
    showError:false
  }

  handleKeyPress(target) {
    if(target.charCode==13){
      // alert('Enter clicked!!!');   
      this.fetchWealth(target)
    } 
  }
  setShowError(showError) {
    this.setState({showError});
  }

  fetchWealth(e) {
    e.preventDefault();
    this.setShowError(false)
    var city = {}
    this.setState({ city:{} })
      axios.get(`http://localhost:5000/weather/${this.cityRef.current.value}`)
    .then(res => {
      console.log(res)
      
      if (res.data.cod == 200 ){
        city.name = res.data.name
        city.temp = res.data.main.temp + ' °C'
        city.main = res.data.weather[0].main
        this.setState({ city });
      } else {
        this.setState({ showError:true })
        // this.cityRef.current.value = ""
      }
      console.log(city)
    })

    axios.get(`http://localhost:5000/weather?max=${5}`)
    .then(res => {
      console.log(res)
      
    })
  }

  render() {
    return (
      <Container>
        <h2 className="my-3">WHEATER BUDDY</h2>
        <hr></hr>
        
        <Row className="justify-content-md-center">
          <Form inline>
            <p> How is the weather in
              {/* <input style={{'border-width':'0px','border': 'none'}} type="text" id="city" name="city" ref={(c) => this.city = c}/> */}
            <Form.Control onChange={e => this.setState({ cityName: e.target.value },this.setShowError(false))} 
            onKeyPress={this.handleKeyPress}
            ref={this.cityRef} style={{'borderWidth':'0px','border': 'none'}}  type="text" placeholder="city" />
                now?
            </p>  
          </Form>
        </Row>
        {
          this.state.cityName &&
          <Button 
          className="mb-2"  onClick={this.fetchWealth}>Wealth</Button>
        }

        <Row className="justify-content-md-center">
            {
              this.state.showError &&
              <Alert  variant='danger' dismissible onClose={() => this.setShowError(false)}>
                Sorry. We could't find the specified city.
              </Alert>
            }
          { this.state.city.name &&
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{this.state.city.name}</Card.Title>
              <Card.Text style={{ fontSize: '3rem' }}>
                {this.state.city.temp}
              </Card.Text>
              <Card.Subtitle className="mt-2">{this.state.city.main}</Card.Subtitle>
            </Card.Body>
          </Card>
          }
        </Row>
      </Container>
    )
  }
}