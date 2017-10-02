import React from 'react';
import { formatPrice } from '../helpers'
class Fish extends React.Component {
  render () {
    const { details } = this.props; // to prevent from refering this.props to fish object

    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>


      </li>
    )
  }
}

export default Fish;
