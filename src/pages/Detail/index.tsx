/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Animated, Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {ModalStackParamList, ModalStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont/index';
import PlaySlider from './PlaySlider';
import {viewportWidth} from '@/utils/index';
import LinearGradient from 'react-native-linear-gradient';
import Barrage, {Message} from '@/components/Barrage';

const data: string[] = [
  '我是弹幕11111',
  '我是弹幕2',
  '我是弹幕33',
  '我是弹幕444444444',
  '我是弹幕555555555555',
  '我是弹幕2',
  '我是弹幕33',
  '我是弹幕444444444',
];

function rendomIndex(length: number) {
  return Math.floor(Math.random() * length);
}

function getText() {
  return data[rendomIndex(data.length)];
}

const mapStateToProps = ({player}: RootState) => {
  return {
    id: player.id,
    soundUrl: player.soundUrl,
    playState: player.playState,
    title: player.title,
    thumbnailUrl: player.thumbnailUrl,
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

interface IState {
  barrage: boolean;
  barrageData: Message[];
}

const IMAGE_WIDRH = 180;
const SCALE = viewportWidth / IMAGE_WIDRH;

class Detail extends React.Component<IProps, IState> {
  state = {
    barrage: false,
    barrageData: [],
  };
  anim = new Animated.Value(1);
  componentDidMount() {
    const {dispatch, route, navigation, title, id} = this.props;
    if (route.params && route.params.id !== id) {
      dispatch({
        type: 'player/fetchShow',
        payload: {
          id: route.params.id,
        },
      });
    } else {
      dispatch({
        type: 'player/play',
      });
    }
    navigation.setOptions({
      headerTitle: title,
    });
    this.addBarrage();
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.title !== prevProps.title) {
      this.props.navigation.setOptions({
        headerTitle: this.props.title,
      });
    }
  }

  addBarrage = () => {
    setInterval(() => {
      const {barrage} = this.state;
      if (barrage) {
        const id = Date.now();
        const title = getText();
        this.setState({
          barrageData: [{id, title}],
        });
      }
    }, 500);
  };

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

  barrage = () => {
    this.setState({
      barrage: !this.state.barrage,
    });
    Animated.timing(this.anim, {
      toValue: this.state.barrage ? 1 : SCALE,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {barrage, barrageData} = this.state;
    const {playState, previousId, nextId, thumbnailUrl} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Animated.Image
            source={{uri: thumbnailUrl}}
            style={[
              styles.image,
              {borderRadius: barrage ? 0 : 8, transform: [{scale: this.anim}]},
            ]}
          />
        </View>
        {barrage && (
          <>
            <LinearGradient
              colors={['rgba(128,104,102,0.5)', '#807c66']}
              style={styles.linear}
            />
            <Barrage
              data={barrageData}
              maxTrack={5}
              style={{top: PADDING_TOP}}
            />
          </>
        )}
        <Touchable style={styles.barrageBtn} onPress={this.barrage}>
          <Text style={styles.barrageText}>弹幕</Text>
        </Touchable>
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

const PADDING_TOP = (viewportWidth - IMAGE_WIDRH) / 2;

const styles = StyleSheet.create({
  container: {
    paddingTop: PADDING_TOP,
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
  imageView: {
    alignItems: 'center',
    height: IMAGE_WIDRH,
  },
  image: {
    width: IMAGE_WIDRH,
    height: IMAGE_WIDRH,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  barrageBtn: {
    height: 20,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
  },
  barrageText: {
    color: '#fff',
  },
  linear: {
    position: 'absolute',
    top: 0,
    height: viewportWidth,
    width: viewportWidth,
  },
});

export default connector(Detail);
