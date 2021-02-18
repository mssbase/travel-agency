import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.scss';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import {addDays} from '../../../utils/calculateTripDuration';

class OrderSummary extends React.Component {

  render(){
    const {tripCost, options, tripDuration} = this.props;
    return (
      <div>
        <h2 className={styles.component}>Total: <strong>{formatPrice(calculateTotal(tripCost, options))} </strong></h2>
        <h2 className={styles.component}>Trip Duration: {tripDuration} </h2>
        <h2 className={styles.component}>Start Date: {options['start-date'].toISOString().slice(0, 10)}</h2>
        <h2 className={styles.component}>Finish Date: {addDays(options['start-date'], tripDuration).toISOString().slice(0, 10)}</h2>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  tripDuration: PropTypes.number,
};

export default OrderSummary;
