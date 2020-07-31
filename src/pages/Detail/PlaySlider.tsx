import React from 'react';
import {View} from 'react-native';
import Sloder from 'react-native-slider-x';

class PlaySlider extends React.Component {
  render() {
    return (
      <View>
        <Sloder
          value={10}
          maximumValue={100}
          maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
          minimumTrackTintColor="white"
        />
      </View>
    );
  }
}

export default PlaySlider;
