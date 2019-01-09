import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';

function searchingFor (term){
  return function(x){
    return x.name.toLowerCase().includes(term.toLowerCase()) || !term; 
  }
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      people: [],
      term : ''
    }
    this.searchHandler = this.searchHandler.bind(this);
  }
  
  searchHandler (event) {
    this.setState({
      term : event.target.value
    })
  }

  getVideos = () => {
    axios.get('https://swapi.co/api/people')
      .then(res => {
        this.setState({people: res.data.results})
      }).catch(err => {
        console.log(err)
      })
  }

  componentDidMount(){
    this.getVideos();
  }


  render() {
    const {term, people} = this.state
    return (
      <div className="App">

<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          
          <label>Cari</label>
          <form>
            <input
              type="text"
              onChange={this.searchHandler}
            />
          </form>
          {
            people.filter(searchingFor(term)).map(people =>
              <div key={people.id}>
                <h1>{people.name}</h1>
              </div>
            )
          }
        </header>
      </div>
    );
  }
}

export default App;