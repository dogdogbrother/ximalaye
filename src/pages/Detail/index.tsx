import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {ModalStackParamList} from '@/navigator/index';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont/index';
import PlaySlider from './PlaySlider';

const mapStateToProps = ({player}: RootState) => {
  return {
    soundUrl: player.soundUrl,
    playState: player.playState,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<ModalStackParamList, 'Detail'>;
}

class Detail extends React.Component<IProps> {
  componentDidMount() {
    const {dispatch, route} = this.props;
    dispatch({
      type: 'player/fetchShow',
      payload: {
        id: route.params.id,
      },
    });
  }

  toggle = () => {
    const {dispatch, playState} = this.props;
    dispatch({
      type: playState === 'playing' ? 'player/pause' : 'player/play',
    });
  };

  previous = () => {};

  render() {
    const {playState} = this.props;
    return (
      <View style={styles.container}>
        <Text>Detail</Text>
        <PlaySlider />
        <View>
          <Touchable onPress={this.previous}>
            <Icon name="iconlisting-content-fill" size={30} color="#fff" />
          </Touchable>
          <Touchable onPress={this.toggle}>
            <Icon
              name={
                playState === 'playing' ? 'iconhome-fill' : 'iconfavorites-fill'
              }
              size={40}
              color="#fff"
            />
          </Touchable>
          <Touchable>
            <Icon name="iconlisting-content-fill" size={30} color="#fff" />
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
});

export default connector(Detail);
