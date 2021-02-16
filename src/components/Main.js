import React from 'react';

import './Main.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import CardDeck from 'react-bootstrap/CardDeck';
import WeatherCard from './WeatherCard';
import config from '../config'
export default class Main extends React.Component {

  constructor(props){
    super(props);
    this.fetchWealth = this.fetchWealth.bind(this);
    this.cityRef = React.createRef();
  }

  state = {
    history: [{name: "Toronto", temp: "-6.18 °C", main: "Snow"},
    {name: "Caracas", temp: "20.42 °C", main: "Clouds"},
    {name: "Panama", temp: "22.96 °C", main: "Clouds"},
    {name: "Bogotá", temp: "10 °C", main: "Clouds"}],
    // city:{name:""}
    // history:[],
    cityName:null,
    city:{'name':'curitiba','temp':'34 C','main':'Clouds'},
    showError:false
  }

  onFormSubmit = e => {
    e.preventDefault();
    console.log(this)
    this.fetchWealth(e)
    
    // send to server with e.g. `window.fetch`
  }

  handleKeyPress(e) {
    // e.preventDefault();
    if(e.charCode==13){
      // console.log(this.cityRef.current.value)
      // console.log(this.cityRef.current.value)
      alert('Enter clicked!!!');   
      // this.fetchWealth(e)
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
    this.setState({ history:[] })
      axios.get(`${config.apiUrl}/weather/${this.cityRef.current.value}`)
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
    }).catch(e => {
      console.error(e)
    }).finally(()=>{
      this.fetchHistory()
    })

  }

  fetchHistory(){

    axios.get(`${config.apiUrl}/weather?max=${5}`)
    .then(res => {
      console.log(res.data)
      let cities = []
      res.data.history.forEach((obj)=>{
        cities.push({
          name: obj.name,
          temp: obj.main.temp + ' °C',
          main: obj.weather[0].main,
        })
      })
      console.log(cities)
      this.setState({ history:cities });
    })
  }

  render() {
    return (
      <Container>
        <h2 className="my-3">WHEATER BUDDY</h2>
        <hr></hr>
        
        <Row className="justify-content-md-center">
          <Form onSubmit={this.onFormSubmit} inline>
            <p> How is the weather in
              {/* <input style={{'border-width':'0px','border': 'none'}} type="text" id="city" name="city" ref={(c) => this.city = c}/> */}
            <Form.Control onChange={e => this.setState({ cityName: e.target.value },this.setShowError(false))} 
            
            ref={this.cityRef} style={{'borderWidth':'0px','border': 'none','backgroundColor':'#fafafa','borderBottom':'1px solid gray'}}  type="text" />
                now?
            </p>  
          </Form>
        </Row>
        {/* {
          this.state.cityName &&
          <Button 
          className="mb-2"  onClick={this.fetchWealth}>Wealth</Button>
        } */}
        <Row className="mt-5 justify-content-sm-center">
            {
              this.state.showError &&
              <Alert  variant='danger' dismissible onClose={() => this.setShowError(false)}>
                Sorry. We could't find the specified city.
              </Alert>
            }
          { this.state.city.name &&
            <WeatherCard city={this.state.city}/>
          }
        </Row>

          {this.state.history.length &&
        <Row className="mt-5 justify-content-sm-center">
            <CardDeck className="py-4 px-3" style={{ backgroundColor: "#D5F3FE" }}>
            {this.state.history.map((city, idx)=>(
            <WeatherCard key={idx} city={city}/>
            ))}
          </CardDeck>
        </Row>
          }

      </Container>
    )
  }
}