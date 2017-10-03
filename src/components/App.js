import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes'
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    // getinitialState
    this.state = {
      fishes: {},
      order: {},
    };
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
      , {
        context: this,
        state: 'fishes',
      });

      //check if there is any order in localStorage
      const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

      if (localStorageRef) {
        // update our App component's order state
        this.setState({
          order: JSON.parse(localStorageRef)
        });
      }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    // this runs right before <App> is rendered
    console.log('Something has changed');
    console.log({nextProps, nextState});
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order)); // the reason why we stringify object is because localStorage can only accept string
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

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null; // setting to null instead of delete fishes[key] for firebase purposes
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order}
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order: order });
  }


  render () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object
              .keys(this.state.fishes) // Object keys returns object as an Array
              .map(key => <Fish key={key} index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
          <Order
            fishes={this.state.fishes}
            order={this.state.order}
            params={this.state.params}
          />
          <Inventory
            addFish={this.addFish}
            loadSamples={this.loadSamples}
            fishes={this.state.fishes}
            updateFish={this.updateFish}
            removeFish={this.removeFish}
          />
      </div>
    )
  }
}
export default App;
