import React from 'react';
import {
  MaterialTopTabBarProps,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import {View, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

interface IProps extends MaterialTopTabBarProps {}

class TopTabBarWrapper extends React.Component<IProps> {
  render() {
    const {props} = this;
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={styles.container}>
        <MaterialTopTabBar {...props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
  },
});

export default TopTabBarWrapper;
