import React from 'react';
import {View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Carousel from './Carousel';
import Guess from './Guess';
import {ScrollView} from 'react-native-gesture-handler';
const mapStateToProps = ({home}: RootState) => ({
  carousels: home.carousels,
});

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarousels',
    });
  }
  render() {
    const {carousels} = this.props;
    return (
      <ScrollView>
        <Carousel data={carousels} />
        <Guess />
      </ScrollView>
    );
  }
}
export default connector(Home);
