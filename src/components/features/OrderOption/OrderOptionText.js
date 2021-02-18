import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionText = ({name, currentValue, setOptionValue}) => (
  <div className={styles.number}>
    <label>
      <input
        type='text'
        placeholder={name}
        onChange={event => setOptionValue(event.currentTarget.value)}
        value={currentValue}
      />
    </label>
  </div>
);

OrderOptionText.propTypes = {
  currentValue: PropTypes.string,
  name: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;
