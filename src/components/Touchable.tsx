import React, {us} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';

function fn() {}
const Touchable: React.FC<TouchableOpacityProps> = React.memo(
  ({style, onPress, ...rest}) => {
    const touchableStyle = rest.disabled ? [style, styles.disabled] : style;
    onPress = onPress || fn;
    let throttleOnPress;
    throttleOnPress = _.throttle(onPress, 1000, {
      leading: true,
      trailing: false,
    });
    return (
      <TouchableOpacity
        onPress={throttleOnPress}
        style={touchableStyle}
        activeOpacity={0.8}
        {...rest}
      />
    );
  },
);

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

export default Touchable;
