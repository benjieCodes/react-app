import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
    console.log('You successfully changed the URL')
    // 1. grab the text from the box
    // try to modify data and avoid touching the DOM as much as possible

    // 2. we're going to transition from / to /store/:storeId
    const storeId = this.storeInput.value;
    console.log(`storeId = ${storeId}`)
    this.context.router.transitionTo(`/store/${storeId}`)
  }
  render() {
    // JSX Syntax below
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name"
          defaultValue={ getFunName() }
          ref={(input) => { this.storeInput = input}} /> { /* JSX Syntax For Commenting*/ }
        <button type="submit">Visit Store -></button>
      </form>
      // Can only run one parent element
    )
  }
}

// using context that tells React that StorePicker Component expects router to be accessed
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
