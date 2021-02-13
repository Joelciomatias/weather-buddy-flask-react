import React from 'react';

import axios from 'axios';

export default class Main extends React.Component {

  constructor(props){
    super(props);
    this.sayHello = this.sayHello.bind(this);
  }
  
  state = {
    history: [],
    city:{}
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }

  // componentDidMount() {
  //   axios.get(`https://jsonplaceholder.typicode.com/users`)
  //     .then(res => {
  //       const persons = res.data;
  //       this.setState({ persons });
  //     })
  // }

  sayHello(e) {
    e.preventDefault();
    var city = this.city.value;
    console.log(city)
      axios.get(`http://localhost:5000/weather/${city}`)
    .then(res => {
      console.log(res)
      
    })
    console.log(city)
    axios.get(`http://localhost:5000/weather?max=${5}`)
    .then(res => {
      console.log(res)
      
    })
  
    

  }

  render() {
    return (
      <div>
        <h2>WHEATER BUDDY</h2>
        <hr></hr>
        <p> How is the weather in
          <input type="text" id="city" name="city" ref={(c) => this.city = c}/>
          now?
        </p>  
        <button onClick={this.sayHello}>
          check
        </button>
      </div>
    )
  }
}