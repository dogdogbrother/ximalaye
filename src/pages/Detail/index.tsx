import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {ModalStackParamList, ModalStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont/index';
import PlaySlider from './PlaySlider';

const mapStateToProps = ({player}: RootState) => {
  return {
    soundUrl: player.soundUrl,
    playState: player.playState,
    title: player.title,
    previousId: player.previousId,
    nextId: player.nextId,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: ModalStackNavigation;
  route: RouteProp<ModalStackParamList, 'Detail'>;
}

class Detail extends React.Component<IProps> {
  componentDidMount() {
    const {dispatch, route, navigation, title} = this.props;
    dispatch({
      type: 'player/fetchShow',
      payload: {
        id: route.params.id,
      },
    });
    navigation.setOptions({
      headerTitle: title,
    });
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.title !== prevProps.title) {
      this.props.navigation.setOptions({
        headerTitle: this.props.title,
      });
    }
  }

  toggle = () => {
    const {dispatch, playState} = this.props;
    dispatch({
      type: playState === 'playing' ? 'player/pause' : 'player/play',
    });
  };

  previous = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/previous',
    });
  };

  next = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/next',
    });
  };

  render() {
    const {playState, previousId, nextId} = this.props;
    return (
      <View style={styles.container}>
        <PlaySlider />
        <View style={styles.control}>
          <Touchable
            disabled={!previousId}
            onPress={this.previous}
            style={styles.button}>
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
          <Touchable
            disabled={!nextId}
            onPress={this.next}
            style={styles.button}>
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
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 90,
  },
  button: {
    marginHorizontal: 10,
  },
});

export default connector(Detail);
