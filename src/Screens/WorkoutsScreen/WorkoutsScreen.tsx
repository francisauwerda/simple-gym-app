import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import WorkoutsScreenView from './WorkoutsScreenView';
import { State } from '../../state/types';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const mapStateToProps = (state: State) => {
  const { workouts } = state;
  return { workouts };
};

export default connect(mapStateToProps)(WorkoutsScreenView);
