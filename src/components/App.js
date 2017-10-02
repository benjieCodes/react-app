import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
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

  render () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
          <Order />
          <Inventory addFish={this.addFish} />
      </div>
    )
  }

}


export default App;
