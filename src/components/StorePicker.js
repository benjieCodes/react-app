import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  render() {
    // JSX Syntax below
    return (

      <form className ="store-selector">
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={ getFunName() }/> { /* JSX Syntax */ }
        <button type="submit">Visit Store -></button>
      </form>
      // Can only run one parent element
    )
  }
}

export default StorePicker;
