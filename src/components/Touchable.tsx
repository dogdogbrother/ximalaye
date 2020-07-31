import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';

const Touchable: React.FC<TouchableOpacityProps> = React.memo(
  ({style, ...rest}) => {
    const touchableStyle = rest.disabled ? [style, styles.disabled] : style;
    return (
      <TouchableOpacity style={touchableStyle} activeOpacity={0.8} {...rest} />
    );
  },
);

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

export default Touchable;
