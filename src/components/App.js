import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes'

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);

    // getinitialState
    this.state = {
      fishes: {},
      order: {},
    };
  }

  addFish(fish) {
    // update our state
    const fishes = {...this.state.fishes} // will take item from object and spread it to this fishes state
    // add in our new fish
    const timestamp = Date.now(); // used as unique Id for fishes
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes: fishes })
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  render () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object
              .keys(this.state.fishes) // Object keys returns object as an Array
              .map(key => <Fish key={key} details={this.state.fishes[key]}/>)
            }
          </ul>
        </div>
          <Order />
          <Inventory addFish={this.addFish}
            loadSamples={this.loadSamples}/>
      </div>
    )
  }

}


export default App;
