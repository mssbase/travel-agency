import {connect} from 'react-redux';
import Trips from './Trips';
import {getFilteredTrips} from '../../../redux/tripsRedux';


const mapStateToProps = (state) => {
  return {
    trips: getFilteredTrips(state),
  };
};


export default connect(mapStateToProps)(Trips);
